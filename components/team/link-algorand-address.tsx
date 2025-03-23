"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/toast/toast"
import { Loader2, AlertCircle, Trash2, LogOut, LogIn, Info } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface WalletAccount {
  address: string
  status: "Connected" | "Disconnected"
}

interface TeamMemberWallet {
  teamId: string
  userId: string
  walletAddress: string
  isWhitelisted: boolean
  createdAt: string
}

interface LinkAlgorandAddressProps {
  teamId: string
  whitelistedAddresses: string[]
}

type AccountProps = {
  address: string
  status: "Connected" | "Disconnected" | "Whitelisted"
  onAction: () => void
  onDisconnect?: () => void
  onConnect?: () => void
}

const WalletAccount: React.FC<AccountProps> = ({ address, status, onAction, onDisconnect, onConnect }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar>
            <AvatarImage src={`/api/www/avatar/${address}`} alt={`Wallet ${address}`} />
            <AvatarFallback>{address.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 rounded-full bg-background p-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-primary"
            >
              <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
              <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-base font-medium">
            {address.substring(0, 6)}...{address.substring(address.length - 4)}
          </div>
          <Badge variant={status === "Connected" ? "default" : status === "Whitelisted" ? "outline" : "secondary"}>
            {status}
          </Badge>
        </div>
      </div>
      <div className="flex space-x-2">
        {status === "Connected" && onDisconnect && (
          <Button variant="outline" size="icon" onClick={onDisconnect} title="Disconnect">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Disconnect</span>
          </Button>
        )}
        {status === "Disconnected" && onConnect && (
          <Button variant="outline" size="icon" onClick={onConnect} title="Connect">
            <LogIn className="h-4 w-4" />
            <span className="sr-only">Connect</span>
          </Button>
        )}
        <Button variant="outline" size="icon" onClick={onAction} title="Remove">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remove</span>
        </Button>
      </div>
    </div>
  )
}

export function LinkAlgorandAddress({ teamId, whitelistedAddresses }: LinkAlgorandAddressProps) {
  const { data: session, status: sessionStatus } = useSession()
  const [activeTab, setActiveTab] = useState("linked")
  const [loading, setLoading] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [linkedWallets, setLinkedWallets] = useState<WalletAccount[]>([])
  const [teamWallets, setTeamWallets] = useState<TeamMemberWallet[]>([])
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [showInfoDialog, setShowInfoDialog] = useState(false)

  // Mock function to simulate connecting a wallet
  const connectWallet = async () => {
    setConnecting(true)
    try {
      // In a real implementation, this would use a wallet connection library
      // For now, we'll simulate a connection after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock response with a random Algorand address
      const mockAddress = `ALGO${Math.random().toString(36).substring(2, 10).toUpperCase()}${Math.random().toString(36).substring(2, 10).toUpperCase()}`

      // Add the new wallet to the linked wallets
      setLinkedWallets((prev) => [...prev, { address: mockAddress, status: "Connected" }])

      toast({
        title: "Wallet Connected",
        description: "Your Algorand wallet has been successfully connected.",
      })
    } catch (error) {
      console.error("Error connecting wallet:", error)
      toast.error({
        title: "Connection Failed",
        description: "Failed to connect your Algorand wallet. Please try again.",
      })
    } finally {
      setConnecting(false)
    }
  }

  // Mock function to simulate disconnecting a wallet
  const disconnectWallet = (address: string) => {
    setLinkedWallets((prev) =>
      prev.map((wallet) => (wallet.address === address ? { ...wallet, status: "Disconnected" } : wallet)),
    )

    toast({
      title: "Wallet Disconnected",
      description: "Your Algorand wallet has been disconnected.",
    })
  }

  // Mock function to simulate linking a wallet to the team
  const linkWalletToTeam = async (address: string) => {
    setLoading(true)
    try {
      // In a real implementation, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add the wallet to the team wallets
      const newTeamWallet: TeamMemberWallet = {
        teamId,
        userId: session?.user?.id || "user-id",
        walletAddress: address,
        isWhitelisted: whitelistedAddresses.includes(address),
        createdAt: new Date().toISOString(),
      }

      setTeamWallets((prev) => [...prev, newTeamWallet])

      toast({
        title: "Wallet Linked",
        description: "Your Algorand wallet has been linked to your team account.",
      })
    } catch (error) {
      console.error("Error linking wallet:", error)
      toast.error({
        title: "Linking Failed",
        description: "Failed to link your Algorand wallet. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  // Mock function to simulate removing a wallet
  const removeWallet = async (address: string) => {
    setItemToDelete(address)
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return

    setLoading(true)
    try {
      // In a real implementation, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Remove the wallet from both lists
      setLinkedWallets((prev) => prev.filter((wallet) => wallet.address !== itemToDelete))
      setTeamWallets((prev) => prev.filter((wallet) => wallet.walletAddress !== itemToDelete))

      toast({
        title: "Wallet Removed",
        description: "The Algorand wallet has been removed from your account.",
      })
    } catch (error) {
      console.error("Error removing wallet:", error)
      toast.error({
        title: "Removal Failed",
        description: "Failed to remove the Algorand wallet. Please try again.",
      })
    } finally {
      setLoading(false)
      setItemToDelete(null)
    }
  }

  if (sessionStatus === "loading") {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Algorand Wallets</CardTitle>
              <CardDescription>Link Algorand wallets to your team account</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowInfoDialog(true)}>
              <Info className="h-5 w-5" />
              <span className="sr-only">Information</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="linked">Linked Wallets</TabsTrigger>
              <TabsTrigger value="whitelisted">Whitelisted Addresses</TabsTrigger>
            </TabsList>

            <TabsContent value="linked" className="mt-6 space-y-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">
                    {linkedWallets.filter((w) => w.status === "Connected").length > 0
                      ? "Algorand Wallet Connected"
                      : "No Algorand Wallet Connected"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {linkedWallets.length} wallet(s) linked to your account
                  </p>
                </div>
                <Button onClick={connectWallet} disabled={connecting}>
                  {connecting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Connect Wallet"
                  )}
                </Button>
              </div>

              {linkedWallets.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No wallets linked</AlertTitle>
                  <AlertDescription>
                    You haven't linked any Algorand wallets to your account yet. Connect a wallet to get started.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {linkedWallets.map((wallet) => (
                    <WalletAccount
                      key={wallet.address}
                      address={wallet.address}
                      status={wallet.status}
                      onAction={() => removeWallet(wallet.address)}
                      onDisconnect={wallet.status === "Connected" ? () => disconnectWallet(wallet.address) : undefined}
                      onConnect={wallet.status === "Disconnected" ? () => connectWallet() : undefined}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="whitelisted" className="mt-6 space-y-4">
              {whitelistedAddresses.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No whitelisted addresses</AlertTitle>
                  <AlertDescription>
                    Your team hasn't whitelisted any Algorand addresses yet. Team admins can whitelist addresses in the
                    team settings.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {whitelistedAddresses.map((address) => {
                    const isLinked = teamWallets.some((w) => w.walletAddress === address)
                    return (
                      <div key={address} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage
                              src={`/api/www/avatar/${address}`}
                              alt={`Wallet ${address}`}
                            />
                            <AvatarFallback>{address.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {address.substring(0, 6)}...{address.substring(address.length - 4)}
                            </div>
                            <Badge variant="outline">Whitelisted</Badge>
                          </div>
                        </div>
                        {!isLinked ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => linkWalletToTeam(address)}
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Linking...
                              </>
                            ) : (
                              "Link to Account"
                            )}
                          </Button>
                        ) : (
                          <Badge variant="default">Linked to Account</Badge>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Wallet</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this wallet from your account? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>About Wallet Linking</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4 text-left">
                <p>
                  <strong>What is wallet linking?</strong>
                  <br />
                  Linking an Algorand wallet to your account allows you to interact with the xGov Explorer platform
                  using your wallet without having to sign out and sign back in with a different account.
                </p>
                <p>
                  <strong>Whitelisted Addresses</strong>
                  <br />
                  Team admins can whitelist specific Algorand addresses that are authorized to interact with the team's
                  projects. If your address is whitelisted, you can link it to your account from this page.
                </p>
                <p>
                  <strong>Security</strong>
                  <br />
                  When you link a wallet, you'll need to sign a message to prove ownership of the wallet. This ensures
                  that only you can link your wallet to your account.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

