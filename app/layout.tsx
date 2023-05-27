import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Inter } from "next/font/google";
import { siteConfig } from "config/site";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = { ...siteConfig };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
