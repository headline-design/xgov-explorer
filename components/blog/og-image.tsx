"use client"

import { useCurrentTheme } from "@/lib/hooks/use-theme"
import { getOgImageUrl } from "@/lib/og-image"
import ImageV2 from "@/components/ui/image-v2"
import { useState, useEffect } from "react"

interface OgImageProps {
  title: string
  description?: string
  fallbackImage?: string
  width?: number
  height?: number
  className?: string
  alt?: string
}

export function OgImage({
  title,
  description,
  fallbackImage,
  width = 600,
  height = 340,
  className,
  alt,
}: OgImageProps) {
  const currentTheme = useCurrentTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Use static image during SSR, then switch to OG image after hydration
  const imageUrl = mounted ? getOgImageUrl(title, description, currentTheme) : fallbackImage || "/placeholder.svg"

  return (
    <ImageV2
      src={imageUrl || "/placeholder.svg"}
      alt={alt || title}
      width={width}
      height={height}
      className={className}
    />
  )
}

