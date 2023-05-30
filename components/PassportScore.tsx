"use client";
import { useAccount } from "wagmi";
import { Button } from "./Button";

const threshold = process.env.NEXT_PUBLIC_SCORE_THRESHOLD;
const score = 0;

export function PassportScore() {
  const { address } = useAccount();
  return (
    <div>
      <div className="flex items-center flex-col justify-center">
        <div className="uppercase">Your score</div>
        <div className="text-4xl font-mono">
          {score} / {threshold}
        </div>
      </div>
      <div className="flex justify-center py-8">
        <Button>Request tokens</Button>
      </div>
    </div>
  );
}
