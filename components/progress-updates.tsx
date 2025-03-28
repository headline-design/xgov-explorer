"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, PlusCircle, Info, AlertCircle, Edit, Trash2, MoreVertical } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/toast/toast"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
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
import { formatDistanceToNow } from "date-fns"

interface ProgressUpdate {
    id: string
    title: string
    content: string
    completionPercentage: number
    createdAt: string
    updatedAt?: string
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
    const [updateCompletionPercentage, setUpdateCompletionPercentage] = useState(0)
    const [localProgressUpdates, setLocalProgressUpdates] = useState<ProgressUpdate[]>(progressUpdates)
    const [isTeamMember, setIsTeamMember] = useState(false)
    const [checkingMembership, setCheckingMembership] = useState(true)
    const [editingUpdateId, setEditingUpdateId] = useState<string | null>(null)
    const [deleteUpdateId, setDeleteUpdateId] = useState<string | null>(null)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

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

    // Reset form when not editing
    useEffect(() => {
        if (!editingUpdateId) {
            setTitle("")
            setContent("")
            // For new updates, default to the current overall completion percentage as a starting point
            setUpdateCompletionPercentage(currentCompletionPercentage)
        }
    }, [editingUpdateId, currentCompletionPercentage])

    // Load update data for editing
    const startEditing = useCallback((update: ProgressUpdate) => {
        setEditingUpdateId(update.id)
        setTitle(update.title)
        setContent(update.content)
        setUpdateCompletionPercentage(update.completionPercentage)
        setShowForm(true)

        // Scroll to form
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
        }, 100)
    }, [])

    const cancelEditing = useCallback(() => {
        setEditingUpdateId(null)
        setShowForm(false)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            let newUpdate // Declare newUpdate here

            if (editingUpdateId) {
                // Update existing progress update
                const response = await fetch(`/api/proposals/${proposalId}/progress/${editingUpdateId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        content,
                        completionPercentage: updateCompletionPercentage,
                    }),
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || "Failed to update progress update")
                }

                const updatedUpdate = await response.json()

                // Update local state
                setLocalProgressUpdates((prevUpdates) =>
                    prevUpdates.map((update) => (update.id === editingUpdateId ? updatedUpdate : update)),
                )

                toast.success("Progress update modified successfully")
                setEditingUpdateId(null)
            } else {
                // Create new progress update
                const response = await fetch(`/api/proposals/${proposalId}/progress`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        content,
                        completionPercentage: updateCompletionPercentage,
                        // Only update the overall proposal completion if this is the latest update
                        updateProposalCompletion:
                            localProgressUpdates.length === 0 || updateCompletionPercentage > currentCompletionPercentage,
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

                newUpdate = await response.json()
                setLocalProgressUpdates([newUpdate, ...localProgressUpdates])

                toast.success("Progress update submitted successfully")
            }

            // Reset form
            setTitle("")
            setContent("")
            setShowForm(false)

            // Only reload if this update affects the overall proposal completion
            // This should be determined by the server, not automatically
            if (newUpdate?.updatedProposalCompletion) {
                window.location.reload()
            }
        } catch (error) {
            console.error("Error with progress update:", error)
            toast.error({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to process progress update",
            })
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (updateId: string) => {
        setSubmitting(true)

        try {
            const response = await fetch(`/api/proposals/${proposalId}/progress/${updateId}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to delete progress update")
            }

            // Update local state
            setLocalProgressUpdates((prevUpdates) => prevUpdates.filter((update) => update.id !== updateId))

            toast.success("Progress update deleted successfully")

            // Reload if it was the latest update (which affects the current completion percentage)
            if (localProgressUpdates[0]?.id === updateId) {
                window.location.reload()
            }
        } catch (error) {
            console.error("Error deleting progress update:", error)
            toast.error({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to delete progress update",
            })
        } finally {
            setSubmitting(false)
            setShowDeleteDialog(false)
            setDeleteUpdateId(null)
        }
    }

    const confirmDelete = (updateId: string) => {
        setDeleteUpdateId(updateId)
        setShowDeleteDialog(true)
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
            {/* Overall proposal completion status */}
            <Card className="border-primary/30 overflow-hidden">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Overall Project Completion</CardTitle>
                    <CardDescription>Current progress for the entire proposal</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Completion:</span>
                            <span className="font-semibold">{currentCompletionPercentage}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${currentCompletionPercentage}%` }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            This represents the overall completion of the proposal. Individual progress updates track milestones along
                            the way.
                        </p>
                    </div>
                </CardContent>
            </Card>

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
                            Check the "Claim This Proposal" section above to join the team.
                        </div>
                    </CardFooter>
                </Card>
            )}

            {showForm && (
                <Card className="border-primary/50 overflow-hidden" id="update-form">
                    <div className="h-1 bg-primary" />
                    <CardHeader>
                        <CardTitle>{editingUpdateId ? "Edit Progress Update" : "New Progress Update"}</CardTitle>
                        <CardDescription>
                            {editingUpdateId
                                ? "Modify your progress update details below."
                                : "Share your progress with the community. This update represents a milestone in your project."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
                                    Update Completion Percentage: {updateCompletionPercentage}%
                                </label>
                                <p className="text-xs text-muted-foreground mb-2">
                                    This represents the completion status at the time of this update. It may or may not affect the overall
                                    proposal completion.
                                </p>
                                <Slider
                                    id="completion"
                                    value={[updateCompletionPercentage]}
                                    min={0}
                                    max={100}
                                    step={1}
                                    onValueChange={(value) => setUpdateCompletionPercentage(value[0])}
                                    className="py-4"
                                />
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={editingUpdateId ? cancelEditing : () => setShowForm(false)}
                                    disabled={submitting}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {editingUpdateId ? "Updating..." : "Submitting..."}
                                        </>
                                    ) : editingUpdateId ? (
                                        "Update"
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
                                        <div className="flex items-center">
                                            <CardTitle className="text-base">{update.title}</CardTitle>
                                            {update.updatedAt && update.updatedAt !== update.createdAt && (
                                                <Badge variant="outline" className="ml-2 text-xs">
                                                    Edited
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <p className="text-sm text-muted-foreground">
                                                {formatDistanceToNow(new Date(update.createdAt), { addSuffix: true })}
                                            </p>
                                            <Badge variant="outline" className="ml-2 text-xs">
                                                {update.completionPercentage}% Complete
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Avatar className="h-8 w-8 mr-2">
                                            <AvatarImage src={update?.user?.image || undefined} alt={update?.user?.name || "User"} />
                                            <AvatarFallback>{update?.user?.name?.charAt(0) || "U"}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{update.user.name || "Anonymous"}</span>

                                        {isTeamMember && session?.user?.id === update.user.id && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => startEditing(update)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => confirmDelete(update.id)}
                                                        className="text-destructive focus:text-destructive"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
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
                                        <span>Update Completion Status:</span>
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

            {/* Delete confirmation dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the progress update.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteUpdateId && handleDelete(deleteUpdateId)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

