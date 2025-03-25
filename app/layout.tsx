import type React from "react"
import "@/app/globals.css"
import { GeistMono, GeistSans } from "@/styles/fonts";
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AppProviders, UIProviders } from "./providers";
import { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://xgov.app`
  : "http://localhost:3000";

  export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "xGov Explorer | Algorand Governance",
    description:
      "Discover innovative projects awarded through the Algorand Foundation xGov community governance program.",
    openGraph: {
      title: "xGov Explorer | Algorand Governance",
      description:
        "Discover innovative projects awarded through the Algorand Foundation xGov community governance program.",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    keywords: [
      "Algorand Foundation",
      "xGov Explorer",
      "xGov",
      "community governance",
      "blockchain projects",
      "Algorand",
      "daos",
      "funding",
      "Algorand projects",
    ],
    authors: [
      { name: "HEADLINE", url: "https://headline.dev" },
      { name: "Algorand Foundation", url: "https://algorand.foundation" },
    ],
    creator: "HEADLINE",
    twitter: {
      card: "summary_large_image",
      title: "xGov Explorer | Algorand Foundation",
      description:
        "Discover innovative projects awarded through the Algorand Foundation xGov community governance program.",
      images: ["/images/og-image.png"],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/images/favicon-96x96.png",
      apple: "/images/apple-touch-icon.png",
    },
  }

export default async function HomePage({ children }) {
  return (
    <AppProviders>
      <html lang="en" suppressHydrationWarning className={`${GeistMono.variable} ${GeistSans.variable}`}>
        <body className="bg-background-accent">
          <UIProviders>
            <div className="flex min-h-screen flex-col">
              <Navbar location={"home"} />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </UIProviders>
        </body>
      </html>
    </AppProviders>
  )
}

