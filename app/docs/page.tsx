import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Users, Wallet, FileText, ExternalLink, Github, Twitter } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="max-w-3xl">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">xGov Explorer Documentation</h1>
        <p className="text-lg text-muted-foreground">
          Learn how to use xGov Explorer to discover, track, and manage Algorand xGov-funded projects.
        </p>
      </div>

      <div className="my-8 flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">For the Community</CardTitle>
            <CardDescription>Discover and track xGov-funded projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 my-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Browse all xGov-funded projects</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>View detailed project information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Track project progress and milestones</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Stay updated on the latest developments</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/teams">
                Browse Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">For Project Teams</CardTitle>
            <CardDescription>Manage your projects and share progress</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 my-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Claim your proposals with GitHub verification</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Post progress updates to keep the community informed</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Manage your team members and whitelist addresses</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Showcase your project's achievements</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/api/auth/signin">
                Sign In to Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-4">Documentation Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <div className="h-1.5 bg-blue-500 w-full" />
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Team Management</CardTitle>
              </div>
              <CardDescription>Learn how to claim proposals and manage your team</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Understand how to verify your team, add members, and manage whitelisted addresses.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" size="sm" className="gap-1">
                <Link href="/docs/team-management">
                  Read Guide
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

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

          <Card className="overflow-hidden">
            <div className="h-1.5 bg-amber-500 w-full" />
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                  <ExternalLink className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle>External Resources</CardTitle>
              </div>
              <CardDescription>Additional resources for xGov participants</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Find links to official Algorand Foundation resources and community tools.</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="gap-1">
                <Link href="https://algorand.foundation/xgov" target="_blank" rel="noopener noreferrer">
                  xGov Program
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="gap-1">
                <Link href="https://algorand.foundation/governance" target="_blank" rel="noopener noreferrer">
                  Governance
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">Getting Started</h2>

        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="explore">Explore Projects</TabsTrigger>
            <TabsTrigger value="claim">Claim a Proposal</TabsTrigger>
            <TabsTrigger value="update">Post Updates</TabsTrigger>
          </TabsList>
          <TabsContent value="explore" className="space-y-4">
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted p-4">
                <h3 className="font-medium">Browsing xGov Projects</h3>
              </div>
              <div className="p-4">
                <p className="mb-4">
                  Start by exploring the projects page to discover xGov-funded initiatives. You can filter by category,
                  xGov period, or search for specific projects.
                </p>
                <div className="rounded-md bg-muted p-4 my-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">
                      1
                    </span>
                    <span className="font-medium">Navigate to the Projects page</span>
                  </div>
                  <div className="ml-7 mt-2 text-sm text-muted-foreground">
                    Click on "Projects" in the navigation menu or use the button below.
                  </div>
                </div>
                <div className="rounded-md bg-muted p-4 my-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">
                      2
                    </span>
                    <span className="font-medium">Use filters to narrow down results</span>
                  </div>
                  <div className="ml-7 mt-2 text-sm text-muted-foreground">
                    Filter by category, xGov period, or funding amount to find projects that interest you.
                  </div>
                </div>
                <div className="rounded-md bg-muted p-4 my-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">
                      3
                    </span>
                    <span className="font-medium">Click on a project to view details</span>
                  </div>
                  <div className="ml-7 mt-2 text-sm text-muted-foreground">
                    View comprehensive information about each project, including funding details, team information, and
                    progress updates.
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <Button asChild>
                    <Link href="/teams">
                      Browse Projects
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="claim" className="space-y-4">
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted p-4">
                <h3 className="font-medium">Claiming Your Proposal</h3>
              </div>
              <div className="p-4">
                <p className="mb-4">
                  If you're a member of a project team, you can claim your proposal by verifying your GitHub username.
                  This allows you to post progress updates and manage your team.
                </p>
                <div className="rounded-md bg-muted p-4 my-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">
                      1
                    </span>
                    <span className="font-medium">Sign in with GitHub</span>
                  </div>
                  <div className="ml-7 mt-2 text-sm text-muted-foreground">
                    Make sure you're signed in with your GitHub account. The GitHub username must match the one in your
                    proposal.
                  </div>
                </div>
                <div className="rounded-md bg-muted p-4 my-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">
                      2
                    </span>
                    <span className="font-medium">Find your proposal</span>
                  </div>
                  <div className="ml-7 mt-2 text-sm text-muted-foreground">
                    Navigate to the Projects page and find your proposal. You can use the search or filter functionality
                    to locate it.
                  </div>
                </div>
                <div className="rounded-md bg-muted p-4 my-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">
                      3
                    </span>
                    <span className="font-medium">Click "Claim Proposal"</span>
                  </div>
                  <div className="ml-7 mt-2 text-sm text-muted-foreground">
                    On your proposal page, you'll find a "Claim This Proposal" section. Click the "Claim Proposal"
                    button to verify your ownership.
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <Button asChild>
                    <Link href="/api/auth/signin">
                      Sign In with GitHub
                      <Github className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="update" className="space-y-4">
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted p-4">
                <h3 className="font-medium">Posting Progress Updates</h3>
              </div>
              <div className="p-4">
                <p className="mb-4">
                  Keep the community informed about your project's development by posting regular progress updates.
                </p>
                <div className="rounded-md bg-muted p-4 my-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">
                      1
                    </span>
                    <span className="font-medium">Navigate to your proposal page</span>
                  </div>
                  <div className="ml-7 mt-2 text-sm text-muted-foreground">
                    Go to your proposal page by finding it in the Projects section or through your Team Dashboard.
                  </div>
                </div>
                <div className="rounded-md bg-muted p-4 my-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">
                      2
                    </span>
                    <span className="font-medium">Find the Progress Updates section</span>
                  </div>
                  <div className="ml-7 mt-2 text-sm text-muted-foreground">
                    Scroll down to the "Progress Updates" section on your proposal page. If you're a team member, you'll
                    see an "Add Update" button.
                  </div>
                </div>
                <div className="rounded-md bg-muted p-4 my-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">
                      3
                    </span>
                    <span className="font-medium">Fill out the update form</span>
                  </div>
                  <div className="ml-7 mt-2 text-sm text-muted-foreground">
                    Add a title, detailed description, and update the completion percentage of your project.
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <Button asChild variant="outline">
                    <Link href="/docs/progress-updates">
                      Learn More About Progress Updates
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">Connect With Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                GitHub
              </CardTitle>
              <CardDescription>Contribute to the xGov Explorer project</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                xGov Explorer is open source. You can contribute to the project, report issues, or suggest improvements
                on GitHub.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://github.com/headline-design/xgov-explorer" target="_blank" rel="noopener noreferrer">
                  Visit GitHub Repository
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Twitter className="h-5 w-5" />
                Twitter
              </CardTitle>
              <CardDescription>Follow us for updates and announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Stay up to date with the latest news, feature announcements, and community highlights.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://twitter.com/headline_crypto" target="_blank" rel="noopener noreferrer">
                  Follow on Twitter
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

