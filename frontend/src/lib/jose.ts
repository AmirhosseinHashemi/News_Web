import { UserSession } from "@/features/auth/auth.type";
import { jwtVerify, SignJWT } from "jose";

const encodedKey = new TextEncoder().encode(process.env.JOSE_SECRET);

export async function encryptSession(session: UserSession): Promise<string> {
  return new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedKey);
}

export async function decryptSession(session: string): Promise<UserSession> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as UserSession;
  } catch (error) {
    throw new Error("خطا در اعتبارسنجی سشن کابر");
  }
}
