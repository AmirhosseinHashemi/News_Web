"use server";

import { AR_SESSION } from "@/config/constants";
import { ROUTES } from "@/config/routes";
import { postLoginReq } from "@/features/auth/auth.api";
import { LoginFormValues } from "@/features/auth/auth.schema";
import { JwtPayload, UserSession } from "@/features/auth/auth.type";
import { ApiError, NETWORK_ERR_MSG } from "@/lib/error";
import { encryptSession } from "@/lib/jose";
import { ApiFailure } from "@/types/api.type";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(
  formData: LoginFormValues,
): Promise<ApiFailure> {
  try {
    const response = await postLoginReq(formData);

    if (response.success) {
      const { accessToken, refreshToken } = response.data;
      const jwtPayload = jwtDecode<JwtPayload>(accessToken);

      const session: UserSession = {
        ...jwtPayload,
        accessToken,
        refreshToken,
      };
      const encryptedSession = await encryptSession(session);

      const cookieStore = await cookies();

      cookieStore.set(AR_SESSION, encryptedSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
    }

    if (!response.success) {
      const err = new ApiError(response);
      return err.response;
    }
  } catch (err) {
    return {
      status: 500,
      success: false,
      message: NETWORK_ERR_MSG,
      errorName: "NetworkError",
      errors: [],
      timestamp: new Date().toISOString(),
    };
  }

  redirect(ROUTES["admin"]);
}
