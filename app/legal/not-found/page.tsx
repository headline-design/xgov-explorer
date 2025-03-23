import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LegalNotFound() {
  return (
    <div className="container py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Legal Document Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        The legal document you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/legal">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Legal Documents
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  )
}

