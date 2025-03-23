"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function useCurrentTheme() {
  const { theme, systemTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // Get the effective theme (user selected or system default)
    const effectiveTheme = theme === "system" ? systemTheme : theme
    setCurrentTheme((effectiveTheme as "light" | "dark") || "light")
  }, [theme, systemTheme])

  return currentTheme
}

