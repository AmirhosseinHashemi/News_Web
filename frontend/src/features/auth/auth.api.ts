import type { LoginFormValues } from "@/features/auth/auth.schema";
import type { LoginResponse, MeResponse } from "@/features/auth/auth.type";
import { http } from "@/lib/http";

export function postLoginReq(values: LoginFormValues) {
  return http<LoginResponse>("/auth/login", {
    method: "POST",
    body: values,
  });
}

export function getMeReq() {
  return http<MeResponse>("/auth/me");
}
