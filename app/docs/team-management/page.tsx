import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    ArrowRight,
    Shield,
    Users,
    CheckCircle,
    AlertTriangle,
    Github,
    Trash2,
    UserPlus,
    Wallet,
    FileText,
} from "lucide-react"

export default function TeamManagementPage() {
    return (
        <div className="max-w-3xl">
            <div className="space-y-2">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Team Management</h1>
                <p className="text-lg text-muted-foreground">
                    Learn how to claim proposals, manage team members, and use the whitelist feature in xGov Explorer.
                </p>
            </div>

            <Alert className="my-6 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <AlertTitle className="text-amber-800 dark:text-amber-400">Prerequisites</AlertTitle>
                <AlertDescription className="text-amber-800 dark:text-amber-400">
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>You must have a GitHub account that matches the GitHub username in your proposal</li>
                        <li>Your proposal must be in the xGov Explorer database</li>
                        <li>You must be signed in with your GitHub account</li>
                    </ul>
                </AlertDescription>
            </Alert>

            <div className="my-8">
                <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">Claiming Your Proposal</h2>

                <p className="mb-4">
                    Claiming a proposal verifies that you're a member of the project team and gives you the ability to post
                    progress updates and manage your team. Here's how to claim your proposal:
                </p>

                <div className="space-y-6 my-8">
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <span className="font-bold text-primary">1</span>
                                </div>
                                <CardTitle>Find Your Proposal</CardTitle>
                            </div>
                            <CardDescription>Navigate to the Projects page and find your proposal</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Use the search or filter functionality to locate your proposal in the Projects section. Click on the
                                proposal to view its details.
                            </p>
                            <div className="rounded-md bg-muted p-3 text-sm">
                                <p className="font-medium mb-1">Tip:</p>
                                <p className="text-muted-foreground">
                                    You can filter projects by category, xGov period, or search by team name to find your proposal more
                                    quickly.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline" size="sm">
                                <Link href="/teams">
                                    Go to Projects
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <span className="font-bold text-primary">2</span>
                                </div>
                                <CardTitle>Sign In with GitHub</CardTitle>
                            </div>
                            <CardDescription>Ensure you're signed in with the correct GitHub account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                The GitHub username must match the one in your proposal (usually in the format "Team Name
                                (@github_username)").
                            </p>
                            <div className="flex items-center p-3 bg-muted rounded-md text-sm mb-4">
                                <Github className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>Your GitHub username must match the one in your proposal for verification.</span>
                            </div>
                            <Alert className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                <AlertDescription className="text-amber-800 dark:text-amber-400 text-xs">
                                    If your GitHub username doesn't match, you won't be able to claim the proposal. Contact support if you
                                    need to update the GitHub username in your proposal.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                        <CardFooter>
                            <Button asChild size="sm">
                                <Link href="/api/auth/signin">
                                    <Github className="mr-2 h-4 w-4" />
                                    Sign In with GitHub
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <span className="font-bold text-primary">3</span>
                                </div>
                                <CardTitle>Claim the Proposal</CardTitle>
                            </div>
                            <CardDescription>Click the "Claim Proposal" button to verify your ownership</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                On your proposal page, you'll find a "Claim This Proposal" section. Click the "Claim Proposal" button to
                                verify your ownership and become an admin of the team.
                            </p>
                            <div className="border rounded-lg p-4 mb-4">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="font-semibold">Claim This Proposal</div>
                                    <div className="text-xs bg-muted px-2 py-1 rounded flex items-center">
                                        <Github className="h-3 w-3 mr-1" />
                                        @username
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                    If you are a member of Team Name (@username), you can claim this proposal to add progress updates.
                                </p>
                                <div className="flex justify-end">
                                    <Button size="sm">Claim Proposal</Button>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                After successfully claiming the proposal, you'll become an admin of the team and can access the Team
                                Dashboard.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="my-12">
                <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">Team Dashboard</h2>

                <p className="mb-6">
                    The Team Dashboard is where you can manage your team members, whitelist addresses, and view your proposals.
                    Once you've claimed a proposal, you can access the Team Dashboard from the navigation menu or from your
                    claimed proposal page.
                </p>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full justify-start mb-6">
                        <TabsTrigger value="overview">Dashboard Overview</TabsTrigger>
                        <TabsTrigger value="whitelist">Whitelist Management</TabsTrigger>
                        <TabsTrigger value="members">Team Members</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Accessing the Team Dashboard</CardTitle>
                                <CardDescription>There are multiple ways to access your team dashboard</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                                            <span className="font-bold text-primary">1</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">From the Navigation Menu</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Click on "Team Dashboard" in the navigation menu. This option is available once you've claimed a
                                                proposal.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                                            <span className="font-bold text-primary">2</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">From Your Claimed Proposal</h4>
                                            <p className="text-sm text-muted-foreground">
                                                On your claimed proposal page, click on "Team Dashboard" in the Proposal Claimed section.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border rounded-lg p-4 mt-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center text-green-600 dark:text-green-400">
                                                <CheckCircle className="h-5 w-5 mr-2" />
                                                Proposal Claimed
                                            </div>
                                            <div className="text-xs bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded border border-green-200 dark:border-green-800 flex items-center">
                                                <Users className="h-3 w-3 mr-1" />
                                                Team Active
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            You are a member of the team for this proposal. You can now add progress updates.
                                        </p>
                                        <div className="flex justify-end">
                                            <Button variant="outline" size="sm" className="flex items-center">
                                                <Users className="h-4 w-4 mr-2" />
                                                Team Dashboard
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Dashboard Features</CardTitle>
                                <CardDescription>The Team Dashboard provides several key features</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center mb-2">
                                            <Shield className="h-5 w-5 mr-2 text-primary" />
                                            <h4 className="font-medium">Whitelist Management</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Add or remove Algorand addresses to control who can join your team.
                                        </p>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center mb-2">
                                            <Users className="h-5 w-5 mr-2 text-primary" />
                                            <h4 className="font-medium">Team Members</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground">View all members of your team and their roles.</p>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center mb-2">
                                            <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                                            <h4 className="font-medium">Proposals</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            View all proposals associated with your team and their status.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="whitelist" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Managing Whitelisted Addresses</CardTitle>
                                <CardDescription>Control which Algorand addresses can join your team</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    As a team admin, you can whitelist Algorand addresses to allow users to join your team. This is useful
                                    for team members who don't have a GitHub account or whose GitHub username doesn't match the proposal.
                                </p>

                                <div className="space-y-6">
                                    <div className="border-l-2 border-primary pl-4 py-1">
                                        <h4 className="font-medium mb-2">Adding a Whitelisted Address</h4>
                                        <ol className="list-decimal pl-5 space-y-2 text-sm">
                                            <li>Go to the Team Dashboard</li>
                                            <li>Select the "Whitelisted Addresses" tab</li>
                                            <li>Click the "Add Algorand Address to Whitelist" button</li>
                                            <li>Enter the Algorand address in the dialog</li>
                                            <li>Click "Add to Whitelist" to confirm</li>
                                        </ol>

                                        <div className="mt-4 border rounded-lg p-4 bg-muted/30">
                                            <div className="flex items-center justify-between mb-3">
                                                <h5 className="font-medium">Add Algorand Address</h5>
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-sm font-medium mb-1 block">Algorand Address</label>
                                                    <div className="h-9 rounded-md border bg-muted/30 px-3 py-2 text-sm">
                                                        ALGO1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ
                                                    </div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <Button size="sm">
                                                        <UserPlus className="mr-2 h-4 w-4" />
                                                        Add to Whitelist
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-l-2 border-destructive pl-4 py-1">
                                        <h4 className="font-medium mb-2">Removing a Whitelisted Address</h4>
                                        <ol className="list-decimal pl-5 space-y-2 text-sm">
                                            <li>Go to the Team Dashboard</li>
                                            <li>Select the "Whitelisted Addresses" tab</li>
                                            <li>Find the address you want to remove</li>
                                            <li>Click the trash icon next to the address</li>
                                            <li>Confirm the removal in the dialog</li>
                                        </ol>

                                        <div className="mt-4 border rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="bg-primary/10 p-2 rounded-full">
                                                        <CheckCircle className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <div className="font-mono text-sm">ALGO1234...WXYZ</div>
                                                        <div className="text-xs text-muted-foreground">Added on January 1, 2023</div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Remove address</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Alert className="mt-6 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                    <AlertDescription className="text-amber-800 dark:text-amber-400 text-xs">
                                        Only team admins can add or remove addresses from the whitelist. If you claimed the proposal, you
                                        are automatically an admin of the team.
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="members" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Team Members</CardTitle>
                                <CardDescription>Understand team member roles and management</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    The "Team Members" tab in the Team Dashboard shows all the users who are part of your team. Team
                                    members can be added in two ways:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center mb-2">
                                            <Github className="h-5 w-5 mr-2 text-primary" />
                                            <h4 className="font-medium">GitHub Verification</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Users with a GitHub username that matches the proposal can claim the proposal and become team
                                            members.
                                        </p>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center mb-2">
                                            <Wallet className="h-5 w-5 mr-2 text-primary" />
                                            <h4 className="font-medium">Whitelisted Addresses</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Users with an Algorand wallet address that has been whitelisted can join the team.
                                        </p>
                                    </div>
                                </div>

                                <h4 className="font-medium mb-3">Team Member Roles</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center mb-2">
                                            <Shield className="h-5 w-5 mr-2 text-primary" />
                                            <h4 className="font-semibold">Admin</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Admins can manage the team, add/remove whitelisted addresses, and post progress updates. The user
                                            who claims the proposal becomes an admin automatically.
                                        </p>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center mb-2">
                                            <Users className="h-5 w-5 mr-2 text-primary" />
                                            <h4 className="font-semibold">Member</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Members can view team information and post progress updates, but cannot manage the team or
                                            whitelist.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            <div className="my-12">
                <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">Next Steps</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="overflow-hidden">
                        <div className="h-1.5 bg-purple-500 w-full" />
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                                    <Wallet className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <CardTitle>Wallet Integration</CardTitle>
                            </div>
                            <CardDescription>Connect your Algorand wallet to xGov Explorer</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm">
                            <p>Learn how to connect your Algorand wallet and use it for authentication and team access.</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="ghost" size="sm" className="gap-1">
                                <Link href="/docs/wallet-integration">
                                    Read Guide
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="overflow-hidden">
                        <div className="h-1.5 bg-green-500 w-full" />
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                    <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <CardTitle>Progress Updates</CardTitle>
                            </div>
                            <CardDescription>Keep the community informed about your project</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm">
                            <p>Learn how to post progress updates and track your project's completion percentage.</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="ghost" size="sm" className="gap-1">
                                <Link href="/docs/progress-updates">
                                    Read Guide
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

