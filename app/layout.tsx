import type React from "react"
import "@/app/globals.css"
import { GeistMono, GeistSans } from "@/styles/fonts";
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "xGov Explorer | Algorand Foundation",
  description:
    "Discover innovative projects awarded through the Algorand Foundation xGov community governance program.",
  openGraph: {
    title: "xGov Explorer | Algorand Foundation",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistMono.variable} ${GeistSans.variable}`}>
      <body >
        <ThemeProvider
          disableTransitionOnChange
          attribute="class"
          value={{ light: "light", dark: "dark" }}
          defaultTheme="dark"
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

