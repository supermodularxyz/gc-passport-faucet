"use client";
import axios from "axios";
import { PropsWithChildren } from "react";
import { useAccount, useMutation } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { usePassport } from "lib/passport/hooks";
import { Button } from "./Button";
import { Checkbox } from "./Form";

const threshold = Number(process.env.NEXT_PUBLIC_SCORE_THRESHOLD || 0);

function PassportScore() {
  const { score, submit } = usePassport();
  const error = submit.error || score.error;
  return (
    <div className="flex items-center flex-col justify-center">
      <div className="uppercase">Passport score</div>
      <div className="text-4xl font-mono mb-4">
        {score.data?.score || "?"} / {threshold}
      </div>

      <Button
        onClick={submit.mutate}
        disabled={submit.isLoading || score.isLoading}
      >
        Refresh Passport
      </Button>
      {/* {score.data ? <pre>{JSON.stringify(score.data, null, 2)}</pre> : null}
      {error ? <pre>{JSON.stringify(error, null, 2)}</pre> : null} */}
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
function Alert({ title, children }: { title: string } & PropsWithChildren) {
  return (
    <div className="max-w-md border-2 border-dashed border-primary-600 p-4">
      <div className="mb-2 font-bold">{title}</div>
      <div>{children}</div>
    </div>
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
      <ol className="flex gap-4 flex-col">
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
          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <Button
                onClick={() => faucet.mutate()}
                disabled={faucet.isLoading}
              >
                Request tokens
              </Button>
            </div>

            {faucet.data?.tx ? (
              <div>
                <div className="text-center mb-2">{faucet.data?.message}</div>
                Transaction hash:{" "}
                <pre className="text-sm">{faucet.data?.tx}</pre>
              </div>
            ) : null}
            {faucet.error ? (
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify({ message: faucet.error }, null, 2)}
              </pre>
            ) : null}
          </div>
        </Section>
      </ol>
    </div>
  );
}
