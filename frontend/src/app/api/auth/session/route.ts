import { AR_SESSION } from "@/config/constants";
import { SafeSession } from "@/features/auth/auth.type";
import { decryptSession } from "@/lib/jose";
import { RoutHandlerResponse } from "@/types/api.type";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const encryptedSession = cookieStore.get(AR_SESSION)?.value;

  if (!encryptedSession) {
    const body: RoutHandlerResponse<SafeSession> = {
      success: false,
      data: null,
      message: "سشن کاربر یافت نشد",
    };

    return NextResponse.json(body, { status: 401 });
  }

  try {
    const session = await decryptSession(encryptedSession);
    const { refreshToken, ...rest } = session;

    const body: RoutHandlerResponse<SafeSession> = {
      success: true,
      data: rest,
      message: "سشن کاربر با موفقیت یافت شد",
    };

    return NextResponse.json(body, { status: 200 });
  } catch {
    const body: RoutHandlerResponse<SafeSession> = {
      success: false,
      data: null,
      message: "خطا در بررسی نشست",
    };

    return NextResponse.json(body, { status: 500 });
  }
}
