"use client";

import React, { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set to 'devnet' for your Superteam POC testing
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint here later if needed
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Modern wallets (Phantom, Solflare, etc.) follow the Wallet Standard and auto-detect.
  // We don't need to manually configure their specific adapters anymore.
  const wallets = useMemo(() => [], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}