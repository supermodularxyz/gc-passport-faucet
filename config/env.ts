import z from "zod";
import * as chains from "viem/chains";

import dotenv from "dotenv";
import { mnemonicToAccount } from "viem/accounts";
dotenv.config();

export const ConfigSchema = z.object({
  token: z
    .custom<`0x${string}`>((val) => (val as string).startsWith("0x"))
    .optional(),
  ratelimit: z
    .number()
    .gt(0)
    .transform((v) => Number(v)),
  amount: z.number().gt(0),
  decimals: z.number().min(1).optional(),
  chain: z.enum(Object.keys(chains) as any),
  mnemonic: z.string().refine(
    (m) => {
      try {
        mnemonicToAccount(m);
        return true;
      } catch (error) {
        return false;
      }
    },
    {
      message: "Must be a valid mnemonic",
    }
  ),
});

export const config = {
  ratelimit: Number(process.env.RATELIMIT) * 60 * 60,
  token: process.env.TOKEN_ADDRESS
    ? (process.env.TOKEN_ADDRESS as `0x${string}`)
    : undefined,
  amount: Number(process.env.TOKEN_AMOUNT),
  decimals: process.env.TOKEN_DECIMALS
    ? Number(process.env.TOKEN_DECIMALS)
    : undefined,
  chain: (process.env.NEXT_PUBLIC_CHAIN || "hardhat") as any,
  mnemonic: process.env.WALLET_MNEMONIC as string,
};

const res = ConfigSchema.safeParse(config);
if (!res.success) {
  console.log(res.error);
  throw new Error("Error parsing .env variables");
}
