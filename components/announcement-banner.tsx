"use client"

import { useState, useEffect } from "react"
import { X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const bannerDismissed = localStorage.getItem("announcement-banner-dismissed")
    if (!bannerDismissed) {
      setIsVisible(true)
    }
  }, [])

  const dismissBanner = () => {
    setIsVisible(false)
    localStorage.setItem("announcement-banner-dismissed", "true")
  }

  if (!isVisible) return null

  return (
    <div className="w-full bg-primary text-primary-foreground top-0 z-50">
      <div className="container py-3 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
              <span className="text-lg">🚀</span>
            </div>
            <div>
              <h3 className="font-bold text-sm md:text-base">New Integrations: useWallet & Sign in with Algorand</h3>
              <p className="text-xs md:text-sm text-primary-foreground/80">
                Connect your Algorand wallet and sign in seamlessly with our new platform integrations.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="h-8 text-xs md:text-sm" asChild>
              <Link href="/docs/wallet-integration">
                Learn More
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={dismissBanner}
              className="h-8 w-8 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30"
              aria-label="Dismiss announcement"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

