"use client"

import type React from "react"
import { ExternalLink, Blocks, Wallet, Coins } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/rust-button";
import { ExitIcon } from "@radix-ui/react-icons"
import { GradientAvatar } from "./gradient-avatar"
import { AddressDisplay, BlockchainType, detectBlockchainType } from "./address-formatter"

// Get explorer URL for a blockchain address
const getExplorerUrl = (address: string, blockchainType: BlockchainType): string => {
    switch (blockchainType) {
        case "ethereum":
            return `https://etherscan.io/address/${address}`
        case "solana":
            return `https://explorer.solana.com/address/${address}`
        case "algorand":
            return `https://explorer.perawallet.app/address/${address}`
        case "polkadot":
            return `https://polkadot.subscan.io/account/${address}`
        default:
            return "#"
    }
}

// Get blockchain icon component
const BlockchainIcon = ({ type }: { type: BlockchainType }) => {
    switch (type) {
        case "ethereum":
            return <Blocks className="h-4 w-4 text-[#627EEA]" />
        case "solana":
            return <Coins className="h-4 w-4 text-[#9945FF]" />
        case "algorand":
            return <Wallet className="h-4 w-4 text-[#00BFAA]" />
        case "polkadot":
            return <Coins className="h-4 w-4 text-[#E6007A]" />
        default:
            return <Blocks className="h-4 w-4" />
    }
}

type AccountProps = {
    account: any
    selected?: boolean
    onSelect?: () => void
}

export const Account: React.FC<AccountProps> = ({ account, selected, onSelect }) => {
    const blockchainType = detectBlockchainType(account.address)
    const isSubstrate = blockchainType === "polkadot"
    const explorerUrl = getExplorerUrl(account.address, blockchainType)

    return (
        <div
            onClick={isSubstrate ? onSelect : undefined}
            className={cn(
                "border bg-accents-2 px-2 py-1.5 rounded-lg flex items-center justify-between pr-4",
                isSubstrate ? "cursor-pointer" : "",
                isSubstrate && selected ? "border-foreground/20 bg-accent/50" : "",
                isSubstrate && !selected ? "hover:bg-accent/40" : "",
            )}
        >
            <div className="flex items-center gap-3">
                <GradientAvatar address={account.address} size={32} />
                <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-foreground text-base">{account?.meta?.name}</span>

                    </div>
                    <div className="text-xs text-muted-foreground">
                        <AddressDisplay address={account.address} prefixLength={4} suffixLength={4} withCopyButton={true} />
                    </div>
                </div>
            </div>

            {isSubstrate ? (
                // For Substrate/Polkadot accounts, show selection indicator
                <div className={cn("h-2 w-2 rounded-full", selected ? "bg-foreground" : "bg-foreground-muted")} />
            ) : (
                // For other blockchains, show explorer link

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    icon={<ExternalLink className="h-4 w-4 flex-shrink-0" />}
                    onClick={(e) => {
                        e.stopPropagation()
                        window.open(explorerUrl, "_blank")
                    }}
                />
            )}
        </div>
    )
}

type ProfileProps = {
    account: any
    token: string
    onSignOut: () => void
}

export const Profile: React.FC<ProfileProps> = ({ account, token, onSignOut }) => {
    const blockchainType = detectBlockchainType(account.address)

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <GradientAvatar address={account.address} size={32} />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-base text-foreground">{account?.meta?.name}</span>
                            <BlockchainIcon type={blockchainType} />
                        </div>
                        <div className="text-xs text-muted-foreground">
                            <AddressDisplay address={account.address} prefixLength={4} suffixLength={4} withCopyButton={true} />
                        </div>
                    </div>
                </div>
                <Button variant="outline" size="icon" onClick={onSignOut}>
                    <ExitIcon />
                </Button>
            </div>
        </div>
    )
}

