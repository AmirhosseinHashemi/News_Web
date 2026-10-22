import { AR_SESSION } from "@/config/constants";
import {
  JwtPayload,
  SetAuthActionData,
  UserSession,
} from "@/features/auth/auth.type";
import { encryptSession } from "@/lib/jose";
import { jwtDecode } from "jwt-decode";

/**
 * Builds the cookie spec only; the caller applies it:
 *  - Server Action / route handler: `(await cookies()).set(name, value, options)`
 *  - proxy: `request.cookies.set(name, value)` + `response.cookies.set(name, value, options)`
 */
export async function buildSessionCookie({
  accessToken,
  refreshToken,
  refreshTokenExp,
}: SetAuthActionData) {
  const { exp } = jwtDecode<JwtPayload>(accessToken); // seconds

  // refreshTokenExp MUST end up in milliseconds (backend number in seconds would break this)
  const refreshExpMs =
    typeof refreshTokenExp === "number"
      ? refreshTokenExp
      : new Date(refreshTokenExp).getTime();

  const session: UserSession = {
    accessToken,
    refreshToken,
    accessTokenExp: exp * 1000,
    refreshTokenExp: refreshExpMs,
  };

  return {
    name: AR_SESSION,
    value: await encryptSession(session),
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const, // "strict" drops the cookie on links coming from other sites
      path: "/",
      expires: new Date(refreshExpMs),
    },
  };
}
