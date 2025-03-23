"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/toast/toast"
import { Loader2, CheckCircle, AlertCircle, Github, LogIn, XCircle, Info, ArrowRight, Users } from "lucide-react"
import { signIn } from "next-auth/react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface ClaimProposalProps {
    proposalId: string
    proposalGithub?: string
    teamName: string
    initialClaimed?: boolean
}

export function ClaimProposal({ proposalId, proposalGithub, teamName, initialClaimed = false }: ClaimProposalProps) {
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(false)
    const [checking, setChecking] = useState(true)
    const [isMember, setIsMember] = useState(false)
    const [claimed, setClaimed] = useState(initialClaimed)
    const [error, setError] = useState<string | null>(null)
    const [showInfo, setShowInfo] = useState(false)

    // Extract GitHub username from team name (format: "Name (@github_username)")
    const githubUsernameMatch = teamName.match(/@([^)]+)/)
    const githubUsername = githubUsernameMatch ? githubUsernameMatch[1] : null

    // Check if the current user's GitHub username matches the proposal's GitHub username
    const isMatchingGithubUser =
        status === "authenticated" &&
        session?.user?.gh_username &&
        githubUsername &&
        session.user.gh_username.toLowerCase() === githubUsername.toLowerCase()

    useEffect(() => {
        // Check if the user is already a member of the team and if the proposal is claimed
        if (status === "authenticated" && proposalId) {
            setChecking(true)
            fetch(`/api/proposals/${proposalId}/claim`)
                .then((res) => res.json())
                .then((data) => {
                    setIsMember(data.isMember)
                    setClaimed(data.claimed)
                    setChecking(false)
                })
                .catch((err) => {
                    console.error("Error checking team membership:", err)
                    setChecking(false)
                })
        } else if (status === "unauthenticated") {
            // For unauthenticated users, we'll use the initialClaimed prop
            setClaimed(initialClaimed)
            setChecking(false)
        }
    }, [status, proposalId, initialClaimed])

    const handleClaim = async () => {
        if (!session) {
            signIn("github")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/proposals/${proposalId}/claim`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to claim proposal")
            }

            setIsMember(true)
            setClaimed(true)
            toast({
                title: "Success",
                description: "You have successfully claimed this proposal",
            })
        } catch (error) {
            console.error("Error claiming proposal:", error)
            setError(error instanceof Error ? error.message : "Failed to claim proposal")
            toast.error({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to claim proposal",
            })
        } finally {
            setLoading(false)
        }
    }

    if (checking) {
        return (
            <Card className="border-muted">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">Checking Proposal Status</CardTitle>
                    <CardDescription>Verifying if this proposal has been claimed...</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </CardContent>
            </Card>
        )
    }

    // If the proposal is claimed
    if (claimed) {
        return (
            <Card className="border-green-200 dark:border-green-900 overflow-hidden">
                <div className="h-1 bg-green-500" />
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-green-600 dark:text-green-400">
                            <CheckCircle className="mr-2 h-5 w-5" />
                            Proposal Claimed
                        </CardTitle>
                        <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                        >
                            <Users className="h-3 w-3 mr-1" />
                            Team Active
                        </Badge>
                    </div>
                    <CardDescription>
                        {isMember
                            ? "You are a member of the team for this proposal. You can now add progress updates."
                            : "This proposal has been claimed by the team. Only team members can add progress updates."}
                    </CardDescription>
                </CardHeader>
                <CardFooter className="bg-green-50 dark:bg-green-900/10 pt-3 pb-3 text-sm text-muted-foreground border-t border-green-100 dark:border-green-900/50">
                    <div className="flex items-center">
                        <Info className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                        {isMember
                            ? "Check the Progress Updates section below to add updates to your proposal."
                            : "Check the Progress Updates section below to see the latest updates from the team."}
                    </div>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card className="overflow-hidden">
            <div className="h-1 bg-primary" />
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                        Claim This Proposal
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 ml-2 rounded-full"
                                        onClick={() => setShowInfo(!showInfo)}
                                    >
                                        <Info className="h-4 w-4" />
                                        <span className="sr-only">What does claiming do?</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-xs">
                                        Claiming a proposal verifies you&apos;re part of the team and allows you to post progress updates.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardTitle>
                    {githubUsername && (
                        <Badge variant="outline" className="flex items-center gap-1 bg-muted/50">
                            <Github className="h-3 w-3" />
                            {githubUsername}
                        </Badge>
                    )}
                </div>
                <CardDescription>
                    If you are a member of {teamName}, you can claim this proposal to add progress updates.
                </CardDescription>
            </CardHeader>

            {showInfo && (
                <CardContent className="bg-muted/30 border-y pt-6">
                    <div className="space-y-2 text-sm">
                        <h4 className="font-medium">What does claiming a proposal do?</h4>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Verifies you&apos;re a member of the proposal team</li>
                            <li>Allows you to post progress updates</li>
                            <li>Helps track completion percentage</li>
                            <li>Requires your GitHub username to match the proposal&apos;s GitHub username</li>
                        </ul>
                    </div>
                </CardContent>
            )}

            <CardContent className="pt-4">
                {githubUsername ? (
                    <div className="space-y-4">
                        <div className="flex items-start p-3 rounded-md bg-muted/50 text-sm">
                            <Github className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                            <div>
                                <p>
                                    This proposal is associated with GitHub user <span className="font-medium">@{githubUsername}</span>
                                </p>
                                {status === "authenticated" && session?.user?.gh_username && (
                                    <p className="mt-1 text-xs">
                                        {isMatchingGithubUser ? (
                                            <span className="text-green-600 dark:text-green-400 font-medium">
                                                ✓ Your GitHub username matches
                                            </span>
                                        ) : (
                                            <span className="text-destructive font-medium">
                                                ✗ Your GitHub username (@{session.user.gh_username}) doesn&apos;t match
                                            </span>
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-start rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                                <AlertCircle className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:justify-end">
                            {status === "unauthenticated" ? (
                                <Button onClick={() => signIn("github")} className="w-full sm:w-auto">
                                    <LogIn className="mr-2 h-4 w-4" />
                                    Sign in with GitHub
                                </Button>
                            ) : isMatchingGithubUser ? (
                                <Button onClick={handleClaim} disabled={loading} className="w-full sm:w-auto">
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Claiming...
                                        </>
                                    ) : (
                                        <>
                                            Claim Proposal
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            ) : (
                                <>
                                    <div className="flex items-center text-sm text-destructive bg-destructive/10 p-3 rounded-md w-full sm:w-auto">
                                        <XCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                                        <span>GitHub username mismatch</span>
                                    </div>
                                    <Button variant="outline" onClick={() => signIn("github")} className="w-full sm:w-auto">
                                        Sign in with Different Account
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6 text-muted-foreground">
                        <div className="mx-auto bg-muted/30 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                            <AlertCircle className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="font-medium">This proposal does not have a GitHub username associated with it.</p>
                        <p className="text-sm mt-2">GitHub information is required to verify your ownership of this proposal.</p>
                    </div>
                )}
            </CardContent>

            <CardFooter className="bg-muted/20 pt-3 pb-3 text-xs text-muted-foreground border-t">
                <div className="flex items-center">
                    <Info className="h-3 w-3 mr-2" />
                    Only verified team members can claim proposals and post updates.
                </div>
            </CardFooter>
        </Card>
    )
}

