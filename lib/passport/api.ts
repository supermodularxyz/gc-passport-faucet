import axios from "axios";
import { Passport } from "./types";
import { Address } from "viem";

const baseURL =
  process.env.NEXT_PUBLIC_GC_API_URL ||
  "https://api.scorer.gitcoin.co/registry";

const api = axios.create({
  baseURL,
  headers: { common: { "x-api-key": process.env.NEXT_PUBLIC_GC_API_KEY } },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.warn("error", err);
    return Promise.reject(err.response.data);
  }
);

const scorer_id = process.env.NEXT_PUBLIC_GC_SCORER_ID;

export const getScore = (address: Address) =>
  api.get<Passport>(`/score/${scorer_id}/${address}`).then((r) => r.data);

export const submitPassport = (address: Address) =>
  api
    .post<Passport>(`/submit-passport`, { address, scorer_id })
    .then((r) => r.data);
