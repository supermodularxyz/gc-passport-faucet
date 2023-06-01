import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export async function checkRateLimit(address: string) {
  const lastRequest = await redis.get(address);
  if (lastRequest) {
    const nextValid = ((lastRequest as number) - Date.now()) / 1000;
    throw new Error(
      `Ratelimit reached: Next valid request is in: ${nextValid} seconds`
    );
  }
  return true;
}
