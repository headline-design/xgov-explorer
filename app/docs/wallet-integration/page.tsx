import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight, Wallet, AlertTriangle, CheckCircle, Shield, Users, FileText } from "lucide-react"

export default function WalletIntegrationPage() {
  return (
    <div className="max-w-3xl">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Wallet Integration</h1>
        <p className="text-lg text-muted-foreground">
          Learn how to connect your Algorand wallet to xGov Explorer and use it for authentication and team management.
        </p>
      </div>

      <div className="my-8">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg p-6 border border-blue-100 dark:border-blue-900/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Wallet className="mr-2 h-5 w-5 text-primary" />
            Supported Wallets
          </h2>
          <p className="mb-4">xGov Explorer currently supports the following Algorand wallets:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-background rounded-lg p-4 text-center border shadow-sm">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">P</span>
              </div>
              <p className="font-medium">Pera Wallet</p>
            </div>
            <div className="bg-white dark:bg-background rounded-lg p-4 text-center border shadow-sm">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 font-bold">M</span>
              </div>
              <p className="font-medium">MyAlgo Wallet</p>
            </div>
            <div className="bg-white dark:bg-background rounded-lg p-4 text-center border shadow-sm">
              <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-amber-600 dark:text-amber-400 font-bold">A</span>
              </div>
              <p className="font-medium">AlgoSigner</p>
            </div>
            <div className="bg-white dark:bg-background rounded-lg p-4 text-center border shadow-sm">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-bold">D</span>
              </div>
              <p className="font-medium">Defly Wallet</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">Connecting Your Wallet</h2>

        <p className="mb-6">
          Connecting your Algorand wallet allows you to authenticate with xGov Explorer and access team features if your
          address is whitelisted.
        </p>

        <div className="space-y-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <span className="font-bold text-primary">1</span>
                </div>
                <CardTitle>Click "Connect Wallet"</CardTitle>
              </div>
              <CardDescription>Open the wallet connection dialog</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                In the navigation menu, click on the "Connect Wallet" button to open the wallet connection dialog.
              </p>
              <div className="border rounded-lg p-4 flex justify-center">
                <Button>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
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
                <CardTitle>Select Your Wallet</CardTitle>
              </div>
              <CardDescription>Choose your preferred wallet provider</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Choose your preferred wallet from the list of supported wallets.
              </p>
              <div className="border rounded-lg p-6">
                <h4 className="font-medium text-center mb-4">Select a Wallet</h4>
                <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                  <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">P</span>
                    </div>
                    <p className="text-sm">Pera Wallet</p>
                  </div>
                  <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 font-bold">M</span>
                    </div>
                    <p className="text-sm">MyAlgo</p>
                  </div>
                  <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">A</span>
                    </div>
                    <p className="text-sm">AlgoSigner</p>
                  </div>
                  <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">D</span>
                    </div>
                    <p className="text-sm">Defly</p>
                  </div>
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
                <CardTitle>Authorize the Connection</CardTitle>
              </div>
              <CardDescription>Approve the connection request in your wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Follow the prompts in your wallet to authorize the connection to xGov Explorer. This typically involves
                approving a connection request and signing a message to verify your ownership of the address.
              </p>
              <Alert className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="text-amber-800 dark:text-amber-400 text-xs">
                  Always verify that you're connecting to the official xGov Explorer website before authorizing any
                  wallet connections.
                </AlertDescription>
              </Alert>

              <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium">Wallet Connection Request</h5>
                </div>
                <div className="space-y-3">
                  <p className="text-sm">xGov Explorer is requesting to connect to your wallet.</p>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Reject
                    </Button>
                    <Button size="sm">Connect</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">
          Using Your Wallet for Team Access
        </h2>

        <p className="mb-6">
          If your Algorand address has been whitelisted by a team admin, you can use your wallet to access team
          features.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Accessing a Team with a Whitelisted Address</CardTitle>
            <CardDescription>Use your whitelisted Algorand address to join a team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                To access a team with your whitelisted address, follow these steps:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Connect your Algorand wallet</h4>
                    <p className="text-sm text-muted-foreground">
                      Make sure to connect the wallet that contains the whitelisted address.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Navigate to the Team Dashboard</h4>
                    <p className="text-sm text-muted-foreground">Click on "Team Dashboard" in the navigation menu.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Access team features</h4>
                    <p className="text-sm text-muted-foreground">
                      You'll automatically have access to the team if your address is whitelisted.
                    </p>
                  </div>
                </div>
              </div>

              <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-400 text-xs">
                  If your address is whitelisted, you'll be able to view team information and post progress updates.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">
          Wallet Security Best Practices
        </h2>

        <div className="space-y-4 mb-8">
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-amber-600 dark:text-amber-400" />
                Protect Your Seed Phrase
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                xGov Explorer will never ask for your seed phrase or private keys. Keep these secure and never share
                them with anyone.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-amber-600 dark:text-amber-400" />
                Verify Connection Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Always verify that you're connecting to the official xGov Explorer website before authorizing any wallet
                connections.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-amber-600 dark:text-amber-400" />
                Review Transactions Carefully
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Always review the details of any transaction you're asked to sign, including the recipient address and
                amount.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">Troubleshooting</h2>

        <Tabs defaultValue="connecting" className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="connecting">Connection Issues</TabsTrigger>
            <TabsTrigger value="access">Access Issues</TabsTrigger>
          </TabsList>

          <TabsContent value="connecting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Not Connecting</CardTitle>
                <CardDescription>Troubleshoot common connection problems</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you're having trouble connecting your wallet, try these steps:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Make sure your wallet is installed and up to date</p>
                      <p className="text-sm text-muted-foreground">
                        Check that you have the latest version of your wallet app or browser extension.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Refresh the page and try connecting again</p>
                      <p className="text-sm text-muted-foreground">
                        Sometimes a simple page refresh can resolve connection issues.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Check if your browser is blocking pop-ups</p>
                      <p className="text-sm text-muted-foreground">
                        Wallet connection dialogs often appear as pop-ups, which might be blocked by your browser.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Try using a different browser</p>
                      <p className="text-sm text-muted-foreground">
                        If you're still having issues, try connecting with a different browser.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Access Denied to Team</CardTitle>
                <CardDescription>Troubleshoot team access problems</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you're unable to access a team with your whitelisted address:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Verify that you're using the correct wallet address</p>
                      <p className="text-sm text-muted-foreground">
                        Make sure you're connecting with the wallet that contains the whitelisted address.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Check with the team admin to ensure your address is whitelisted</p>
                      <p className="text-sm text-muted-foreground">
                        Contact the team admin to verify that your address has been added to the whitelist.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Try disconnecting and reconnecting your wallet</p>
                      <p className="text-sm text-muted-foreground">
                        Disconnect your wallet, refresh the page, and try connecting again.
                      </p>
                    </div>
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

