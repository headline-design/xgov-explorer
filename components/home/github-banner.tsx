"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Star, Github, ExternalLink } from "lucide-react"
import Link from "next/link"

interface GitHubBannerProps {
  repoUrl?: string
  className?: string
}

export function GitHubBanner({
  repoUrl = "https://github.com/headline-design/xgov-explorer",
  className,
}: GitHubBannerProps) {
  const [starCount, setStarCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Extract owner and repo from the GitHub URL
    const urlParts = repoUrl.split("/")
    const owner = urlParts[urlParts.length - 2]
    const repo = urlParts[urlParts.length - 1]

    // Fetch star count from GitHub API
    const fetchStarCount = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)

        if (response.ok) {
          const data = await response.json()
          setStarCount(data.stargazers_count)
        } else {
          console.error("Failed to fetch GitHub stars")
          // Fallback to a default value
          setStarCount(42)
        }
      } catch (error) {
        console.error("Error fetching GitHub stars:", error)
        // Fallback to a default value
        setStarCount(42)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStarCount()
  }, [repoUrl])

  return (
    <section className="w-full py-8 md:py-12 border-b bg-muted/30 ">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Support xGov Explorer</h2>
            <p className="text-muted-foreground max-w-[600px]">
              If you find xGov Explorer useful, please consider giving us a star on GitHub. It helps us grow and improve
              the platform for the Algorand community.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="outline" size="lg" className="group">
              <Link href={repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                View Source
                <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </Link>
            </Button>

            <Button asChild size="lg" className="group">
              <Link
                href={`${repoUrl}/stargazers`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Star className="h-5 w-5" />
                Star on GitHub
                {!isLoading && starCount !== null && (
                  <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20">
                    {starCount.toLocaleString()}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

