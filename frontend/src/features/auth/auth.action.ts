"use server";

import { ROUTES } from "@/config/routes";
import { postLoginReq } from "@/features/auth/auth.api";
import { LoginFormValues } from "@/features/auth/auth.schema";
import { ApiError, NETWORK_ERR_MSG } from "@/lib/error";
import { buildSessionCookie } from "@/lib/session";
import { ApiFailure, ErrorName } from "@/types/api.type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(
  formData: LoginFormValues,
): Promise<ApiFailure> {
  try {
    const response = await postLoginReq(formData);

    if (!response.success) {
      const err = new ApiError(response);
      return err.response;
    }

    const { user, ...authData } = response.data;
    const cookie = await buildSessionCookie(authData);
    (await cookies()).set(cookie.name, cookie.value, cookie.options);
  } catch (err) {
    const message = err instanceof Error ? err.message : NETWORK_ERR_MSG;
    const errorName: ErrorName =
      err instanceof Error ? "UnknownError" : "NetworkError";

    return {
      status: 500,
      success: false,
      message,
      errorName,
      errors: [],
      timestamp: new Date().toISOString(),
    };
  }

  redirect(ROUTES["admin"]);
}
