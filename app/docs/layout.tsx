import type React from "react"
import Link from "next/link"
import { ChevronRight, Search, Home, BookOpen, Users, Wallet, FileText, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar"

export const metadata = {
  title: "Documentation | xGov Explorer",
  description: "Learn how to use xGov Explorer to track and manage Algorand xGov projects",
}

interface DocNavLinkProps {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
  isActive?: boolean
}

function DocNavLink({ href, children, icon, isActive }: DocNavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
      )}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </Link>
  )
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between py-4">
            <div className="flex items-center gap-2 md:gap-4">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Home className="h-5 w-5" />
                <span className="hidden md:inline-block">Home</span>
              </Link>
              <div className="hidden md:flex">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <Link href="/docs" className="flex items-center gap-2 font-semibold text-primary">
                <BookOpen className="h-5 w-5" />
                <span>Documentation</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden md:flex w-full max-w-[200px] lg:max-w-[280px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documentation..."
                  className="pl-8 h-9 md:w-[200px] lg:w-[280px] rounded-lg border border-input bg-background"
                />
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link
                  href="https://github.com/headline-design/xgov-explorer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-1"
                >
                  <span className="hidden sm:inline-block">GitHub</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] md:gap-6 lg:gap-10">
          <aside className="fixed top-14 z-20 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto py-6 pr-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={true}>
                  <Link href="/docs">
                    <BookOpen className="h-4 w-4" />
                    <span>Getting Started</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/docs/team-management">
                    <Users className="h-4 w-4" />
                    <span>Team Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/docs/wallet-integration">
                    <Wallet className="h-4 w-4" />
                    <span>Wallet Integration</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/docs/progress-updates">
                    <FileText className="h-4 w-4" />
                    <span>Progress Updates</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="mt-12">
              <h4 className="mb-4 text-sm font-semibold">Resources</h4>
              <div className="flex flex-col gap-2">
                <DocNavLink href="https://algorand.foundation/governance" icon={<ExternalLink className="h-4 w-4" />}>
                  Algorand Governance
                </DocNavLink>
                <DocNavLink href="https://algorand.foundation/xgov" icon={<ExternalLink className="h-4 w-4" />}>
                  xGov Program
                </DocNavLink>
                <DocNavLink
                  href="https://github.com/headline-design/xgov-explorer"
                  icon={<ExternalLink className="h-4 w-4" />}
                >
                  GitHub Repository
                </DocNavLink>
              </div>
            </div>
          </aside>

          <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
            <div className="mx-auto w-full min-w-0">
              <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                  <Link href="/" className="hover:text-foreground">
                    Home
                  </Link>
                </div>
                <ChevronRight className="h-4 w-4" />
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                  <Link href="/docs" className="hover:text-foreground">
                    Documentation
                  </Link>
                </div>
                <ChevronRight className="h-4 w-4" />
                <div className="font-medium text-foreground truncate">Getting Started</div>
              </div>
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="prose prose-gray dark:prose-invert max-w-none">{children}</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

