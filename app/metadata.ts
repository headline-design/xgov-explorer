import type { Metadata } from "next"
import { faqItems } from "@/lib/faq-data"

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
    images: [{ url: "/images/og-image.png" }],
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
    structured_data: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${item.answer} (Source: ${item.source})`,
        },
        citation: {
          "@type": "CreativeWork",
          url: item.source,
        },
      })),
    }),
  },
}

