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
            "0x409be5c7569b6Ec3130118FF03001F5216F617B0",
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
              "from": "0x409be5c7569b6Ec3130118FF03001F5216F617B0",
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
            "0xf86c827a698292e4827a6994627306090abab3a6e1400e9345bc60c78a8bef5787038d7ea4c680008082f4f6a0a1e77c49c79e5795bcd298cb12070f7023a66d2f9869bec234824fa692930950a02887352788d4e575e201a2e131f196f5028fc45b09eaa6b8a82a7024b45cc47e",
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
            "0x409be5c7569b6Ec3130118FF03001F5216F617B0",
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
              "from": "0x409be5c7569b6Ec3130118FF03001F5216F617B0",
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
            "0xf8aa827a698292e4827a69945fbdb2315678afecb367f032d93f642f64180aa380b844a9059cbb000000000000000000000000627306090abab3a6e1400e9345bc60c78a8bef5700000000000000000000000000000000000000000000000000038d7ea4c6800082f4f6a0b1cf6c6673b5b7e61fa1038e47f88a286b18b6bc7978e688cce5b79e579c535aa0157e91f7dabd5888964ffd1bf2e725b02dc819bc76c8012a87dcf17c1595bd1c",
          ],
        },
      ]
    `);
  });
});
