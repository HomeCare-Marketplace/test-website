import type { Metadata } from "next";
import { ReactNode } from "react";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NewsletterSection } from "@/components/layout/NewsletterSection";
import { StorefrontProviders } from "@/components/layout/StorefrontProviders";

import "./globals.css";

export const metadata: Metadata = {
  title: "Loom & Linen | Premium Bedding & Home Linen",
  description: "Premium US home-linen storefront reference built with Next.js and mock catalog data.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StorefrontProviders>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <NewsletterSection />
          <Footer />
        </StorefrontProviders>
      </body>
    </html>
  );
}
