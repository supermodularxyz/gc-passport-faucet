import { NextRequest, NextResponse } from "next/server";

import * as passport from "lib/passport/api";
import { checkRateLimit, redis } from "lib/redis";
import { transferTokens } from "lib/viem";
import { config } from "config/env";

const ratelimit = Number(process.env.RATELIMIT) * 60 * 60;

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json();

    // 1. Get last request for address
    await checkRateLimit(address);

    // 2. Get score for address
    const { score } = await passport.getScore(address);

    // 3. Verify score >= threshold
    if (true || Number(score) >= 10) {
      // 4. Transfer tokens
      await transferTokens({ to: address, ...config });

      // 5. Set cooldown
      await redis.set(address, Date.now() + ratelimit * 1000, {
        ex: ratelimit,
      });
    }
    return NextResponse.json({ status: "ok", score });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}
