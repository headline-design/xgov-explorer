import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Shield, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Legal Documents | xGov Explorer",
  description: "Legal documents including Terms of Service and Privacy Policy for xGov Explorer",
}

export default function LegalPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-3">Legal Documents</h1>
          <p className="text-muted-foreground">
            These legal documents govern your use of xGov Explorer. Please read them carefully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Terms of Service
              </CardTitle>
              <CardDescription>The terms and conditions that govern your use of xGov Explorer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our Terms of Service outline the rules, guidelines, and obligations when using our platform, including
                user accounts, content policies, intellectual property rights, and more.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/legal/terms">
                  Read Terms of Service
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Privacy Policy
              </CardTitle>
              <CardDescription>How we collect, use, and protect your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our Privacy Policy explains what data we collect, how we use it, your rights regarding your information,
                and our commitment to protecting your privacy while using xGov Explorer.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/legal/privacy">
                  Read Privacy Policy
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            If you have any questions about our legal documents, please contact us at{" "}
            <a href="mailto:legal@xgov-explorer.com" className="underline hover:text-foreground">
              legal@xgov-explorer.com
            </a>
          </p>
          <p className="mt-4">© {new Date().getFullYear()} xGov Explorer. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

