import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/core/utils/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const { email, password, name, username } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json({ message: "User exists" }, { status: 400 });

    const existingUsernam = await prisma.profile.findUnique({ where: { username } });
    if (existing)
      return NextResponse.json({ message: "Username has already taken" }, { status: 400 });

    const hashed = await hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed },
    });

    await prisma.profile.create({
      data: { userId: user.id, name: name ?? "", username },
    });

    return NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}
