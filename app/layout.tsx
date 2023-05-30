import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { siteConfig } from "config/site";
import { PassportProvider } from "lib/passport/Provider";
import { WalletProvider } from "providers/Wallet";

export const metadata = { ...siteConfig };

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-primary-50 text-primary-950">
        <WalletProvider>
          <PassportProvider>{props.children}</PassportProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
