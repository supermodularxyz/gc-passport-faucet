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
      api.getScore(address as Address).then((r) => {
        if (r.status === PassportStatus.PROCESSING) {
          console.log("Retry until status is DONE or ERROR", r);
        }
        return r;
      }),
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
