import dotenv from "dotenv";
dotenv.config();
import { expect, test } from "vitest";
import { config } from "./env";

test("Env config", () => {
  expect(config).toBeDefined();
});
