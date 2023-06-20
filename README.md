# Gitcoin Passport Faucet

An Ethereum faucet using Gitcoin Passport for sybil resistence. Supports ETH and ERC20 tokens. Configurable network, score, ratelimit.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsupermodularxyz%2Fgc-passport-faucet&env=WALLET_MNEMONIC,NEXT_PUBLIC_CHAIN,TOKEN_AMOUNT,NEXT_PUBLIC_GC_API_KEY,NEXT_PUBLIC_GC_SCORER_ID,NEXT_PUBLIC_SCORE_THRESHOLD,RATELIMIT,UPSTASH_REDIS_REST_URL,UPSTASH_REDIS_REST_TOKEN)

## Getting Started

1. Create a Gitcoin Passport scorer and api keys at https://scorer.gitcoin.co (recommended Scorer Mechanism: Unique Humanity)
2. Create an Upstash account at https://upstash.com, create a new database + get its url and get an API token ( https://console.upstash.com/account/api ).
3. Deploy to Vercel and configure environment variables (see below for more info)
4. Fund faucet wallet with tokens

## Running locally

Configure environment variables:

```bash
copy .env.sample .env
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

```sh
### FAUCET VARIABLES
WALLET_MNEMONIC=""               # Wallet containing tokens
                                 # Generate one here: https://getcoinplate.com/bip39-seed-phrase-mnemonics-generator-offline-online-tool/

NEXT_PUBLIC_CHAIN="goerli"       # Chain to connect faucet wallet to
                                 # List of supported chains: https://github.com/wagmi-dev/references/blob/main/packages/chains/README.md#chains)
                                 # Advanced experimental: specify a configuration object for an unsupported chain

### TOKEN VARIABLES
TOKEN_ADDRESS=""                 # Optional token - will use ETH if not set
TOKEN_DECIMALS="18"              # Defaults to 18 - be mindful that some tokens (USDC) uses 6 decimals
TOKEN_AMOUNT="0.001"             # Amount of ETH or tokens to transfer
RATELIMIT="24"                   # How often token requests can be made (in hours)

### PASSPORT SCORER VARIABLES ( https://scorer.gitcoin.co/#/dashboard/scorer )
NEXT_PUBLIC_GC_API_URL=""        # Optional - Gitcoin Passport API URL (defaults to https://api.scorer.gitcoin.co/registry)
NEXT_PUBLIC_GC_API_KEY=""        # Gitcoin Passport API key
NEXT_PUBLIC_GC_SCORER_ID=""      # Gitcoin Passport Scorer ID
NEXT_PUBLIC_SCORE_THRESHOLD="10" # Gitcoin Passport Score must be > this threshold to request tokens

### UPSTASH VARIABLES ( https://console.upstash.com/account/api )
UPSTASH_REDIS_REST_URL=""        # Upstash database URL
UPSTASH_REDIS_REST_TOKEN=""      # Upstash access token

```

## Theming

Open `tailwind.config.js` and update the colors.

```json
{
  "theme": {
    "extend": {
      "colors": {
        "primary": "#6935FF",
        "secondary": "#02E2AC",
        "border": "#4D5E80",
        "background": "#202836"
      }
    }
  }
}
```

### Folder structure

```sh
/app
    /faucet
        route.ts  # Backend API for transferring tokens
    layout.tsx    # Layout and wrap providers
    page.tsx      # Index page
/components
    Button.tsx    #
    Faucet.tsx    # Component for connecting wallet, passport, and request tokens
/lib
    /passport     # Provider, hooks, and API for Gitcoin Passport
    /redis        # Request rate limiter
    /viem         # Transfer tokens
/providers
    Wallet.tsx    # Web3 Wallet provider with RainbowKit, Wagmi and Viem
wallet.mjs        # Generate a new wallet mnemonic - run with `node wallet.mjs`
tailwind.config.s # Theme config
```

## Configure an unsupported chain (experimental)

You can configure a new **EVM-compatible** chain in the following format.

```js
JSON.stringify({
  id: 58008,
  name: "Chain Name",
  network: "name",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://..."] },
    public: { http: ["https://..."] },
  },
});
```

```sh
# Add output string here:
NEXT_PUBLIC_CHAIN=<JSON>
```
