"use client";

import { SiwaMessage } from "@avmkit/siwa";
import { FC, PropsWithChildren, createContext } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { SIWAProvider } from "@vmkit/connect-avm";
import { getCurrentCallbackUrl } from "@/lib/client-utils";
import { SIWAConfig } from "@vmkit/connect-avm/server";
import { NetworkConfigBuilder, NetworkId, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'

export interface SIWACreateMessageArgs {
  nonce: string;
  address: string;
  chainId: number;
}

declare let window: {
  algorand?: AlgorandProvider;
  location: Location;
  localStorage: Storage;
};

export interface AlgorandProvider {
  on?: (...args: any[]) => void;
  removeListener?: (...args: any[]) => void;
  autoRefreshOnNetworkChange?: boolean;
}

export type Web3ContextT = {
  contract: any | null;
};

export type NFTContractProviderProps = {
  children: React.ReactNode;
};

export const Web3Context = createContext<Web3ContextT>({} as Web3ContextT);

export const getDefaultConfig = (config: any) => {
  return {
    setState: () => { },
    connect: () => { },
    appName: "VMkit",
    appIcon: "/favicon.svg",
    appDescription: "SIWA Connect is a demo application for SIWA.",
    appUrl: typeof window !== "undefined" ? window.location.origin : "",
    walletConnectProjectId: "",
    chains: [],
    client: null,
    ...config,
  };
};

const currentCallbackUrl = getCurrentCallbackUrl();

export const siwaConfig: SIWAConfig = {
  getNonce: async () => {
    const res = await fetch(`/api/auth/siwa`, { method: "PUT" });
    if (!res.ok) throw new Error("Failed to fetch SIWA nonce");
    return res.text();
  },

  createMessage: ({ nonce, address, chainId }: SIWACreateMessageArgs) =>
    new SiwaMessage({
      nonce,
      chainId,
      address,
      version: "1",
      uri: typeof window !== "undefined" ? window.location.origin : "",
      domain: typeof window !== "undefined" ? window.location.host : "",
    }).prepareMessage(),

  verifyMessage: async ({
    message,
    signature,
    transaction,
    nfd,
  }: {
    message: string | Uint8Array;
    signature: string;
    transaction: string | null;
    nfd?: string;
  }) => {
    const res = await fetch(`/api/auth/siwa`, {
      method: "POST",
      body: JSON.stringify({
        message: JSON.stringify(message),
        nfd,
        signature,
        transaction: transaction || null,
        ...(nfd && { nfd }), // Only include nfd if it's provided
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to verify SIWA message");

    return await signIn("algorand", {
      message: JSON.stringify(message),
      nfd,
      signature,
      transaction,
      redirect: false,
      callbackUrl: currentCallbackUrl ?? undefined,
    }).then((res) => res?.ok as boolean);
  },

  getSession: async () => {
    const res = await fetch(`/api/auth/siwa`);

    if (!res.ok) throw new Error("Failed to fetch SIWA session");
    const { address, chainId } = await res.json();

    return address && chainId ? { address, chainId } : null;
  },
  signOut: () => fetch(`/api/auth/siwa`, { method: "DELETE" }).then((res) => res.ok),
};

export const Web3Contextual = (props: NFTContractProviderProps) => {
  const { children } = props;
  const contract = null;

  return (
    <Web3Context.Provider value={{ contract }}>{children}</Web3Context.Provider>
  );
};

export const Web3AVMProvider = ({ children }: { children: any }) => {

  // Add other AVM-compatible networks
  const networks = new NetworkConfigBuilder()
    .testnet({
      algod: {
        baseServer: "https://testnet-api.4160.nodely.dev",
        port: '',
        token: ''
      }
    })
    .mainnet({
      algod: {
        baseServer: "https://mainnet-api.4160.nodely.dev",
        port: '',
        token: ''
      }
    })
    .addNetwork('voi-mainnet', {
      algod: {
        token: '',
        baseServer: 'https://mainnet-api.voi.nodely.dev',
        port: ''
      },
      isTestnet: false,
      genesisHash: 'r20fSQI8gWe/kFZziNonSPCXLwcQmH/nxROvnnueWOk=',
      genesisId: 'voimain-v1.0',
      caipChainId: 'algorand:r20fSQI8gWe_kFZziNonSPCXLwcQmH_n'
    })
    .addNetwork('voi-testnet', {
      algod: {
        token: '',
        baseServer: 'https://testnet-api.voi.nodely.dev',
        port: ''
      },
      isTestnet: true,
      genesisHash: 'IXnoWtviVVJW5LGivNFc0Dq14V3kqaXuK2u5OQrdVZo=',
      genesisId: 'voitest-v1'
    })
    .build();

  const walletManager = new WalletManager({
    wallets: [WalletId.PERA],
    defaultNetwork: NetworkId.MAINNET,
    networks,
    options: {
      // Always start on Mainnet
      resetNetwork: true
    }
  })

  return (
    <WalletProvider manager={walletManager}>
      <Web3ChildProvider>{children}</Web3ChildProvider>
    </WalletProvider>
  );
};

const Web3ChildProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();

  return (
    <SIWAProvider
      onSignIn={() => router.refresh()}
      onSignOut={() => router.refresh()}
      {...siwaConfig}
    >
      <Web3Contextual>{children}</Web3Contextual>
    </SIWAProvider>
  );
};

export default Web3AVMProvider;
