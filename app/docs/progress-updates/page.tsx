import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, Info, CheckCircle, PlusCircle, ArrowUpRight } from "lucide-react"
import ButtonLink from "@/components/ui/button-link"

export default function ProgressUpdatesPage() {
  return (
    <div className="max-w-3xl">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Progress Updates</h1>
        <p className="text-lg text-muted-foreground">
          Learn how to post progress updates for your xGov-funded project and keep the community informed about your
          development.
        </p>
      </div>

      <Alert className="my-6 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-400">Prerequisites</AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-400">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              You must be a member of the project team (either through GitHub verification or a whitelisted address)
            </li>
            <li>The proposal must be claimed by a team member</li>
            <li>You must be signed in with your GitHub account or connected with your whitelisted wallet</li>
          </ul>
        </AlertDescription>
      </Alert>

      <div className="my-8">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">
          Understanding Progress Updates
        </h2>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg p-6 border border-green-100 dark:border-green-900/50">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
            Why Post Progress Updates?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-background rounded-lg p-4 border shadow-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Keep the Community Informed</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Share your progress with the Algorand community and keep stakeholders updated.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-background rounded-lg p-4 border shadow-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Track Completion Percentage</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Visualize and track the progress of your project toward completion.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-background rounded-lg p-4 border shadow-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Build Trust and Transparency</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Demonstrate accountability and build trust with the Algorand community.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-background rounded-lg p-4 border shadow-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Showcase Achievements</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Highlight your team's accomplishments and milestones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">
          Posting a Progress Update
        </h2>

        <p className="mb-6">To post a progress update for your project, follow these steps:</p>

        <div className="space-y-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <span className="font-bold text-primary">1</span>
                </div>
                <CardTitle>Navigate to Your Proposal Page</CardTitle>
              </div>
              <CardDescription>Find your proposal in the Projects section</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Go to your proposal page by finding it in the Projects section or through your Team Dashboard.
              </p>
              <div className="flex justify-between gap-4">
                <Button asChild variant="outline" size="sm">
                  <Link href="/teams">Browse Projects</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/team">Team Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <span className="font-bold text-primary">2</span>
                </div>
                <CardTitle>Find the Progress Updates Section</CardTitle>
              </div>
              <CardDescription>Locate the Progress Updates section on your proposal page</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Scroll down to the "Progress Updates" section on your proposal page. If you're a team member, you'll see
                an "Add Update" button.
              </p>
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Progress Updates</h3>
                  <Button size="sm" className="flex items-center">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Update
                  </Button>
                </div>
                <div className="text-center py-6 bg-muted/20 rounded-lg border">
                  <div className="mx-auto bg-muted/30 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                    <Info className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="font-medium">No progress updates yet.</p>
                  <p className="mt-2 text-sm text-muted-foreground">Click "Add Update" to add the first update.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <span className="font-bold text-primary">3</span>
                </div>
                <CardTitle>Fill Out the Update Form</CardTitle>
              </div>
              <CardDescription>Provide details about your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Click the "Add Update" button to open the update form. Fill out the following fields:
              </p>

              <div className="border rounded-lg p-6 bg-card">
                <h4 className="font-medium mb-4">New Progress Update</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <div className="h-10 rounded-md border bg-muted/30 px-3 py-2 text-sm">
                      Milestone 1 Completed: Smart Contract Development
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <div className="h-24 rounded-md border bg-muted/30 px-3 py-2 text-sm">
                      We've completed the development of the core smart contracts for our platform. This includes the
                      token contract, staking mechanism, and governance features. All contracts have been thoroughly
                      tested and are ready for audit.
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Completion Percentage: 40%</label>
                    <div className="h-4 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                    <Button size="sm">Submit Update</Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Title</p>
                    <p className="text-sm text-muted-foreground">
                      A concise title for your update that summarizes the progress made.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Content</p>
                    <p className="text-sm text-muted-foreground">
                      A detailed description of your progress, including what you've accomplished, challenges faced, and
                      next steps.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Completion Percentage</p>
                    <p className="text-sm text-muted-foreground">
                      The current completion percentage of your project. This should reflect your overall progress
                      toward your goals.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <span className="font-bold text-primary">4</span>
                </div>
                <CardTitle>Submit the Update</CardTitle>
              </div>
              <CardDescription>Review and submit your progress update</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Review your update and click the "Submit Update" button. Your update will be posted to the proposal page
                and the completion percentage will be updated.
              </p>
              <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-400 text-xs">
                  After submitting, your update will be visible to everyone who visits the proposal page.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">
          Best Practices for Progress Updates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Be Regular and Consistent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Post updates regularly to keep the community informed about your progress. Aim for at least one update
                per month, or more frequently if there are significant developments.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Be Detailed and Specific</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Provide specific details about what you've accomplished, challenges you've faced, and your next steps.
                This helps the community understand your progress and the value of your work.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Include Technical Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                When appropriate, include technical details about your implementation, architecture decisions, or code
                changes. This is valuable for other developers in the community.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Be Honest About Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Don't hesitate to share challenges or setbacks you've encountered. Being transparent about difficulties
                builds trust with the community and may even lead to helpful suggestions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Update the Completion Percentage Accurately</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The completion percentage should reflect the actual progress of your project relative to your proposal's
                goals and milestones. Be realistic and accurate in your assessment.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Include Visual Elements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                When possible, include screenshots, diagrams, or other visual elements to illustrate your progress.
                Visual elements can make your updates more engaging and easier to understand.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">
          Example Progress Update
        </h2>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Milestone 2 Completed: Frontend Integration</CardTitle>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-muted-foreground">March 15, 2023</p>
                  <div className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">65% Complete</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-muted mr-2"></div>
                <span className="text-sm font-medium">John Doe</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                We're excited to announce that we've completed the frontend integration for our DeFi platform. This
                milestone includes:
              </p>
              <ul>
                <li>Wallet connection with multiple Algorand wallets (Pera, Defly Wallet, Kibisis Wallet, Lute Wallet)</li>
                <li>Asset management interface for viewing and transferring tokens</li>
                <li>Staking interface with real-time APY calculations</li>
                <li>Governance voting interface with proposal creation and voting mechanisms</li>
              </ul>
              <p>
                All frontend components have been thoroughly tested and are working seamlessly with our smart contracts.
                We've also implemented comprehensive error handling and user feedback mechanisms to ensure a smooth user
                experience.
              </p>
              <p>Our next steps include:</p>
              <ol>
                <li>Conducting a security audit of both the smart contracts and frontend</li>
                <li>Implementing user feedback from our beta testers</li>
                <li>Preparing for the mainnet launch</li>
              </ol>
              <p>We're on track to complete the project by the end of Q2 2023 as outlined in our proposal.</p>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Project Completion:</span>
                <span className="text-xs">65%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "65%" }}></div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/10 pt-3 pb-3 text-xs text-muted-foreground border-t">
            <div className="flex items-center">
              <Info className="h-4 w-4 mr-2 text-primary" />
              This is an example of a well-structured progress update with clear information about accomplishments and
              next steps.
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-muted p-6 rounded-lg mt-10">
        <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
        <p className="mb-4">
          If you have any questions or need assistance with posting progress updates, please don't hesitate to reach out
          to our team.
        </p>
        <ButtonLink href="https://x.com/headline_crypto" target="_blank" rel="noopener noreferrer" variant="outline" className="mr-4" text="learn more" icon={<ArrowUpRight className="h-4 w-4 flex-shrink-0" />} />
      </div>
    </div>
  )
}

