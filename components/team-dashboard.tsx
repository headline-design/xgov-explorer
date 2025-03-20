"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/toast"
import { Loader2, UserPlus, Trash2, ExternalLink, CheckCircle, Github, Copy } from "lucide-react"
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
import { TeamDashboardProps } from "@/app/team/page"


export function TeamDashboard({ teams, currentUserId }: TeamDashboardProps) {
  const router = useRouter()
  const [activeTeam, setActiveTeam] = useState<string>(teams[0]?.id || "")
  const [addingAddress, setAddingAddress] = useState(false)
  const [algorandAddress, setAlgorandAddress] = useState("")
  const [removingAddressId, setRemovingAddressId] = useState<string | null>(null)
  const [showAddressDialog, setShowAddressDialog] = useState(false)

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
      <div>
        <h1 className="text-3xl font-bold mb-2">Team Dashboard</h1>
        <p className="text-muted-foreground">Manage your teams&apos; whitelisted addresses and view your proposals</p>
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
          <TabsTrigger value="whitelist">Whitelisted Addresses</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
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
                            <Link href={`/proposal/${proposal.id}`}>
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
      </Tabs>
    </div>
  )
}

