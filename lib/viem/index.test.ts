import { beforeEach, describe, expect, test, vi } from "vitest";
import { transferTokens } from ".";

import dotenv from "dotenv";
import { Address } from "viem";
import * as chains from "viem/chains";
dotenv.config();

let requests: any = [];

describe("Transfer Tokens", () => {
  beforeEach(() => {
    vi.mock("viem", async () => {
      const viem = await import("viem");
      return {
        ...viem,
        http: () => () => ({
          request: (req: any) => {
            requests.push(req);
            return 31337;
          },
        }),
      };
    });
    requests = [];
  });
  const args = {
    to: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57" as Address,
    token: "" as Address,
    amount: 0.001,
    mnemonic: process.env.WALLET_MNEMONIC as string,
    chain: chains.hardhat.network,
  };
  test("Transfer tokens (ETH)", async () => {
    await transferTokens(args);
    expect(requests).toMatchInlineSnapshot(`
    [
      {
        "method": "eth_chainId",
      },
      {
        "method": "eth_getBlockByNumber",
        "params": [
          "latest",
          false,
        ],
      },
      {
        "method": "eth_getTransactionCount",
        "params": [
          "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
          "pending",
        ],
      },
      {
        "method": "eth_gasPrice",
      },
      {
        "method": "eth_estimateGas",
        "params": [
          {
            "accessList": undefined,
            "data": undefined,
            "from": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
            "gas": undefined,
            "gasPrice": "0x92e4",
            "maxFeePerGas": undefined,
            "maxPriorityFeePerGas": undefined,
            "nonce": "0x7a69",
            "to": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
            "value": "0x38d7ea4c68000",
          },
        ],
      },
      {
        "method": "eth_sendRawTransaction",
        "params": [
          "0xf86c827a698292e4827a6994627306090abab3a6e1400e9345bc60c78a8bef5787038d7ea4c680008082f4f6a019504787189ffed18ba8da9cfcb4165398f4c4b55a83792bde49154a906d9d5aa07a9faf3a321a6575a6bdd92b1535db883692e9f5b83bd247198ca21ed3f65c89",
        ],
      },
    ]
  `);
  });

  test("Transfer tokens (ERC20)", async () => {
    await transferTokens({
      ...args,

      token: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      decimals: 18,
    });

    console.log(requests);
  });
});
