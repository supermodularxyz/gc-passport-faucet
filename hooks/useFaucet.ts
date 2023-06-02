"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAccount, useMutation } from "wagmi";

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

export function useInfo() {
  return useQuery(["faucet-info"], () =>
    axios
      .get("/faucet")
      .then((r) => r.data)
      .catch((err) => {
        throw err.response.data;
      })
  );
}
