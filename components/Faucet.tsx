"use client";

import { PropsWithChildren } from "react";
import { useBalance, useToken } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { usePassport } from "lib/passport/hooks";
import { Button } from "./Button";
import { useFaucet, useInfo } from "hooks/useFaucet";
import { Loading } from "./Loading";

const threshold = Number(process.env.NEXT_PUBLIC_SCORE_THRESHOLD || 0);

function formatScore(score?: string) {
  return score ? Number(score).toFixed(2) : 0;
}
export function PassportScore() {
  const { score, submit } = usePassport();

  return (
    <div className="flex items-center flex-col justify-center">
      <div className="uppercase">Passport score</div>
      <div className="text-4xl font-mono mb-4 flex gap-2">
        {score.isFetching || submit.isLoading ? (
          <Loading />
        ) : (
          formatScore(score.data?.score)
        )}

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

function Section({
  label,
  children,
  disabled,
}: { label: string; disabled?: boolean } & PropsWithChildren) {
  return (
    <li style={disabled ? { opacity: 0.7, pointerEvents: "none" } : {}}>
      <div className="mb-2 bg-primary-900 uppercase tracking-wider text-primary-50 text-center p-2">
        {label}
      </div>
      <div className="flex justify-center p-8">{children}</div>
    </li>
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
    <div className="container max-screen-w-sm mx-auto">
      {info.isTempWallet ? (
        <div className="mb-4 text-red-800">
          Warning: Faucet wallet has been generated randomly. Please configure
          .env variables correctly before running in production.
        </div>
      ) : null}
      <div className="flex flex-col gap-1 text-sm ">
        <div>Faucet network: {info?.chain}</div>
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

  return (
    <div>
      <ol className="flex gap-4 flex-col mb-8">
        <Section label="1. Connect wallet">
          <ConnectButton />
        </Section>
        <Section label="2. Passport check" disabled={!address}>
          <PassportScore />
        </Section>

        <Section
          label="3. Token request"
          disabled={!(Number(score.data?.score) >= threshold)}
        >
          <RequestTokens />
        </Section>
      </ol>
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
