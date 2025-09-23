import { compare, hash } from "bcrypt";
import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/core/utils/prisma";
import { signAccessToken } from "@/core/utils/jwt";
import { createRefreshCookie, createAccessCookie } from "@/core/utils/cookies";

const REFRESH_EXPIRES_SECONDS = 60 * 60 * 24 * 30; // 30 روز
const ACCESS_EXPIRES_SECONDS = 60 * 60; // 1 ساعت

export async function POST(req: Request) {
  try {
    const { emailOrUsername, password } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrUsername },
          { profile: { username: emailOrUsername } },
        ],
      },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        {
          message:
            "You may have registered with Google before. Please login with Google.",
        },
        { status: 400 }
      );
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ساخت Access & Refresh
    const accessToken = signAccessToken({ sub: user.id, email: user.email });
    const refreshToken = crypto.randomBytes(64).toString("hex");
    const refreshHash = await hash(refreshToken, 10);

    await prisma.refreshToken.create({
      data: {
        tokenHash: refreshHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + REFRESH_EXPIRES_SECONDS * 1000),
      },
    });

    // ساخت کوکی‌ها
    const refreshCookie = createRefreshCookie(
      refreshToken,
      REFRESH_EXPIRES_SECONDS
    );
    const accessCookie = createAccessCookie(
      accessToken,
      ACCESS_EXPIRES_SECONDS
    );

    // برگردوندن کاربر بدون پسورد
    const { password: _, ...userSafe } = user;

    return new NextResponse(JSON.stringify({ user: userSafe }), {
      status: 200,
      headers: {
        "Set-Cookie": [refreshCookie, accessCookie].join(", "),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
