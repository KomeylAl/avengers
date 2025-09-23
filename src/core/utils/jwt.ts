import jwt from "jsonwebtoken";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET!;
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES ?? "15m";

/**
 * payload میتونه هر چیزی باشه که میخوای داخل توکن بذاری، مثلا { sub: userId, email }
 */
export function signAccessToken(payload: object) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set in env");
  return jwt.sign(
    payload,
    JWT_SECRET as jwt.Secret,
    { expiresIn: ACCESS_EXPIRES } as jwt.SignOptions
  );
}

/**
 * اگه توکن معتبر باشه payload رو برمی‌گردونه، در غیر این صورت null
 */
export function verifyAccessToken<T = any>(token: string): T | null {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set in env");
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (e) {
    return null;
  }
}

/**
 * تولید یک refresh token تصادفی (hex string)
 * این مقدار باید در کوکی HttpOnly ذخیره بشه و هش‌شده در DB نگهداری بشه.
 */
export function generateRefreshToken(bytes = 64) {
  return crypto.randomBytes(bytes).toString("hex"); // طول پیش‌فرض 128 chars hex
}

/**
 * (اختیاری) سریع یک expiry timestamp برای refresh از env محاسبه کن
 * ورودی: "30d" یا مقدار دلخواه. اگر نخوای parse کنی، میشه مقدار ثابتی بذاری.
 */
export function getRefreshExpiresSeconds(): number {
  // برای سادگی: اگر JWT_REFRESH_EXPIRES به ثانیه داده نشده، از 30 روز استفاده می‌کنیم
  const val = process.env.JWT_REFRESH_EXPIRES ?? "30d";
  // ساده‌ترین پیاده‌سازی: اگر فرمت شامل "d" باشه
  if (val.endsWith("d")) {
    const days = parseInt(val.replace("d", ""), 10) || 30;
    return days * 24 * 60 * 60;
  }
  if (val.endsWith("h")) {
    const hours = parseInt(val.replace("h", ""), 10) || 24;
    return hours * 60 * 60;
  }
  if (val.endsWith("m")) {
    const mins = parseInt(val.replace("m", ""), 10) || 60;
    return mins * 60;
  }
  // fallback: treat as seconds number
  const secs = parseInt(val, 10);
  return Number.isFinite(secs) && secs > 0 ? secs : 30 * 24 * 60 * 60;
}
