"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, PlusCircle, Info, AlertCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/toast/toast"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar-v2/avatar-2"

interface ProgressUpdate {
    id: string
    title: string
    content: string
    completionPercentage: number
    createdAt: string
    user: {
        id: string
        name: string | null
        image: string | null
    }
}

interface ProgressUpdatesProps {
    proposalId: string
    teamName: string
    currentCompletionPercentage: number
    progressUpdates?: ProgressUpdate[]
    isInDatabase?: boolean
}

export function ProgressUpdates({
    proposalId,
    teamName,
    currentCompletionPercentage,
    progressUpdates = [],
    isInDatabase = false,
}: ProgressUpdatesProps) {
    const { data: session, status } = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [completionPercentage, setCompletionPercentage] = useState(currentCompletionPercentage)
    const [localProgressUpdates, setLocalProgressUpdates] = useState<ProgressUpdate[]>(progressUpdates)
    const [isTeamMember, setIsTeamMember] = useState(false)
    const [checkingMembership, setCheckingMembership] = useState(true)

    // Check if user is a team member using the claim API
    useEffect(() => {
        if (status === "authenticated" && isInDatabase) {
            setCheckingMembership(true)
            fetch(`/api/proposals/${proposalId}/claim`)
                .then((res) => res.json())
                .then((data) => {
                    setIsTeamMember(data.isMember)
                    setCheckingMembership(false)
                })
                .catch((err) => {
                    console.error("Error checking team membership:", err)
                    setCheckingMembership(false)
                })
        } else if (status === "unauthenticated") {
            setCheckingMembership(false)
        }
    }, [status, proposalId, isInDatabase])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch(`/api/proposals/${proposalId}/progress`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    completionPercentage,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()

                // Handle specific error cases
                if (response.status === 404) {
                    throw new Error("This proposal does not exist in the database. Please seed the database first.")
                }

                throw new Error(errorData.error || "Failed to submit progress update")
            }

            const newUpdate = await response.json()
            setLocalProgressUpdates([newUpdate, ...localProgressUpdates])
            setTitle("")
            setContent("")
            setShowForm(false)
            toast({
                title: "Success",
                description: "Progress update submitted successfully",
            })

            // Reload the page to reflect the updated completion percentage
            window.location.reload()
        } catch (error) {
            console.error("Error submitting progress update:", error)
            toast.error({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to submit progress update",
            })
        } finally {
            setSubmitting(false)
        }
    }

    // If the proposal is not in the database, show a message
    if (!isInDatabase) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Progress Updates</h3>
                </div>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center py-4 text-muted-foreground">
                            <p className="mb-2">
                                This proposal does not exist in the database yet. Progress updates are only available for database
                                proposals.
                            </p>
                            <p className="text-sm">To enable progress updates, run the database seed script:</p>
                            <pre className="bg-muted p-2 rounded-md mt-2 text-xs overflow-x-auto">npm run seed</pre>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (checkingMembership) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Progress Updates</h3>
                </div>
                <Card className="border-muted">
                    <CardContent className="flex items-center justify-center py-8">
                        <div className="text-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                            <p className="text-muted-foreground">Checking team membership...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Progress Updates</h3>
                {isTeamMember && !showForm && (
                    <Button onClick={() => setShowForm(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Update
                    </Button>
                )}
            </div>

            {!isTeamMember && status === "authenticated" && (
                <Card className="border-amber-200 dark:border-amber-900 overflow-hidden">
                    <div className="h-1 bg-amber-500" />
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center text-amber-600 dark:text-amber-400">
                                <AlertCircle className="mr-2 h-5 w-5" />
                                Team Membership Required
                            </CardTitle>
                            <Badge
                                variant="outline"
                                className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                            >
                                Not a Member
                            </Badge>
                        </div>
                        <CardDescription>You need to claim this proposal to add progress updates.</CardDescription>
                    </CardHeader>
                    <CardFooter className="bg-amber-50 dark:bg-amber-900/10 pt-3 pb-3 text-sm text-muted-foreground border-t border-amber-100 dark:border-amber-900/50">
                        <div className="flex items-center">
                            <Info className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
                            Check the &quot;Claim This Proposal&quot; section above to join the team.
                        </div>
                    </CardFooter>
                </Card>
            )}

            {showForm && (
                <Card className="border-primary/50 overflow-hidden">
                    <div className="h-1 bg-primary" />
                    <CardHeader>
                        <CardTitle>New Progress Update</CardTitle>
                        <CardDescription>
                            Share your progress with the community. Updates will be visible on the proposal page.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium mb-1">
                                    Title
                                </label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    placeholder="Update title"
                                />
                            </div>

                            <div>
                                <label htmlFor="content" className="block text-sm font-medium mb-1">
                                    Content
                                </label>
                                <Textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    placeholder="Describe your progress..."
                                    rows={4}
                                />
                            </div>

                            <div>
                                <label htmlFor="completion" className="block text-sm font-medium mb-1">
                                    Completion Percentage: {completionPercentage}%
                                </label>
                                <Slider
                                    id="completion"
                                    value={[completionPercentage]}
                                    min={0}
                                    max={100}
                                    step={1}
                                    onValueChange={(value) => setCompletionPercentage(value[0])}
                                    className="py-4"
                                />
                                <div className="w-full h-2 bg-muted rounded-full mt-1 overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: `${completionPercentage}%` }}></div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setShowForm(false)} disabled={submitting}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit Update"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {localProgressUpdates.length === 0 ? (
                <div className="text-center py-8 bg-muted/20 rounded-lg border">
                    <div className="mx-auto bg-muted/30 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                        <Info className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium">No progress updates yet.</p>
                    {isTeamMember && (
                        <p className="mt-2 text-sm text-muted-foreground">
                            {showForm
                                ? "Fill out the form above to add the first update."
                                : 'Click "Add Update" to add the first update.'}
                        </p>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {localProgressUpdates.map((update) => (
                        <Card key={update.id} className="overflow-hidden">
                            <div className="h-1 bg-primary/50" />
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-base">{update.title}</CardTitle>
                                        <div className="flex items-center mt-1">
                                            <p className="text-sm text-muted-foreground">{new Date(update.createdAt).toLocaleDateString()}</p>
                                            <Badge variant="outline" className="ml-2 text-xs">
                                                {update.completionPercentage}% Complete
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Avatar className="h-8 w-8 mr-2">
                                            <AvatarImage src={update.user.image || undefined} alt={update.user.name || "User"} />
                                            <AvatarFallback>{update.user.name?.charAt(0) || "U"}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{update.user.name || "Anonymous"}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    {update.content.split("\n").map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="bg-muted/10 pt-3 pb-3 text-xs text-muted-foreground border-t">
                                <div className="w-full">
                                    <div className="flex justify-between items-center mb-1">
                                        <span>Project Completion:</span>
                                        <span>{update.completionPercentage}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${update.completionPercentage}%` }}></div>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

