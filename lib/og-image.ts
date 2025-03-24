/**
 * Generate an OG image URL for a blog post
 */
export function getOgImageUrl(title: string, description?: string, theme?: string): string {
    try {
      const encodedTitle = encodeURIComponent(title || "")
      const themeParam = theme ? `&theme=${theme}` : ""

      return `/api/og?title=${encodedTitle}${themeParam}`
    } catch (error) {
      console.error("Error generating OG image URL:", error)
      return "/placeholder.svg"
    }
  }

