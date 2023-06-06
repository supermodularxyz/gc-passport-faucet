# Gitcoin Passport Faucet

An Ethereum faucet using Gitcoin Passport. Supports ETH and ERC20 tokens. Configurable network, score, ratelimit.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsupermodularxyz%2Fgc-passport-faucet&env=WALLET_MNEMONIC,NEXT_PUBLIC_CHAIN,TOKEN_AMOUNT,NEXT_PUBLIC_GC_API_KEY,NEXT_PUBLIC_GC_SCORER_ID,NEXT_PUBLIC_SCORE_THRESHOLD,RATELIMIT,UPSTASH_REDIS_REST_URL,UPSTASH_REDIS_REST_TOKEN)

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
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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
