import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { compare } from "bcrypt";
import prisma from "@/core/utils/prisma";
import { signAccessToken } from "@/core/utils/jwt";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const refresh = data.refreshToken;
    if (!refresh)
      return NextResponse.json({ message: "No refresh token" }, { status: 401 });

    // find candidate tokens for user(s) with not-revoked and not expired
    const tokens = await prisma.refreshToken.findMany({
      where: { revoked: false, expiresAt: { gt: new Date() } },
    });

    // safest: compare hashed token one-by-one (or store tokenHash keyed by userId)
    const match = await tokens.reduce(async (accP, t) => {
      const acc = await accP;
      if (acc) return acc;
      const ok = await compare(refresh, t.tokenHash);
      return ok ? t : null;
    }, Promise.resolve<null | any>(null));

    if (!match)
      return NextResponse.json({ message: "Invalid refresh" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { id: match.userId } });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 401 });

    const accessToken = signAccessToken({ sub: user.id, email: user.email });


    return NextResponse.json({ accessToken });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}
