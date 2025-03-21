"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { allDocs } from "contentlayer/generated"

export function DocsBreadcrumb() {
  const pathname = usePathname()

  // Get the current doc based on the pathname
  const currentDocSlug = pathname === "/docs" ? "" : pathname.replace("/docs/", "")
  const currentDoc = allDocs.find((doc) => doc.slugAsParams === currentDocSlug)

  // Create breadcrumb items
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/docs", label: "Documentation" },
  ]

  // Add the current page to breadcrumbs if it's not the docs index page
  if (currentDoc && pathname !== "/docs") {
    breadcrumbItems.push({
      href: pathname,
      label: currentDoc.title,
    })
  }

  return (
    <div className="mb-4 flex flex-wrap items-center text-sm text-muted-foreground">
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1

        return (
          <React.Fragment key={item.href}>
            {index > 0 && <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />}
            <div
              className={cn(
                "max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap",
                isLast && "font-medium text-foreground",
              )}
            >
              {isLast ? (
                <span>{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              )}
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

