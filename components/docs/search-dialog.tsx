"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, FileText, Users, Wallet, BookOpen, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

// This is a placeholder for the actual data that will come from contentlayer
const DOCS_PAGES = [
  {
    title: "Getting Started",
    href: "/docs",
    description: "Learn how to use xGov Explorer to discover, track, and manage Algorand xGov-funded projects.",
    icon: BookOpen,
  },
  {
    title: "Team Management",
    href: "/docs/team-management",
    description: "Learn how to claim proposals, manage team members, and use the whitelist feature.",
    icon: Users,
  },
  {
    title: "Wallet Integration",
    href: "/docs/wallet-integration",
    description: "Connect your Algorand wallet to xGov Explorer and use it for authentication and team management.",
    icon: Wallet,
  },
  {
    title: "Progress Updates",
    href: "/docs/progress-updates",
    description: "Post progress updates for your xGov-funded project and keep the community informed.",
    icon: FileText,
  },
]

export function SearchDialog({ open, setOpen }) {
  const router = useRouter()
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [setOpen])

  const handleSelect = React.useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router, setOpen],
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
        <DialogHeader className="px-4 pt-4 pb-0">
          <DialogTitle className="text-lg">Search documentation</DialogTitle>
        </DialogHeader>
        <Command className="overflow-hidden rounded-t-none border-t">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Search documentation..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              value={search}
              onValueChange={setSearch}
            />
            {search && (
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSearch("")}>
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Documentation">
              {DOCS_PAGES.filter(
                (page) =>
                  page.title.toLowerCase().includes(search.toLowerCase()) ||
                  page.description.toLowerCase().includes(search.toLowerCase()),
              ).map((page) => (
                <CommandItem key={page.href} value={page.title} onSelect={() => handleSelect(page.href)}>
                  <div className="flex items-center">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-md border">
                      <page.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{page.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{page.description}</p>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <DialogFooter className="flex items-center justify-between border-t p-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-muted px-2 py-1">Ctrl K</span>
              <span>to open search</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-muted px-2 py-1">↑↓</span>
              <span>to navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-muted px-2 py-1">↵</span>
              <span>to select</span>
            </div>
          </DialogFooter>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

