import z from "zod";
import {
  Address,
  createWalletClient,
  http,
  parseEther,
  parseUnits,
} from "viem";
import { mnemonicToAccount } from "viem/accounts";
import * as chains from "viem/chains";

import { ConfigSchema } from "config/env";

export async function transferTokens({
  to,
  token,
  amount,
  decimals,
  chain,
  mnemonic,
}: { to: Address } & z.infer<typeof ConfigSchema>) {
  const account = mnemonicToAccount(mnemonic);

  const selectedChain = getChain(chain);
  const wallet = createWalletClient({
    account,
    chain: selectedChain,
    transport: http(),
  });

  if (token && decimals) {
    console.log("Transfering ERC20 tokens");
    console.log({ to, value: parseUnits(`${amount}`, decimals) });
    return wallet.writeContract({
      account,
      address: token,
      abi,
      functionName: "transfer",
      args: [to, parseUnits(`${amount}`, decimals)],
    });
  } else {
    console.log("Transferring ETH");
    console.log({ to, value: parseEther(`${amount}`) });
    return wallet.sendTransaction({ to, value: parseEther(`${amount}`) });
  }
}

export function createMessage({ amount, token }: z.infer<typeof ConfigSchema>) {
  return `${amount} ${token ? "tokens" : "ETH"} Transferred`;
}

export function createInfoMessage({
  amount,
  chain,
  ratelimit,
  token,
  mnemonic,
}: z.infer<typeof ConfigSchema>) {
  const { address } = mnemonicToAccount(mnemonic);
  const isTempWallet = !process.env.WALLET_MNEMONIC;
  const configuredChain = getChain(chain).name;

  return {
    address,
    amount,
    chain: configuredChain,
    ratelimit,
    token,
    isTempWallet,
  };
}

function getChain(chain: string) {
  return chains[chain as keyof typeof chains] || JSON.parse(chain);
}

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
