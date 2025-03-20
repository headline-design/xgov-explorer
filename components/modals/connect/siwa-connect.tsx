import { Button } from "@/components/ui/rust-button";
import { useSIWA } from "@vmkit/connect-avm";
import { Account } from "./shared/components";
import FlatAlgo from "@/icons/flat-brands/flat-algo-v2";
import { useState } from "react";
import { useLogout } from "@/lib/hooks/use-logout";
import { useWallet } from '@txnlab/use-wallet-react'

const ConnectRoot = () => {
    const [loadingWallet, setLoadingWallet] = useState(null);
    const { activeAddress, wallets } = useWallet();

    const { handleDisconnect, signingOut: isPending } = useLogout();
    const isConnected = activeAddress !== "";

    const { data, isRejected, isLoading, isSignedIn, signOut, signIn } = useSIWA();

    const handleSignIn = async () => {
        await signIn()?.then(() => { });
    };

    const handleSignOut = async () => {
        await signOut()?.then(() => { });
    }

    const handleButtonClick = async (wallet) => {
        setLoadingWallet(wallet.id);
        await wallet.connect()
        setLoadingWallet(null);
    };

    const account = {
        address: activeAddress,
        chainId: 1,
    }

    if (isSignedIn) {
        return (
            <>
                <div>Address: {data?.address}</div>
                <div>ChainId: {data?.chainId}</div>
                <button onClick={handleSignOut}>Sign Out</button>
            </>
        );
    }

    if (isConnected && account?.address) {
        return (
            <>
                <div className="flex h-full flex-1 flex-col">
                    <p className="text-lg text-foreground font-medium">Sign In</p>
                    <p className="text-muted-foreground">EVM Client connected. Sign in with SIWE.</p>
                    <div className="my-4 flex h-auto min-h-24 flex-col gap-3 overflow-y-auto rounded-lg border bg-background-tertiary  p-2">
                        <Account key={activeAddress} account={account} selected={true} />
                    </div>
                    <div className="grid gap-3">
                        <Button onClick={handleSignIn} disabled={isLoading} loading={isLoading} text={isRejected ? "Try Again" : isLoading ? "Awaiting request..." : "Sign In"} />
                        <Button variant="outline" onClick={handleDisconnect} disabled={isPending || isLoading} text="Disconnect" />
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col">
                <p className="text-lg text-foreground font-medium">SIWE</p>
                <p className="mb-4 text-muted-foreground">Connect your AVM wallet to secure your session with Algorand.</p>
                {wallets.map((wallet) => (
                    <Button key={wallet.id} disabled={isLoading} text={isLoading ? "Connecting wallet..." : `${wallet.id}`} onClick={() => handleButtonClick(wallet)} icon={wallet.metadata.name} loading={wallet.id === loadingWallet} />
                ))}
            </div>
            <FlatAlgo className="mx-auto mt-[6%] h-[88px] w-[88px] items-center justify-center opacity-30" />
        </>
    );
};

export const SIWAConnect = () => {
    return (
        <div className="w-full">
            <div className="flex min-h-[384px] w-full flex-1 flex-col rounded-xl border p-4 sm:h-96">
                <ConnectRoot />
            </div>
        </div>
    );
};

export default SIWAConnect;
