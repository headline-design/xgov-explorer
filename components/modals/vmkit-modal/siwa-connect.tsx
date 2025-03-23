"use client"

import { Button } from "@/components/ui/rust-button"
import { useSIWA } from "@vmkit/connect-avm"
import { Account } from "./shared/components"
import FlatAlgo from "@/icons/flat-brands/flat-algo-v2"
import { useState } from "react"
import { useLogout } from "@/lib/hooks/use-logout"
import { useWallet } from "@txnlab/use-wallet-react"
import { useUser } from "@/providers/user-provider"
import { useSharedConnect } from "./shared-context"

const ConnectRoot = ({ onWalletConnected, mode = "connect" }) => {
    const { dispatch } = useSharedConnect()
    const [loadingWallet, setLoadingWallet] = useState(null)
    const { activeAddress, wallets, activeWallet } = useWallet()
    const { fetchUser } = useUser()

    const { handleDisconnect, signingOut: isPending } = useLogout()
    const isConnected = activeAddress !== ""

    const { data, isRejected, isLoading, isSignedIn, signIn, signOut } = useSIWA()

    const handleSignIn = async () => {
        await signIn()
            ?.then(() => {
                fetchUser(true)
                dispatch({ type: "SET_CURRENT_SCREEN", payload: "success" })
                if (onWalletConnected && activeAddress && mode === "connect") {
                    onWalletConnected(activeAddress)
                }
            })
            .catch(() => {
                console.error("Error signing in:", "SIWA sign in failed")
            })
    }

    const handleSignOut = async () => {
        await signOut()
            ?.then(() => {
                activeWallet?.disconnect()
            })
            .catch(() => {
                console.error("Error signing out:", "SIWA sign out failed")
            })
    }

    const handleButtonClick = async (wallet) => {
        setLoadingWallet(wallet.id)
        await wallet
            .connect()
            .then(() => {
                setLoadingWallet(null)
            })
            .catch(() => {
                setLoadingWallet(null)
            })
        setLoadingWallet(null)
    }

    const account = {
        address: activeAddress,
        chainId: 1000,
    }

    if (isSignedIn) {
        return (
            <>
                <div>Address: {data?.address}</div>
                <div>ChainId: {data?.chainId}</div>
                <button onClick={handleSignOut}>Sign Out</button>
            </>
        )
    }

    if (isConnected && account?.address) {
        return (
            <>
                <div className="flex h-full flex-1 flex-col">
                    <p className="text-lg text-foreground font-medium">Sign In</p>
                    <p className="text-muted-foreground">AVM Client connected. Sign in with SIWE.</p>
                    <div className="my-4 flex h-auto min-h-24 flex-col gap-3 overflow-y-auto rounded-lg border bg-background-tertiary p-2">
                        <Account key={activeAddress} account={account} selected={true} />
                    </div>
                    <div className="grid gap-3">
                        <Button
                            onClick={handleSignIn}
                            disabled={isLoading}
                            loading={isLoading}
                            text={
                                isRejected
                                    ? "Try Again"
                                    : isLoading
                                        ? "Awaiting request..."
                                        : mode === "connect"
                                            ? "Connect"
                                            : "Sign In"
                            }
                        />
                        <Button variant="outline" onClick={handleSignOut} disabled={isPending || isLoading} text="Disconnect" />
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="flex flex-col">
                <p className="text-lg text-foreground font-medium">SIWE</p>
                <p className="mb-4 text-muted-foreground">Connect your AVM wallet to secure your session with Algorand.</p>
                {wallets.map((wallet) => (
                    <Button
                        key={wallet.id}
                        disabled={wallet.id === loadingWallet}
                        text={wallet.id === loadingWallet ? "Connecting wallet..." : `Connect`}
                        onClick={() => handleButtonClick(wallet)}
                        loading={wallet.id === loadingWallet}
                    />
                ))}
            </div>
            <FlatAlgo className="mx-auto mt-[6%] h-[88px] w-[88px] items-center justify-center opacity-30" />
        </>
    )
}

export const SIWAConnect = ({ onWalletConnected, mode = "connect" }) => {
    return (
        <div className="w-full">
            <div className="flex min-h-[384px] w-full flex-1 flex-col rounded-xl border p-4 sm:h-96">
                <ConnectRoot onWalletConnected={onWalletConnected} mode={mode} />
            </div>
        </div>
    )
}

export default SIWAConnect

