import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingContact } from "@/components/layout/floating-contact";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GK Travel | Journeys, Curated",
    template: "%s | GK Travel",
  },
  description:
    "GK Travel designs fully-managed, premium pilgrimage and international journeys — from Char Dham to Bali — backed by 30+ years of on-ground expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        <MotionConfig reducedMotion="user">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContact />
        </MotionConfig>
      </body>
    </html>
  );
}
