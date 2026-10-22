import { API_BASE_URL, AR_SESSION } from "@/config/constants";
import { failure, NETWORK_ERR_MSG } from "@/lib/error";
import { decryptSession } from "@/lib/jose";
import { ApiResponse, HttpOptions } from "@/types/api.type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import "server-only";

const TIMEOUT_MS = 10_000;

const isEnvelope = (x: unknown): x is ApiResponse<unknown> =>
  typeof x === "object" &&
  x !== null &&
  typeof (x as { success?: unknown }).success === "boolean";

export const getSession = cache(async () => {
  const raw = (await cookies()).get(AR_SESSION)?.value;
  if (!raw) return null;
  try {
    return await decryptSession(raw);
  } catch {
    return null;
  }
});

export async function http<T>(
  path: string,
  options: HttpOptions = {},
): Promise<ApiResponse<T>> {
  const { body, ...rest } = options;

  const session = await getSession();

  const headers = new Headers(options.headers);
  if (body !== undefined) headers.set("Content-Type", "application/json");
  if (session) headers.set("Authorization", `Bearer ${session.accessToken}`);

  // 1) network problems / timeout -> same shape as an API error
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...(rest.cache || rest.next ? {} : { cache: "no-store" as const }),
      ...rest,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: rest.signal ?? AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    // only swallow real network errors; Next.js internal control-flow errors must pass through
    if (!(err instanceof TypeError || err instanceof DOMException)) throw err;
    console.error(`[http] ${rest.method ?? "GET"} ${path} failed:`, err);
    return failure(503, "NetworkError", NETWORK_ERR_MSG);
  }

  // 2) body is not JSON (nginx 502 page, empty body, ...) -> normalise, never leak/throw
  let json: unknown;
  try {
    const text = await response.text();
    json = text ? JSON.parse(text) : undefined;
  } catch {
    json = undefined;
  }

  const res: ApiResponse<T> = isEnvelope(json)
    ? ({ ...json, status: response.status } as ApiResponse<T>)
    : failure(
        response.ok ? 502 : response.status,
        response.status === 401 ? "UnauthorizedError" : "UnknownError",
        "Unexpected response from server",
      );

  // 3) dead session (proxy already refreshed). errorName check keeps "wrong password" from redirecting.
  if (
    !res.success &&
    res.status === 401 &&
    res.errorName === "UnauthorizedError"
  ) {
    redirect("/auth/expired"); // throws NEXT_REDIRECT
  }

  return res;
}
