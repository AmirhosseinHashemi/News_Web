import { AR_SESSION } from "@/config/constants";
import { ROUTES } from "@/config/routes";
import { postRefreshReq } from "@/features/auth/auth.api";
import { decryptSession } from "@/lib/jose";
import { buildSessionCookie } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login"];
const PROTECTED_ROUTES = ["/admin"];
const BUFFER_MS = 30_000; 

type RefreshResult = Awaited<ReturnType<typeof postRefreshReq>>;

/**
 * Single-flight: parallel requests (RSC prefetches, several tabs) carrying the same
 * refresh token share ONE backend call. Otherwise rotation sees "token reuse".
 * Per instance only -> give the backend a short rotation grace window as well.
 */
const inflight = new Map<string, Promise<RefreshResult>>();

function refreshOnce(refreshToken: string) {
  let p = inflight.get(refreshToken);
  if (!p) {
    p = postRefreshReq(refreshToken);
    inflight.set(refreshToken, p);
    p.then(
      (res) => {
        const definitive =
          res.success || res.status === 401 || res.status === 403;
        if (definitive) setTimeout(() => inflight.delete(refreshToken), 10_000);
        else inflight.delete(refreshToken); // don't cache transient failures
      },
      () => inflight.delete(refreshToken),
    );
  }
  return p;
}

export async function authMiddleware(request: NextRequest) {
  const { nextUrl } = request;

  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (r) => nextUrl.pathname === r || nextUrl.pathname.startsWith(`${r}/`),
  );

  /** Not authenticated. Redirect only from protected routes; never redirect to the page we're on. */
  const deny = (clearSession: boolean) => {
    if (clearSession) request.cookies.delete(AR_SESSION); // what downstream code sees
    let res: NextResponse;
    if (isProtectedRoute) {
      const url = nextUrl.clone();
      url.pathname = "/login";
      url.search = "";
      url.searchParams.set("callbackUrl", nextUrl.pathname + nextUrl.search);
      res = NextResponse.redirect(url);
    } else {
      res = NextResponse.next({ request });
    }
    if (clearSession) res.cookies.delete(AR_SESSION); // what the browser keeps
    return res;
  };

  const raw = request.cookies.get(AR_SESSION)?.value;
  if (!raw) return deny(false);

  let session;
  try {
    session = await decryptSession(raw);
  } catch {
    return deny(true); // corrupted / old-secret cookie: clear it, or /login would loop forever
  }

  const now = Date.now();
  const accessValid = session.accessTokenExp - BUFFER_MS > now;
  const refreshValid = session.refreshTokenExp - BUFFER_MS > now;

  let refreshed: Awaited<ReturnType<typeof buildSessionCookie>> | null = null;

  if (!accessValid) {
    if (!refreshValid) return deny(true);

    let res: RefreshResult;
    try {
      res = await refreshOnce(session.refreshToken);
    } catch {
      return unavailable();
    }

    if (!res.success) {
      // Only an explicit rejection ends the session. Network/5xx must not log users out.
      if (res.status === 401 || res.status === 403) return deny(true);
      return unavailable();
    }

    refreshed = await buildSessionCookie(res.data);
    // Make the new session visible to server components / actions of THIS request.
    request.cookies.set(refreshed.name, refreshed.value);
  }

  // Authenticated from here on.
  let response: NextResponse;
  if (isAuthRoute) {
    const url = nextUrl.clone();
    url.pathname = ROUTES["admin"];
    url.search = "";
    response = NextResponse.redirect(url);
  } else {
    response = NextResponse.next({ request });
  }

  // Persist the new session in the browser.
  if (refreshed)
    response.cookies.set(refreshed.name, refreshed.value, refreshed.options);
  return response;
}

function unavailable() {
  return new NextResponse("Service temporarily unavailable", { status: 503 });
}
