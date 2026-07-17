import type { Metadata } from "next";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Rowshanara Edu | Empowering Minds, Shaping Futures",
  description: "Rowshanara Edu is a leading educational platform dedicated to providing world-class learning experiences through innovative technology and expert mentorship.",
  keywords: ["Education", "Online Learning", "Rowshanara Edu", "Tutoring", "Courses", "Future Skills"],
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" }
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/favicon/site.webmanifest"
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayoutModifier from "@/components/ClientLayoutModifier";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body>
        <ClientLayoutModifier />
        <Toaster richColors position="top-right" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
