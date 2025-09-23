import prisma from "@/core/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const usernameRegex =
  /^(?=.{3,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

// // redis client
// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL!,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
// });

// // create a new ratelimiter, that allows 10 requests per 60 seconds
// const ratelimit = new Ratelimit({
//   redis,
//   limiter: Ratelimit.slidingWindow(10, "60 s"),
// });

function getIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export async function GET(req: NextRequest) {

//   const ip = getIp(req);

//   const { success } = await ratelimit.limit(ip);
//   if (!success) {
//     return NextResponse.json(
//       { error: "Too many requests" },
//       { status: 429 }
//     );
//   }

  try {
    const username = req.nextUrl.searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { available: false, error: "username is required" },
        { status: 400 }
      );
    }

    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { available: false, error: "invalid format" },
        { status: 400 }
      );
    }

    const normalized = username.toLowerCase();

    const existing = await prisma.profile.findUnique({
      where: { username: normalized },
    });

    return NextResponse.json({
      available: !existing,
    });
  } catch (error: any) {
    console.error("check-username error:", error);
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
