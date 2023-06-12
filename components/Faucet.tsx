"use client";

import { useState } from "react";
import { useBalance, useToken } from "wagmi";
import { usePassport } from "lib/passport/hooks";
import { Button } from "./Button";
import { useFaucet, useInfo } from "hooks/useFaucet";
import { ConnectWallet } from "./ConnectWallet";
import { Panel, Panels } from "./Panels";
import { Skeleton } from "./Skeleton";

const threshold = Number(process.env.NEXT_PUBLIC_SCORE_THRESHOLD || 0);

function formatScore(score?: string) {
  return score ? Number(score).toFixed(2) : 0;
}
export function PassportScore() {
  const { score, submit } = usePassport();

  return (
    <div className="flex items-center flex-col justify-center">
      <div className="mb-2">Your passport score is</div>
      <div className="text-5xl font-mono mb-4 flex gap-2 font-serif mb-8">
        <Skeleton isLoading={score.isFetching || submit.isLoading}>
          {formatScore(score.data?.score)}
        </Skeleton>

        <span>/</span>
        {threshold}
      </div>

      <Button
        onClick={submit.mutate}
        disabled={submit.isLoading || score.isLoading}
      >
        Refresh Passport
      </Button>
    </div>
  );
}

function FaucetInfo() {
  const { data: info, isLoading } = useInfo();
  const token = useToken({
    address: info?.token,
    enabled: Boolean(info?.token),
  });
  const balance = useBalance({
    address: info?.address,
    token: info?.token,
    watch: true,
    enabled: Boolean(info?.address),
  });

  return (
    <div className="container max-screen-w-sm mx-auto text-white/50">
      {info?.isTempWallet ? (
        <div className="mb-4 text-red-800">
          Warning: Faucet wallet has been generated randomly. Please configure
          .env variables correctly before running in production.
        </div>
      ) : null}
      <div className="flex flex-col gap-1 text-sm font-mono">
        <div className="font-mono">Faucet network: {info?.chain}</div>
        <div>Faucet address: {info?.address}</div>
        <div>Faucet balance: {balance.data?.formatted}</div>
        <div>
          Faucet amount: {info?.amount} {token.data?.symbol || "ETH"}
        </div>
        <div>Faucet ratelimit: {info?.ratelimit} seconds</div>
      </div>
    </div>
  );
}

export function Faucet() {
  const { address, score } = usePassport();
  const [step, setStep] = useState(0);

  return (
    <div className="bg-background container max-w-screen-sm mx-auto p-8 border border-border rounded-lg flex flex-col gap-8">
      <Panels current={step} onNext={() => setStep((s) => s + 1)}>
        <Panel title="Connect Wallet">
          <ConnectWallet />
        </Panel>
        <Panel title="Passport Check" disabled={!address}>
          <PassportScore />
        </Panel>
        <Panel
          title="Token Request"
          disabled={!(Number(score.data?.score) >= threshold)}
        >
          <RequestTokens />
        </Panel>
      </Panels>

      <FaucetInfo />
    </div>
  );
}

function RequestTokens() {
  const faucet = useFaucet();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <Button onClick={() => faucet.mutate()} disabled={faucet.isLoading}>
          Request tokens
        </Button>
      </div>

      {faucet.data?.tx ? (
        <div>
          <div className="text-center mb-2">{faucet.data?.message}</div>
          Transaction hash: <pre className="text-sm">{faucet.data?.tx}</pre>
        </div>
      ) : null}
      {faucet.error ? (
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify({ message: faucet.error }, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}
