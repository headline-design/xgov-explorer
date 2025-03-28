import Link from "next/link"
import { BrandLogoAlt } from "./icons/brand-logo-alt"

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <BrandLogoAlt className="h-6 w-6 text-primary" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} xGov Explorer. Powered by Nodely.
          </p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/legal/terms" className="text-xs text-muted-foreground hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="/legal/privacy" className="text-xs text-muted-foreground hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link
            href="https://nodely.io"
            target="_blank"
            className="text-xs text-muted-foreground hover:underline underline-offset-4"
          >
           Nodely
          </Link>
        </nav>
      </div>
    </footer>
  )
}

