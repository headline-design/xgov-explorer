"use client"

import SIWAConnect from "./siwa-connect"
import { IconCheckCircleFill } from "@/icons/rust/check-circle-fill"

export const AVMWalletsScreen = ({ onWalletConnected, mode = "connect" }) => {
  return (
    <div className="space-y-3">
      <SIWAConnect onWalletConnected={onWalletConnected} mode={mode} />
    </div>
  )
}

export const LoadingScreen = ({ provider }) => {
  return (
    <div className="pointer-events-auto inset-0 flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-6 text-center">
        <div className="flex flex-col items-center ">
          <div className="text-4xl">{provider.iconLarge}</div>
          <h1 className="text-xl font-bold">Requesting Connection</h1>
          <p className="text-secondary">
            {provider.type === "web3"
              ? `Open the ${provider.name} ${provider.location} to connect your wallet.`
              : `Redirecting to ${provider.name} for authentication.`}
          </p>
        </div>
      </div>
    </div>
  )
}

export const ErrorScreen = () => (
  <div className="pointer-events-auto">
    <div className="relative z-10 opacity-100">BIG ERROR PROBLEM</div>
  </div>
)

export const SuccessScreen = ({ walletAddress, mode = "connect" }) => (
  <div className="flex flex-col items-center justify-center p-4 gap-2">
    <h2 className="text-xl font-semibold text-success-link">
      {mode === "connect" ? "Wallet Connected!" : "Sign in Successful!"}
    </h2>
    <p className="text-sm text-gray-500">
      {mode === "connect"
        ? "Your wallet has been successfully linked to your account"
        : "You are now connected to xGov Explorer"}
    </p>
    <IconCheckCircleFill className="h-16 w-16 fill-success-link mt-2" />
    {walletAddress && mode === "connect" && (
      <div className="mt-2 p-2 bg-gray-100 rounded-md font-mono text-xs break-all">{walletAddress}</div>
    )}
  </div>
)

