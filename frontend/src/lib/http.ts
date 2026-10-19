import { API_BASE_URL, AR_SESSION } from "@/config/constants";
import { decryptSession } from "@/lib/jose";
import { ApiResponse, HttpOptions } from "@/types/api.type";
import { cookies } from "next/headers";

export async function http<T>(
  path: string,
  options: HttpOptions = {},
): Promise<ApiResponse<T>> {
  const { body, ...rest } = options;

  const cookieStore = await cookies();
  const sessionStr = cookieStore.get(AR_SESSION)?.value;

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (sessionStr) {
    const userSession = await decryptSession(sessionStr)
    headers.set("Authorization", `Bearer ${userSession.accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    credentials: "include",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data: ApiResponse<T> = await response.json();
  data.status = response.status

  return data;
}
