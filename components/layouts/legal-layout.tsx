import type React from "react"
import Link from "next/link"
import { ChevronRight, Home, FileText, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface LegalLayoutProps {
  children: React.ReactNode
  title: string
  lastUpdated?: string
}

export function LegalLayout({ children, title, lastUpdated }: LegalLayoutProps) {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground flex items-center gap-1">
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/legal" className="hover:text-foreground">
          Legal
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Legal Documents</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/legal/terms">
                  <FileText className="h-4 w-4 mr-2" />
                  Terms of Service
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/legal/privacy">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Link>
              </Button>
            </div>
          </div>

          <Separator />

          <div className="text-sm text-muted-foreground">
            <p>These legal documents govern your use of xGov Explorer. Please read them carefully.</p>
            <p className="mt-2">If you have any questions, please contact us at aaron@headline.dev</p>
          </div>
        </div>

        <div className="prose prose-sm md:prose max-w-none dark:prose-invert">
          {children}
          <div className="mt-10 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} xGov Explorer. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

