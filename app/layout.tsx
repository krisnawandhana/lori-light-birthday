import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

/*
  Display: Cormorant Garamond. High-contrast old-style serif with long, curved
  terminals. Chosen because Lori is a singer first, and this face carries the
  operatic register Design.md asks for ("elegant fantasy") without tipping into
  the calligraphic fantasy cliche. Its thin-to-thick stroke echoes the waveform
  motif (R-06).

  Body: Outfit. Geometric sans with rounded, wide counters that stay legible at
  small sizes on a dark ground, and its roundness reads as bubbles beside the
  serif rather than fighting it. Not Inter or Geist, which would have been the
  default pick.
*/
const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Lori Light",
  description:
    "Lori Light, a mermaid VTuber who sings. Karaoke streams, covers, and the occasional deep-sea ramble.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-turquoise focus:px-4 focus:py-2 focus:font-medium focus:text-abyss-deep"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
