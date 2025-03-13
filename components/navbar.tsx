"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { AlgorandIcon } from "./icons/algorand-icon"

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <AlgorandIcon className="h-8 w-8 text-primary" />
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl">xGov Explorer</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-foreground/80"
              }`}
          >
            Home
          </Link>
          <Link
            href="/teams"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/teams") ? "text-primary" : "text-foreground/80"
              }`}
          >
            Teams
          </Link>
          <Link
            href="https://algorand.foundation"
            target="_blank"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Algorand Foundation
            <ArrowUpRight className="inline-block ml-1 h-4 w-4" />
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button asChild className="hidden md:flex">
            <Link href="https://algorand.foundation/xgov" target="_blank">
              Apply for xGov
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

