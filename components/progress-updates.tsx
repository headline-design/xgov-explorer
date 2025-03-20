"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { toast } from "./ui/toast"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar/avatar"

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

    // Check if user is a team member or admin
    const isTeamMember = session?.user?.role === "admin" || false // This is a placeholder, we'll need to check team membership

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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Progress Updates</h3>
                {isTeamMember && !showForm && <Button onClick={() => setShowForm(true)}>Add Update</Button>}
            </div>

            {showForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>New Progress Update</CardTitle>
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
                <div className="text-center py-8 text-muted-foreground">
                    <p>No progress updates yet.</p>
                    {isTeamMember && (
                        <p className="mt-2">
                            {showForm
                                ? "Fill out the form above to add the first update."
                                : 'Click "Add Update" to add the first update.'}
                        </p>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {localProgressUpdates.map((update) => (
                        <Card key={update.id}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-base">{update.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(update.createdAt).toLocaleDateString()} • Completion: {update.completionPercentage}%
                                        </p>
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
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

