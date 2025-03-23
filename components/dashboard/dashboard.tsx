"use client"

import type React from "react"

import { useContext, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar-v2/avatar-2"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  UserPlus,
  Trash2,
  ExternalLink,
  CheckCircle,
  Github,
  Copy,
  Wallet,
  Info,
  AlertCircle,
  LogOut,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useUser } from "@/providers/user-provider"
import { DashboardProps } from "@/app/dashboard/page"
import { toast } from "../ui/toast/toast"
import { GlobalModalContext } from "@/providers/global-modal-provider"

// Change the component name from TeamDashboard to Dashboard
// Update all references to "team" in UI text to be more generic

// 1. Change the component name and props interface:
export function Dashboard({ teams, currentUserId }: DashboardProps) {
  const router = useRouter()
  const { user, isLoading: userLoading, fetchUser } = useUser()
  const [activeTeam, setActiveTeam] = useState<string>(teams[0]?.id || "")
  const [addingAddress, setAddingAddress] = useState(false)
  const [algorandAddress, setAlgorandAddress] = useState("")
  const [removingAddressId, setRemovingAddressId] = useState<string | null>(null)
  const [showAddressDialog, setShowAddressDialog] = useState(false)
  const [showWalletInfoDialog, setShowWalletInfoDialog] = useState(false)

  // Wallet management states
  const [disconnectingWalletId, setDisconnectingWalletId] = useState<string | null>(null)
  const [walletToRemove, setWalletToRemove] = useState<string | null>(null)
  const [linkingWhitelistedAddress, setLinkingWhitelistedAddress] = useState<string | null>(null)

  // Connect wallet modal
  const { setShowConnectWalletModal, setTeamId } = useContext(GlobalModalContext);

  // Get the currently selected team
  const currentTeam = teams.find((team) => team.id === activeTeam) || teams[0]

  // Check if user is admin of the current team
  const isAdmin =
    currentTeam?.members.some((member) => member.userId === currentUserId && member.role === "admin") || false

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!algorandAddress) {
      toast.error({
        title: "Error",
        description: "Please enter an Algorand address",
      })
      return
    }

    setAddingAddress(true)

    try {
      const response = await fetch(`/api/teams/${currentTeam.id}/whitelist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: algorandAddress,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to add address to whitelist")
      }

      toast({
        title: "Success",
        description: "Address added to whitelist successfully",
      })

      setAlgorandAddress("")
      setShowAddressDialog(false)
      router.refresh()
    } catch (error) {
      console.error("Error adding address to whitelist:", error)
      toast.error({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add address to whitelist",
      })
    } finally {
      setAddingAddress(false)
    }
  }

  const handleRemoveAddress = async (addressId: string) => {
    try {
      const response = await fetch(`/api/teams/${currentTeam.id}/whitelist/${addressId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to remove address from whitelist")
      }

      toast({
        title: "Success",
        description: "Address removed from whitelist successfully",
      })

      router.refresh()
    } catch (error) {
      console.error("Error removing address from whitelist:", error)
      toast.error({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to remove address from whitelist",
      })
    } finally {
      setRemovingAddressId(null)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Address copied to clipboard",
    })
  }

  const handleConnectWallet = () => {
    // Set the current team ID for the wallet connection
    setTeamId(currentTeam.id)
    // Show the connect wallet modal
    setShowConnectWalletModal(true)
  }

  const disconnectWallet = async (address: string) => {
    setDisconnectingWalletId(address)
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "disconnect_wallet",
          address,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to disconnect wallet")
      }

      // Refresh user data to get the updated wallets
      await fetchUser(true)

      toast({
        title: "Wallet Disconnected",
        description: "Your Algorand wallet has been disconnected.",
      })
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
      toast.error({
        title: "Disconnection Failed",
        description:
          error instanceof Error ? error.message : "Failed to disconnect your Algorand wallet. Please try again.",
      })
    } finally {
      setDisconnectingWalletId(null)
    }
  }

  const removeWallet = async (address: string) => {
    setWalletToRemove(address)
  }

  const confirmRemoveWallet = async () => {
    if (!walletToRemove) return

    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: walletToRemove,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to remove wallet")
      }

      // Refresh user data to get the updated wallets
      await fetchUser(true)

      toast({
        title: "Wallet Removed",
        description: "The Algorand wallet has been removed from your account.",
      })
    } catch (error) {
      console.error("Error removing wallet:", error)
      toast.error({
        title: "Removal Failed",
        description: error instanceof Error ? error.message : "Failed to remove the Algorand wallet. Please try again.",
      })
    } finally {
      setWalletToRemove(null)
    }
  }

  const linkWhitelistedWallet = async (address: string) => {
    setLinkingWhitelistedAddress(address)
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "add_wallet",
          address,
          name: "Whitelisted Wallet",
          provider: "manual",
          teamId: currentTeam.id, // Pass the team ID to check if the address is whitelisted
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to link whitelisted wallet")
      }

      // Refresh user data to get the updated wallets
      await fetchUser(true)

      toast({
        title: "Wallet Linked",
        description: "The whitelisted Algorand wallet has been linked to your account.",
      })
    } catch (error) {
      console.error("Error linking wallet:", error)
      toast.error({
        title: "Linking Failed",
        description: error instanceof Error ? error.message : "Failed to link the Algorand wallet. Please try again.",
      })
    } finally {
      setLinkingWhitelistedAddress(null)
    }
  }

  // Check if a whitelisted address is already linked to the user's account
  const isAddressLinked = (address: string) => {
    return user?.wallets?.some((wallet) => wallet.address === address) || false
  }

  // 3. Update the empty state text:
  if (teams.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No Teams Found</h2>
        <p className="text-muted-foreground">You are not currently a member of any teams.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 2. Update the heading text: */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Manage your proposals, teams, and wallet connections</p>
      </div>

      {teams.length > 1 && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="text-sm font-medium">Select Team:</div>
          <div className="flex flex-wrap gap-2">
            {teams.map((team) => (
              <Button
                key={team.id}
                variant={team.id === activeTeam ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTeam(team.id)}
                className="flex items-center gap-2"
              >
                {team.name}
                {team.members.some((member) => member.userId === currentUserId && member.role === "admin") && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    Admin
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}

      <Tabs defaultValue="whitelist" className="space-y-4">
        <TabsList>
          <TabsTrigger value="whitelist">Whitelist</TabsTrigger>
          <TabsTrigger value="members">Teams</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="wallets">Wallets</TabsTrigger>
        </TabsList>

        <TabsContent value="whitelist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Whitelisted Addresses</CardTitle>
              <CardDescription>
                Manage the Algorand addresses that are allowed to join your team and update proposals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentTeam.whitelistedAddresses.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No addresses whitelisted yet.</p>
                    <p className="text-sm mt-2">
                      Add Algorand addresses to allow users to join your team and update proposals.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentTeam.whitelistedAddresses.map((address) => (
                      <div key={address.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <CheckCircle className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-mono text-sm">
                              {address.address.slice(0, 8)}...{address.address.slice(-8)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Added on {new Date(address.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(address.address)}
                            className="h-8 w-8"
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy address</span>
                          </Button>

                          {isAdmin && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                  onClick={() => setRemovingAddressId(address.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Remove address</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remove Whitelisted Address</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove this address from the whitelist? Users with this
                                    address will no longer be able to join your team or update proposals.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    onClick={() => handleRemoveAddress(address.id)}
                                  >
                                    {removingAddressId === address.id ? (
                                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    ) : (
                                      <Trash2 className="h-4 w-4 mr-2" />
                                    )}
                                    Remove
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            {isAdmin && (
              <CardFooter>
                <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Algorand Address to Whitelist
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Algorand Address</DialogTitle>
                      <DialogDescription>
                        Add an Algorand address to the whitelist. Users with this address will be able to join your team
                        and update proposals.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddAddress}>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label htmlFor="algorand-address" className="text-sm font-medium">
                            Algorand Address
                          </label>
                          <Input
                            id="algorand-address"
                            placeholder="Enter Algorand address"
                            value={algorandAddress}
                            onChange={(e) => setAlgorandAddress(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={addingAddress}>
                          {addingAddress ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Adding...
                            </>
                          ) : (
                            <>Add to Whitelist</>
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Team Members</CardTitle>
              <CardDescription>Users who have joined your team and can update proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentTeam.members.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No team members yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentTeam.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={member.user.image || undefined} alt={member.user.name || "Team member"} />
                            <AvatarFallback>{member.user.name?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.user.name || "Anonymous"}</div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              {member.user.gh_username && (
                                <span className="flex items-center mr-2">
                                  <Github className="h-3 w-3 mr-1" />@{member.user.gh_username}
                                </span>
                              )}
                              <Badge variant="outline" className="ml-2">
                                {member.role}
                              </Badge>
                            </div>
                            {member.user.wallets && member.user.wallets.length > 0 && (
                              <div className="text-xs text-muted-foreground mt-1 font-mono">
                                {member.user.wallets[0].address.slice(0, 8)}...
                                {member.user.wallets[0].address.slice(-8)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Proposals</CardTitle>
              <CardDescription>View and manage your team&apos;s proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentTeam.proposals.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No proposals yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentTeam.proposals.map((proposal) => (
                      <div key={proposal.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{proposal.title}</h3>
                          <Badge variant={proposal.claimed ? "default" : "outline"}>
                            {proposal.claimed ? "Claimed" : "Unclaimed"}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Status:</span>
                            <span>{proposal.status}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Completion:</span>
                            <span>{proposal.completionPercentage}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${proposal.completionPercentage}%` }} />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/proposal/${proposal.number}`}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Proposal
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wallets tab using real user data */}
        <TabsContent value="wallets" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Algorand Wallets</CardTitle>
                  <CardDescription>Link Algorand wallets to your account to interact with the platform</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowWalletInfoDialog(true)}>
                  <Info className="h-5 w-5" />
                  <span className="sr-only">Information</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {userLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
                  <span>Loading wallet data...</span>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">
                        {user?.wallets && user.wallets.length > 0
                          ? "Algorand Wallets Connected"
                          : "No Algorand Wallets Connected"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.wallets?.length || 0} wallet(s) linked to your account
                      </p>
                    </div>
                    <Button onClick={handleConnectWallet}>
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect Wallet
                    </Button>
                  </div>

                  {!user?.wallets || user.wallets.length === 0 ? (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>No wallets linked</AlertTitle>
                      <AlertDescription>
                        You haven't linked any Algorand wallets to your account yet. Connect a wallet to get started.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-4">
                      {user.wallets.map((wallet) => (
                        <div
                          key={wallet.address}
                          className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <Avatar>
                                <AvatarImage
                                  src={`/api/www/avatar/${wallet.address}`}
                                  alt={`Wallet ${wallet.address}`}
                                />
                                <AvatarFallback>{wallet.address.substring(0, 2)}</AvatarFallback>
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
                              <div className="text-base font-medium">{"Algorand Wallet"}</div>
                              <div className="text-sm font-mono">
                                {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
                              </div>
                              {currentTeam.whitelistedAddresses.some((addr) => addr.address === wallet.address) && (
                                <Badge variant="outline" className="mt-1">
                                  Whitelisted
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => disconnectWallet(wallet.address)}
                              disabled={disconnectingWalletId === wallet.address}
                              title="Disconnect"
                            >
                              {disconnectingWalletId === wallet.address ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <LogOut className="h-4 w-4" />
                              )}
                              <span className="sr-only">Disconnect</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => removeWallet(wallet.address)}
                              title="Remove"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8">
                    <h4 className="text-sm font-medium mb-4">Whitelisted Addresses</h4>
                    {currentTeam.whitelistedAddresses.length === 0 ? (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>No whitelisted addresses</AlertTitle>
                        <AlertDescription>
                          Your team hasn't whitelisted any Algorand addresses yet. Team admins can whitelist addresses
                          in the Whitelisted Addresses tab.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div className="space-y-4">
                        {currentTeam.whitelistedAddresses.map((address) => {
                          const isLinked = isAddressLinked(address.address)
                          return (
                            <div key={address.id} className="flex items-center justify-between rounded-lg border p-4">
                              <div className="flex items-center space-x-4">
                                <Avatar>
                                  <AvatarImage
                                    src={`/api/www/avatar/${address.address}`}
                                    alt={`Wallet ${address.address}`}
                                  />
                                  <AvatarFallback>{address.address.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-mono text-sm">
                                    {address.address.slice(0, 8)}...{address.address.slice(-8)}
                                  </div>
                                  <Badge variant="outline">Whitelisted</Badge>
                                </div>
                              </div>
                              {!isLinked ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => linkWhitelistedWallet(address.address)}
                                  disabled={linkingWhitelistedAddress === address.address}
                                >
                                  {linkingWhitelistedAddress === address.address ? (
                                    <>
                                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
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
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Wallet info dialog */}
      <AlertDialog open={showWalletInfoDialog} onOpenChange={setShowWalletInfoDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>About Wallet Linking</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="space-y-4 text-left">
            <AlertDialogDescription>
              <strong>What is wallet linking?</strong>
              <br />
              Linking an Algorand wallet to your account allows you to interact with the xGov Explorer platform using
              your wallet without having to sign out and sign back in with a different account.
            </AlertDialogDescription>

            <AlertDialogDescription>
              <strong>Whitelisted Addresses</strong>
              <br />
              Team admins can whitelist specific Algorand addresses that are authorized to interact with the team's
              projects. If your address is whitelisted, you can link it to your account from this page.
            </AlertDialogDescription>

            <AlertDialogDescription>
              <strong>Security</strong>
              <br />
              When you link a wallet, you'll need to sign a message to prove ownership of the wallet. This ensures that
              only you can link your wallet to your account.
            </AlertDialogDescription>
          </div>

          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Wallet removal confirmation dialog - also update this one */}
      <AlertDialog open={!!walletToRemove} onOpenChange={(open) => !open && setWalletToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Wallet</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this wallet from your account? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveWallet}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

