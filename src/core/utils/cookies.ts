import { serialize, parse } from "cookie";

export function createAccessCookie(token: string, maxAgeSeconds: number) {
  return serialize("token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: maxAgeSeconds,
  });
}

export function createRefreshCookie(token: string, maxAgeSeconds: number) {
  return serialize("refreshToken", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: maxAgeSeconds,
  });
}

export function clearRefreshCookie() {
  return serialize("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 0,
  });
}

/** پاس دادن header.cookie از request و گرفتن آبجکت کوکی‌ها */
export function parseCookies(cookieHeader: string | null | undefined) {
  return parse(cookieHeader ?? "");
}
