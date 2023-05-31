import { Address } from "wagmi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import * as api from "./api";
import { PassportStatus } from "./types";
import { useContext } from "react";
import { Context } from "./Provider";

export function usePassport() {
  return useContext(Context);
}

export function usePassportScore(address?: Address) {
  return useQuery(
    ["score", address],
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ score: 40 });
        }, 1000);
      }),
    // api.getScore(address as Address).then((r) => {
    //   if (r.status === PassportStatus.PROCESSING) {
    //     console.log("Retry until status is DONE or ERROR", r);
    //   }
    //   return r;
    // }),
    { enabled: !!address, retry: false }
  );
}

export function usePassportSubmit(address?: Address) {
  const client = useQueryClient();

  return useMutation(async () => {
    return api.submitPassport(address as Address).then((r) => {
      // Trigger refetch of score
      client.invalidateQueries(["score", address]);
      return r;
    });
  });
}
/*
export function usePassportSubmit(address?: Address, withSign = false) {
  const { signMessageAsync } = useSignMessage();
  const client = useQueryClient();

  return useMutation(async () => {
    let signature = JSON.parse(localStorage.getItem("signature") || "{}");
    if (withSign) {
      signature = await api<Signature>("/signing-message").then((r) =>
        signMessageAsync({ message: r.data.message }).then((signature) => ({
          ...r.data,
          signature,
        }))
      );
      localStorage.setItem("signature", JSON.stringify(signature));
    }
    return api
      .post<Passport>(`/submit-passport`, { address, scorer_id, ...signature })
      .then((r) => {
        client.invalidateQueries(["score", address]);
        return r.data;
      });
  });
}
*/
