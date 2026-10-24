"use server";

import { AR_SESSION } from "@/config/constants";
import { ROUTES } from "@/config/routes";
import { postLoginReq, postLogoutReq } from "@/features/auth/auth.api";
import { LoginFormValues } from "@/features/auth/auth.schema";
import { LoginResponse } from "@/features/auth/auth.type";
import { failure } from "@/lib/error";
import { getSession } from "@/lib/http";
import { buildSessionCookie } from "@/lib/session";
import { ApiFailure, ApiResponse } from "@/types/api.type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export type LogoutActionState = ApiFailure | null;

export async function logoutAction(
  _prevState: LogoutActionState,
  _formData: FormData,
): Promise<LogoutActionState> {
  const session = await getSession();

  
  if (!session?.refreshToken) {
    return failure(400, "BadRequestError", "عدم وجود توکن");
  }

  
  const response = await postLogoutReq(session.refreshToken);

  if (!response.success) return response;

  const cookieStore = await cookies();
  cookieStore.delete(AR_SESSION);
  redirect(ROUTES["login"]);
}
