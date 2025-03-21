"use client"

import { useEffect, useMemo, useState } from "react"
import { FileText } from "lucide-react"
import type { TableOfContents } from "@/lib/toc"
import { cn } from "@/lib/utils"

interface TocProps {
  toc: TableOfContents
}

export function DocsToc({ toc }: TocProps) {
  const [activeHeading, setActiveHeading] = useState("")

  const items = useMemo(() => {
    return toc.items
      ? toc.items.map((item) => ({
          ...item,
          children: item.children
            ? item.children.map((child) => ({
                ...child,
              }))
            : [],
        }))
      : []
  }, [toc.items])

  useEffect(() => {
    if (items.length === 0) return

    const headings = items.flatMap((item) => [item, ...(item.children || [])])

    const headingElements = headings
      .map((heading) => {
        const el = document.getElementById(heading.url.slice(1))
        if (!el) return null

        const style = window.getComputedStyle(el)
        const scrollMt = Number.parseFloat(style.scrollMarginTop)

        return {
          id: heading.url.slice(1),
          top: el.getBoundingClientRect().top + window.scrollY - scrollMt,
          url: heading.url,
        }
      })
      .filter(Boolean) as Array<{ id: string; top: number; url: string }>

    if (headingElements.length === 0) return

    const onScroll = () => {
      const scrollY = window.scrollY
      const innerHeight = window.innerHeight

      // Find the heading that is currently in view
      const currentHeading = headingElements.find((heading, i) => {
        const nextHeading = headingElements[i + 1]

        // Check if this is the last heading or if we're between this and the next heading
        return nextHeading
          ? scrollY >= heading.top - 200 && scrollY < nextHeading.top - 200
          : scrollY >= heading.top - 200
      })

      // If we found a heading in view, set it as active
      if (currentHeading) {
        setActiveHeading(currentHeading.url)
      }
    }

    // Run once on mount to set initial active heading
    onScroll()

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [items])

  if (!items.length) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="font-medium flex items-center">
        <FileText className="h-4 w-4 mr-2" />
        On This Page
      </p>
      <Tree tree={items} activeHeading={activeHeading} />
    </div>
  )
}

interface TreeProps {
  tree: TableOfContents["items"]
  level?: number
  activeHeading?: string
}

function Tree({ tree, level = 1, activeHeading }: TreeProps) {
  return tree?.length ? (
    <ul className={cn("m-0 list-none", level !== 1 && "pl-4")}>
      {tree.map((item, index) => {
        const isActive = activeHeading === item.url
        const hasActiveChild = item.children?.some((child) => activeHeading === child.url)

        return (
          <li key={index} className={cn("mt-2")}>
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline transition-colors hover:text-foreground",
                level === 1 ? "text-sm font-medium" : "text-xs",
                isActive ? "text-primary font-medium" : "text-muted-foreground",
                hasActiveChild && !isActive && "text-foreground",
              )}
            >
              {item.title}
            </a>
            {item.children?.length ? (
              <Tree tree={item.children} level={level + 1} activeHeading={activeHeading} />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}

