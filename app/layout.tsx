import type React from "react"
import "@/app/globals.css"
import { GeistMono, GeistSans } from "@/styles/fonts";
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AppProviders, UIProviders } from "./providers";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://xgov.app`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "xGov Explorer | Algorand Governance",
  description:
    "Discover the power of Algorand governance",
  openGraph: {
    title: "xGov Explorer | Algorand Governance",
    description:
      "Discover the power of Algorand governance and explore the latest xGov proposals, funding, and voting trends.",
    images: [{ url: "/images/og-image.png" }],
  },
  keywords:
    "Algorand, xGov, cryptocurrency, smart contracts, ASA, Pure Proof-of-Stake, staking, governance, environmental impact, interoperability",
};

export default function RootLayout({ children, params }) {
  return (
    <AppProviders>
      <html lang="en" suppressHydrationWarning className={`${GeistMono.variable} ${GeistSans.variable}`}>
        <body>
          <UIProviders>
            <AnnouncementBanner />
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

