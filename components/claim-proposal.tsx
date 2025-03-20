"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/toast"
import { Loader2, CheckCircle, AlertCircle, Github, LogIn, XCircle } from "lucide-react"
import { signIn } from "next-auth/react"

interface ClaimProposalProps {
    proposalId: string
    proposalGithub?: string
    teamName: string
}

export function ClaimProposal({ proposalId, proposalGithub, teamName }: ClaimProposalProps) {
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(false)
    const [checking, setChecking] = useState(true)
    const [isMember, setIsMember] = useState(false)
    const [error, setError] = useState<string | null>(null)

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
        // Check if the user is already a member of the team
        if (status === "authenticated" && proposalId) {
            setChecking(true)
            fetch(`/api/proposals/${proposalId}/claim`)
                .then((res) => res.json())
                .then((data) => {
                    setIsMember(data.isMember)
                    setChecking(false)
                })
                .catch((err) => {
                    console.error("Error checking team membership:", err)
                    setChecking(false)
                })
        } else if (status === "unauthenticated") {
            setChecking(false)
        }
    }, [status, proposalId])

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
            <Card>
                <CardHeader>
                    <CardTitle>Checking Proposal Status</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-6">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        )
    }

    if (isMember) {
        return (
            <Card className="border-green-200 dark:border-green-900">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-green-600 dark:text-green-400">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Proposal Claimed
                    </CardTitle>
                    <CardDescription>
                        You are a member of the team for this proposal. You can now add progress updates.
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Claim This Proposal</CardTitle>
                <CardDescription>
                    If you are a member of {teamName}, you can claim this proposal to add progress updates.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {githubUsername ? (
                    <div className="space-y-4">
                        <div className="flex items-center text-sm">
                            <Github className="mr-2 h-4 w-4" />
                            <span>
                                This proposal is associated with GitHub user: <span className="font-medium">@{githubUsername}</span>
                            </span>
                        </div>

                        {error && (
                            <div className="flex items-start rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                                <AlertCircle className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="flex justify-end">
                            {status === "unauthenticated" ? (
                                <Button onClick={() => signIn("github")}>
                                    <LogIn className="mr-2 h-4 w-4" />
                                    Sign in with GitHub to Claim
                                </Button>
                            ) : isMatchingGithubUser ? (
                                <Button onClick={handleClaim} disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Claiming...
                                        </>
                                    ) : (
                                        "Claim Proposal"
                                    )}
                                </Button>
                            ) : (
                                <div className="flex flex-col items-end space-y-2">
                                    <div className="flex items-center text-sm text-destructive">
                                        <XCircle className="mr-2 h-4 w-4" />
                                        <span>
                                            Your GitHub username ({session?.user?.gh_username}) doesn&apos;t match this proposal&apos;s GitHub username.
                                        </span>
                                    </div>
                                    <Button variant="outline" onClick={() => signIn("github")}>
                                        Sign in with a Different GitHub Account
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-4 text-muted-foreground">
                        <p>This proposal does not have a GitHub username associated with it.</p>
                        <p className="text-sm mt-2">GitHub information is required to verify your ownership of this proposal.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

