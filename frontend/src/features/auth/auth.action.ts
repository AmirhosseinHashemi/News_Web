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
): Promise<ApiFailure | void> {
  try {
    const response = await postLoginReq(formData);
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
  } catch (err) {
    if (err instanceof ApiError) {
      return err.response;
    }
    return {
      success: false,
      message: "خطای ناشناخته ای رخ داده",
      errorName: "UnknownError",
      errors: [],
      timestamp: new Date().toLocaleDateString(),
    };
  }

  redirect(ROUTES["admin"]);
}
