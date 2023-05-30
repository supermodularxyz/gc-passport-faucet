export enum PassportStatus {
  "PROCESSING",
  "DONE",
  "ERROR",
}
export type Passport = {
  address: string;
  score: string;
  status: PassportStatus;
  last_score_timestamp: string;
  error?: string;
};

export type Signature = { signature: string; nonce: string; message: string };
