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

