import prisma from "@/core/utils/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token");
    const decoded = jwt.decode(token?.value ?? "") as JwtPayload | null;

    const user = await prisma.user.findUnique({
      where: { email: decoded?.email! },
      include: {
        profile: true,
        followers: true,
        following: true,
        scenarios: true,
        likes: true,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}
