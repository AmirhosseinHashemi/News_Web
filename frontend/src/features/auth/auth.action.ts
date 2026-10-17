"use server";

import { ROUTES } from "@/config/routes";
import { postLoginReq } from "@/features/auth/auth.api";
import { LoginFormValues } from "@/features/auth/auth.schema";
import { ApiError } from "@/lib/error";
import { ApiFailure } from "@/types/api.type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(
  formData: LoginFormValues,
): Promise<ApiFailure> {
  try {
    const response = await postLoginReq(formData);

    if (response.success) {
      const { accessToken, refreshToken } = response.data;

      const cookieStore = await cookies();

      cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      cookieStore.set("refreshToken", refreshToken, {
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
      message: "خطای ناشناخته ای رخ داده",
      errorName: "UnknownError",
      errors: [],
      timestamp: new Date().toISOString(),
    };
  }

  redirect(ROUTES["admin"]);
}
