import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@solana/wallet-adapter-react-ui/styles.css";

import "./globals.css";
import AppWalletProvider from "@/components/wallet/AppWalletProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stake2Ship | Trustless Escrow on Solana",
  description:
    "Stake2Ship is a trustless escrow protocol on Solana. Lock USDC. Stake SOL. Ship code. No middlemen. Fully on-chain settlement powered by SVM.",
  keywords: [
    "Solana",
    "Trustless Escrow",
    "Web3 Freelancing",
    "On-chain Contracts",
    "SVM",
    "Stake to Earn",
    "Decentralized Bounty"
  ],
  authors: [{ name: "Stake2Ship" }],
  creator: "Stake2Ship",
  openGraph: {
    title: "Stake2Ship — Trustless Escrow",
    description:
      "Lock USDC. Stake SOL. Ship code. No middlemen required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <AppWalletProvider>
          {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}
