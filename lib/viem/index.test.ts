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
              "data": "0xa9059cbb000000000000000000000000627306090abab3a6e1400e9345bc60c78a8bef5700000000000000000000000000000000000000000000000000038d7ea4c68000",
              "from": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
              "gas": undefined,
              "gasPrice": "0x92e4",
              "maxFeePerGas": undefined,
              "maxPriorityFeePerGas": undefined,
              "nonce": "0x7a69",
              "to": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
              "value": undefined,
            },
          ],
        },
        {
          "method": "eth_sendRawTransaction",
          "params": [
            "0xf8aa827a698292e4827a69945fbdb2315678afecb367f032d93f642f64180aa380b844a9059cbb000000000000000000000000627306090abab3a6e1400e9345bc60c78a8bef5700000000000000000000000000000000000000000000000000038d7ea4c6800082f4f6a09de51803dd6fe4863d0940a6068c7a62c0d3c3a01a7ebb58cbd85e6b59453646a078d008987531d701c9c5f28976e4725c59d6a0577fc8997b4c56acaa2e33c6f9",
          ],
        },
      ]
    `);
  });
});
