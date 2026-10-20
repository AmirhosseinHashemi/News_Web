"use server";

import { AR_SESSION } from "@/config/constants";
import { ROUTES } from "@/config/routes";
import { postLoginReq } from "@/features/auth/auth.api";
import { LoginFormValues } from "@/features/auth/auth.schema";
import {
  JwtPayload,
  SetAuthActionData,
  UserSession,
} from "@/features/auth/auth.type";
import { ApiError, NETWORK_ERR_MSG } from "@/lib/error";
import { encryptSession } from "@/lib/jose";
import { ApiFailure, ErrorName } from "@/types/api.type";
import { jwtDecode } from "jwt-decode";
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
    await setAuthSession(authData);
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

export async function setAuthSession({
  refreshToken,
  accessToken,
  refreshTokenExp,
}: SetAuthActionData) {
  try {
    const jwtPayload = jwtDecode<JwtPayload>(accessToken);

    const session: UserSession = {
      ...jwtPayload,
      accessToken,
      refreshToken,
      exp: jwtPayload.exp * 1000, // convert to ms
      refreshTokenExp:
        typeof refreshTokenExp === "number"
          ? refreshTokenExp
          : new Date(refreshTokenExp).getTime(),
    };
    const encryptedSession = await encryptSession(session);

    const cookieStore = await cookies();

    cookieStore.set(AR_SESSION, encryptedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  } catch {
    throw new Error("خطا در ذخیره توکن");
  }
}
