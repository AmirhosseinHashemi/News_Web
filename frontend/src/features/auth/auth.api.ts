import type { LoginFormValues } from "@/features/auth/auth.schema";
import type {
  LoginResponse,
  MeResponse,
  RefreshResponse,
} from "@/features/auth/auth.type";
import { http } from "@/lib/http";
import { ApiResponse } from "@/types/api.type";

export function postLoginReq(values: LoginFormValues) {
  return http<LoginResponse>("/auth/login", {
    method: "POST",
    body: values,
  });
}

export function getMeReq() {
  return http<MeResponse>("/auth/me");
}

export function postRefreshReq(refreshToken: string) {
  return http<RefreshResponse>("/auth/refresh", {
    method: "POST",
    body: { refreshToken },
  });
}

export function postLogoutReq(refreshToken: string) {
  return http<ApiResponse<null>>("/auth/logout", {
    method: "POST",
    body: { refreshToken },
  });
}
