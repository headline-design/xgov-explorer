import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { allLegals } from "contentlayer/generated"
import { LegalLayout } from "@/components/layouts/legal-layout"
import { Mdx } from "@/components/docs/mdx-components"

export const metadata: Metadata = {
  title: "Privacy Policy | xGov Explorer",
  description: "Privacy policy for xGov Explorer",
}

export default function PrivacyPage() {
  const privacy = allLegals.find((doc) => doc.slugAsParams === "privacy")

  if (!privacy) {
    return notFound()
  }

  // Extract the last updated date from the MDX content
  const lastUpdatedMatch = privacy.body.raw.match(/\*\*Last Updated: (.*?)\*\*/)
  const lastUpdated = privacy.lastUpdated || (lastUpdatedMatch ? lastUpdatedMatch[1] : undefined)

  return (
    <LegalLayout title="Privacy Policy" lastUpdated={lastUpdated}>
      <Mdx code={privacy.body.code} />
    </LegalLayout>
  )
}

