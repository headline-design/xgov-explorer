import type { Metadata } from "next"
import { generateFaqStructuredData } from "@/lib/faq-data"

export const metadata: Metadata = {
  title: "xGov Explorer | Algorand xGov Projects",
  description:
    "Discover the best projects funded by Algorand's xGov community governance program. Track progress, connect with teams, and explore the Algorand ecosystem.",
  openGraph: {
    title: "xGov Explorer | Algorand xGov Projects",
    description:
      "Discover the best projects funded by Algorand's xGov community governance program. Track progress, connect with teams, and explore the Algorand ecosystem.",
    type: "website",
    url: "https://xgov.app",
    images: [{ url: "/opengraph-image.png" }],
  },
  alternates: {
    canonical: "https://xgov.app",
  },
  keywords: [
    "Algorand",
    "xGov",
    "blockchain",
    "cryptocurrency",
    "governance",
    "community",
    "projects",
    "funding",
    "grants",
    "ecosystem",
    "explorer",
    "tracking",
  ],
  other: {
    structured_data: JSON.stringify(generateFaqStructuredData()),
  },
}

