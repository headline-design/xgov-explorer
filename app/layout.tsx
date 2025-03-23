import type React from "react"
import "@/app/globals.css"
import { GeistMono, GeistSans } from "@/styles/fonts";
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AppProviders, UIProviders } from "./providers";
import { AnnouncementBanner } from "@/components/announcement-banner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://siwa.org`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "SIWA | Sign-In with Algorand",
  description:
    "Discover the power of Algorand and Algorand Unified Auth for secure, scalable blockchain solutions. Learn how Algorand's innovative technology is revolutionizing decentralized applications.",
  openGraph: {
    title: "SIWA | Sign-In with Algorand",
    description:
      "Discover the power of Algorand and Algorand Unified Auth for secure, scalable blockchain solutions. Learn how Algorand's innovative technology is revolutionizing decentralized applications.",
    images: [{ url: "/opengraph-image.png" }],
  },
  keywords:
    "Algorand, Algorand Auth, blockchain, cryptocurrency, decentralized applications, smart contracts, SIWA",
};

export default async function HomePage({ children }) {
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

