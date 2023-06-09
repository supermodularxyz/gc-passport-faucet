import { NextRequest, NextResponse } from "next/server";

import * as passport from "lib/passport/api";
import { checkRateLimit, redis } from "lib/redis";
import { createInfoMessage, createMessage, transferTokens } from "lib/viem";
import { config } from "config/env";

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json();

    // 1. Get last request for address
    await checkRateLimit(address);

    // 2. Get score for address
    const { score } = await passport.getScore(address);

    // 3. Verify score >= threshold
    if (!(Number(score) >= 10)) {
      throw new Error("Score must be above threshold");
    }

    // 4. Transfer tokens
    const tx = await transferTokens({ to: address, ...config });

    // 5. Set cooldown
    await redis.set(address, Date.now() + config.ratelimit * 1000, {
      ex: config.ratelimit,
    });

    return NextResponse.json({
      tx,
      message: createMessage(config),
      chain: config.chain,
    });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(createInfoMessage(config));
}
