"use client";

import { PropsWithChildren, createContext } from "react";
import { Address, useAccount } from "wagmi";
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from "@tanstack/react-query";

import { UseMutationResult } from "@tanstack/react-query";

import type { Passport } from "./types";
import { usePassportScore, usePassportSubmit } from "./hooks";

type PassportContext = {
  address?: Address;
  submit: UseMutationResult<Passport>;
  score: UseQueryResult<Passport>;
};

export const Context = createContext<PassportContext>({} as PassportContext);

function Provider({ children }: PropsWithChildren) {
  const { address } = useAccount();
  const score = usePassportScore(address);
  const submit = usePassportSubmit(address);
  console.log("score", score.data);
  console.log("submit", submit.data);

  const value = {
    address,
    score,
    submit,
  } as PassportContext;

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

const queryClient = new QueryClient();

export function PassportProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>{children}</Provider>;
    </QueryClientProvider>
  );
}
