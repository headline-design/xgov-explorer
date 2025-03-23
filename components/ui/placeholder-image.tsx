"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface PlaceholderImageProps {
  width?: number
  height?: number
  className?: string
}

export function PlaceholderImage({ width = 1200, height = 630, className }: PlaceholderImageProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default colors
  const bgColor = mounted ? (resolvedTheme === "dark" ? "#333333" : "#E5E5E5") : "#E5E5E5"

  const logoColor = mounted ? (resolvedTheme === "dark" ? "#666666" : "#CCCCCC") : "#CCCCCC"

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width={width} height={height} fill={bgColor} />
      <path
        d="M419.592,161.47821c.924,1.63833,2.156,2.949,4.004,3.932l4.004,1.966,4.004-1.966c3.08-1.63833,5.236-5.24266,5.236-8.847v-14.745h-9.24v-6.55333h15.4v21.29833c0,6.22567-3.388,12.12367-8.932,14.745l-6.776,3.27667-6.468-3.27667c-4.004-1.966-6.776-5.57034-8.008-9.83,0,0,6.77602,0,6.77601,0Z"
        fill={logoColor}
        strokeWidth="0"
        transform={`translate(${width / 2 - 25}, ${height / 2 - 25})`}
      />
      <rect x={width / 2 - 45} y={height / 2 - 38} width="22.88" height="6.55333" fill={logoColor} strokeWidth="0" />
      <rect x={width / 2 - 45} y={height / 2 - 51} width="22.88" height="6.55333" fill={logoColor} strokeWidth="0" />
    </svg>
  )
}

