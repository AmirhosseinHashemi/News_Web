"use server";

import { postLoginReq } from "@/features/auth/auth.api";
import { LoginFormValues } from "@/features/auth/auth.schema";
import { LoginResponse } from "@/features/auth/auth.type";
import { buildSessionCookie } from "@/lib/session";
import { ApiResponse } from "@/types/api.type";
import { cookies } from "next/headers";

export async function loginAction(
  formData: LoginFormValues,
): Promise<ApiResponse<LoginResponse>> {
  const response = await postLoginReq(formData);

  if (response.success) {
    const { user, ...authData } = response.data;
    const cookie = await buildSessionCookie(authData);
    (await cookies()).set(cookie.name, cookie.value, cookie.options);
  }

  return response;
}
