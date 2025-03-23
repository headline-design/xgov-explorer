import type React from "react"
import Link from "next/link"
import { Home, BookOpen, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SearchButton } from "@/components/docs/search-button"
import { DocsBreadcrumb } from "@/components/docs/breadcrumb"
import { SidebarNav } from "@/components/docs/sidebar-nav"
import { SidebarProvider } from "@/components/ui/sidebar"
import { allDocs } from "contentlayer/generated"
import ButtonLink from "@/components/ui/button-link"

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
  // Get all docs for the sidebar navigation
  const docsNav = allDocs
    .filter((doc) => doc.published)
    .sort((a, b) => {
      // Sort by title, but make sure "Getting Started" is first
      if (a.title === "Getting Started") return -1
      if (b.title === "Getting Started") return 1
      return a.title.localeCompare(b.title)
    })
    .map((doc) => ({
      title: doc.title,
      href: doc.slug === "" ? "/docs" : doc.slug,
      icon: doc.icon || "FileText",
    }))

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col w-full bg-background-accent">
        <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between py-4 px-4 lg:px-6">
            <div className="flex items-center gap-2 md:gap-4 text-base">
              <Link href="/" className="flex items-center gap-2 font-medium">
                <Home className="h-5 w-5 text-muted-foreground" />
                <span className="hidden md:inline-block text-muted-foreground">Home</span>
              </Link>
              <div className="hidden md:flex items-center">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="ml-2 font-medium text-primary">Documentation</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SearchButton />
              <ButtonLink roundedLg slim variant="outline"
                className="relative h-9 justify-start rounded-lg text-sm text-muted-foreground " href="https://github.com/headline-design/xgov-explorer" target="_blank" rel="noopener noreferrer" suffix={<ExternalLink className="h-4 w-4" />}  >
                <span className="hidden sm:inline-block">GitHub</span>
              </ButtonLink>
            </div>
          </div>
        </header>

        <div className="px-5 lg:px-6 container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] md:gap-6 lg:gap-10">
          <aside className="fixed top-14 z-20 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto py-6 pr-2">
            <SidebarNav items={docsNav} />

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

          <main className="relative py-6 lg:gap-10 lg:py-8 ">
            <div className="mx-auto w-full min-w-0">
              <DocsBreadcrumb />
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

