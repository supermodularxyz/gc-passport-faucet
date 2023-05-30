import { expect, test, vi } from "vitest";

vi.mock("@upstash/redis", () => {
  const state = new Map();
  return {
    Redis: {
      fromEnv: () => ({
        get: (key: string) => state.get(key),
        set: (key: string, val: any) => state.set(key, val),
      }),
    },
  };
});

import { checkRateLimit, redis } from ".";
test("checkRateLimit", async () => {
  const address = "0x";

  expect(await checkRateLimit(address)).toBe(true);

  redis.set(address, Date.now());
  expect(checkRateLimit(address)).rejects.toThrowError(/Ratelimit reached/);
});
