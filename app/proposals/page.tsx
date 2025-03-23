import type { Metadata } from "next"
import { ProposalsPageContent } from "@/components/proposals/proposals-page-content"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "All Proposals | xGov Explorer",
  description: "Browse and filter all proposals funded by the Algorand xGov community governance program.",
  openGraph: {
    title: "All Proposals | xGov Explorer",
    description: "Browse and filter all proposals funded by the Algorand xGov community governance program.",
    type: "website",
    url: "/proposals",
  },
}

export default function ProposalsPage() {
  return (
    <>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
        <ProposalsPageContent />
      </Suspense>
    </>
  )
}

