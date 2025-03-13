import localFont from "next/font/local";

export const GeistSans = localFont({
  src: "./Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const GeistMono = localFont({
  src: "./GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  adjustFontFallback: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Roboto Mono",
    "Menlo",
    "Monaco",
    "Liberation Mono",
    "DejaVu Sans Mono",
    "Courier New",
    "monospace",
  ],
  weight: "100 900",
});
