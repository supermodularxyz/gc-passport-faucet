import { ConfigSchema } from "config/env";
import {
  Address,
  createWalletClient,
  http,
  parseEther,
  parseUnits,
} from "viem";
import { mnemonicToAccount } from "viem/accounts";
import * as chains from "viem/chains";
import { erc20ABI } from "wagmi";
import z from "zod";

export async function transferTokens({
  to,
  token,
  amount,
  decimals,
  chain,
  mnemonic,
}: { to: Address } & z.infer<typeof ConfigSchema>) {
  const account = mnemonicToAccount(mnemonic);
  const wallet = createWalletClient({
    account,
    chain: chains[chain as keyof typeof chains],
    transport: http(),
  });

  if (token && decimals) {
    // Transfer ERC20
    return wallet.writeContract({
      account,
      address: token,
      abi: erc20ABI,
      functionName: "transfer",
      args: [to, parseUnits(`${amount}`, decimals)],
    });
  } else {
    // Transfer ETH
    console.log({ to, value: parseEther(`${amount}`) });
    return wallet.sendTransaction({ to, value: parseEther(`${amount}`) });
  }
}
