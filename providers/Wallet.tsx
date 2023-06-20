"use client";

import * as React from "react";

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import * as ALL_CHAINS from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { siteConfig } from "config/site";

const chain = process.env.NEXT_PUBLIC_CHAIN || "goerli";

const configuredChain =
  ALL_CHAINS[chain as keyof typeof ALL_CHAINS] || JSON.parse(chain);

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [configuredChain],
  [publicProvider()]
);

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";

const { wallets } = getDefaultWallets({
  appName: siteConfig.title,
  projectId,
  chains,
});

const appInfo = {
  appName: siteConfig.title,
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={appInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
