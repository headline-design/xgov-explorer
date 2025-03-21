"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchDialog } from "./search-dialog"

export function SearchButton() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="relative h-9 w-full justify-start rounded-lg text-sm text-muted-foreground md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <span className="sr-only">Search documentation</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <SearchDialog open={open} setOpen={setOpen} />
    </>
  )
}

