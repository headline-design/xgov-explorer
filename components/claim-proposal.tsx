"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/toast"
import { Loader2, CheckCircle, AlertCircle, Github } from "lucide-react"
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

    // Extract GitHub username from the GitHub URL
    const githubUsername = proposalGithub ? proposalGithub.match(/github\.com\/([^/]+)/)?.[1] : null

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
                                This proposal is associated with GitHub user: <span className="font-medium">{githubUsername}</span>
                            </span>
                        </div>

                        {error && (
                            <div className="flex items-start rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                                <AlertCircle className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="flex justify-end">
                            <Button onClick={handleClaim} disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Claiming...
                                    </>
                                ) : status === "authenticated" ? (
                                    "Claim Proposal"
                                ) : (
                                    "Sign in with GitHub to Claim"
                                )}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-4 text-muted-foreground">
                        <p>This proposal does not have a GitHub link associated with it.</p>
                        <p className="text-sm mt-2">GitHub information is required to verify your ownership of this proposal.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

