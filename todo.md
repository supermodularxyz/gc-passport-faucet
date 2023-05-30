- A Next.js app with RainbowKit and Wagmi to connect wallet
- A UI to show score / threshold needed to request ETH
- An Update Passport score button to refresh after adding stamps
- A Request tokens button
- A backend service to verify score > threshold
- An OpenZeppelin Relay with testnet ETH _or_ A wallet created from mnemonic configured in .env variable
- Transfer tokens to address provided
- A Redis cache to store cooldown for address

Config:

- RPC url to L1 or L2 network
- Token address
- Score threshold
- Transfer amount (could also be dynamic based on passport score)
- Cooldown in hours
- OpenZeppelin API key and secret
- Wallet mnemonic

https://github.com/gitcoinco/passport-scorer/blob/main/examples/example-score-a-passport/index.html

1. Sign in with wallet
2. Submit Gitcoin Passport
3. Press button to receive testnet ETH if passport score > threshold

- [x] Create Scorer in API (get api key)
- [x] Create Passport
- [x] Verify stamps

- [x] Setup project
- [x] Connect Wallet
  - [x] Install RainbowKit and Wagmi
  - [x] Add Provider
  - [x] Add ConnectButton
- [x] Fetch Passport for address
  - [x] `axios.post(/registry/submit-passport, { address, community: scorerId })`
- [x] Update score
  - [x] `axios.post(/registry/score/${scorerId}/${address})`
  - [ ] Poll in interval if `status === "PROCESSING"`
- [x] Display Passport Score
  - [x] You must have <x> / <threshold> to request ETH from faucet
- [x] Request Tokens
  - [x] Button
  - [x] Call API
- [ ] API
  - [x] Rate limiter
  - [x] Check score for address via scorerId
  - [ ] Transfer tokens
