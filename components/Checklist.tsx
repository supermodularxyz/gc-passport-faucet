"use client";
import { Button } from "./Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const threshold = Number(process.env.NEXT_PUBLIC_SCORE_THRESHOLD || 0);

import { usePassport } from "lib/passport/hooks";
import { Checkbox } from "./Form";
import { useAccount, useMutation } from "wagmi";
import axios from "axios";

function PassportScore() {
  const { score, submit } = usePassport();
  const error = score.error || submit.error;
  return (
    <div className="flex items-center flex-col justify-center">
      <div className="uppercase">Passport score</div>
      {error ? <pre>{JSON.stringify(error, null, 2)}</pre> : null}
      <div className="text-4xl font-mono mb-4">
        {score.data?.score || "?"} / {threshold}
      </div>

      <Button onClick={submit.mutate} disabled={submit.isLoading}>
        Refresh Passport
      </Button>
    </div>
  );
}

export function useFaucet() {
  const { address } = useAccount();
  return useMutation(() =>
    axios
      .post("/faucet", { address })
      .then((r) => r.data)
      .catch((err) => {
        throw err.response.data;
      })
  );
}
export function Checklist() {
  const faucet = useFaucet();
  const { address, score } = usePassport();
  console.log("faucet", faucet.data, faucet.error);
  console.log("address", address);
  console.log("score", score.data, score.error);

  return (
    <div>
      <ol className="ml-8 flex gap-4 flex-col">
        <li className="mb-6">
          <div className="flex items-center gap-3">
            1. <Checkbox checked={!!address} />
            Connect Wallet
          </div>
          <div className="p-4 flex justify-center">
            <ConnectButton />
          </div>
        </li>

        <li className="mb-6">
          <div className="flex items-center gap-3">
            2. <Checkbox checked={Number(score) >= threshold} />
            Submit Gitcoin Passport
          </div>
          <div className="p-4 flex justify-center">
            <PassportScore />
          </div>
        </li>

        <li className="mb-6">
          <div className="flex items-center gap-3">
            3. <Checkbox checked={faucet.isSuccess} />
            Request tokens from faucet
          </div>
          <div className="p-4 flex justify-center">
            <div className="flex flex-col items-center">
              <Button
                onClick={() => faucet.mutate()}
                disabled={faucet.isLoading}
              >
                Request tokens
              </Button>
              <pre>{JSON.stringify(faucet.error)}</pre>
              <pre>{JSON.stringify(faucet.data)}</pre>
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
}
