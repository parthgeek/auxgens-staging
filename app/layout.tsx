import type { Metadata } from "next";
import { Cormorant_Garamond, Geist_Mono, Inter, Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";
import "./landing.css";
import "./pages.css";
import "./assistant.css";
import "./hero-kit.css";
import Assistant from "./components/Assistant";
import ScrollToTop from "./components/ScrollToTop";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Auxgens — Securing Your Digital Future",
  description:
    "Auxgens is a global cybersecurity partner helping organisations protect data, systems, and trust across Asia, EMEA, and United States of America.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${inter.variable} ${instrument.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <ScrollToTop />
        <Assistant />
      </body>
    </html>
  );
}
