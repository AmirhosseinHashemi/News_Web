import { API_BASE_URL } from "@/config/constants";
import { ApiError } from "@/lib/error";
import { ApiFailure, ApiSuccess, HttpOptions } from "@/types/api.type";

export async function http<T>(
  path: string,
  options: HttpOptions = {},
): Promise<ApiSuccess<T>> {
  const { body, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  const data: unknown = await response.json();

  if (!response.ok) {
    if (typeof data === "object" && data !== null && "success" in data) {
      throw new ApiError(response.status, data as ApiFailure);
    }
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return data as ApiSuccess<T>;
}
