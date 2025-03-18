import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProposalNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Proposal Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The proposal you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <Button asChild>
        <Link href="/teams">Browse All Proposals</Link>
      </Button>
    </div>
  )
}

