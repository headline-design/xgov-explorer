import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { allLegals } from "contentlayer/generated"
import { LegalLayout } from "@/components/layouts/legal-layout"
import { Mdx } from "@/components/docs/mdx-components"

export const metadata: Metadata = {
  title: "Terms of Service | xGov Explorer",
  description: "Terms and conditions for using xGov Explorer",
}

export default function TermsPage() {
  const terms = allLegals.find((doc) => doc.slugAsParams === "terms")

  if (!terms) {
    return notFound()
  }

  // Extract the last updated date from the MDX content
  const lastUpdatedMatch = terms.body.raw.match(/\*\*Last Updated: (.*?)\*\*/)
  const lastUpdated = terms.lastUpdated || (lastUpdatedMatch ? lastUpdatedMatch[1] : undefined)

  return (
    <LegalLayout title="Terms of Service" lastUpdated={lastUpdated}>
      <Mdx code={terms.body.code} />
    </LegalLayout>
  )
}

