import type { Metadata } from "next";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL("https://rowshanaraedu.com"),
  title: {
    default: "Rowshanara Edu | Global Study Solution",
    template: "%s | Rowshanara Edu",
  },
  description: "Rowshanara Edu (Global Study Solution) is a leading education consultancy in Dhaka, Bangladesh, assisting students with university admissions, student visa processing, and scholarships in the UK, USA, Canada, Australia, and China.",
  keywords: [
    "Rowshanara Edu", 
    "RowshanaraEdu", 
    "Global Study Solution", 
    "Education Consultancy Dhaka", 
    "Study Abroad Agency Bangladesh", 
    "Student Visa Processing", 
    "University Admissions UK USA Canada Australia", 
    "Scholarship Assistance Bangladesh"
  ],
  authors: [{ name: "Rowshanara Edu", url: "https://rowshanaraedu.com" }],
  creator: "Rowshanara Edu",
  publisher: "Rowshanara Edu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "./",
    languages: {
      'en-US': '/en-US',
      'bn-BD': '/bn-BD',
    },
  },
  openGraph: {
    title: "Rowshanara Edu | Global Study Solution",
    description: "Empowering minds and shaping futures. Get professional counseling, university admissions help, and student visa processing for studying abroad.",
    url: "https://rowshanaraedu.com",
    siteName: "Rowshanara Edu",
    images: [
      {
        url: "/images/og-image.jpg", // Pre-configured og image path
        width: 1200,
        height: 630,
        alt: "Rowshanara Edu - Global Study Solution Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rowshanara Edu | Global Study Solution",
    description: "Empowering minds and shaping futures. Your trusted partner for international education counseling, admissions, and visa support.",
    images: ["/images/og-image.jpg"],
    creator: "@rowshanaraedu",
  },
  verification: {
    google: "google-site-verification-code", // Placeholder for GSC verification
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
    other: {
      me: ["info@rowshanaraedu.com"],
    },
  },
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

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://rowshanaraedu.com/#organization",
  "name": "Rowshanara Edu",
  "url": "https://rowshanaraedu.com",
  "logo": "https://rowshanaraedu.com/favicon/apple-touch-icon.png",
  "image": "https://rowshanaraedu.com/images/og-image.jpg",
  "description": "Rowshanara Edu is a leading education consultancy in Dhaka, Bangladesh, assisting students with university admissions, student visa processing, and scholarships in the UK, USA, Canada, Australia, and China.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "MNSN Tower, 60 Dilkusha",
    "addressLocality": "Dhaka",
    "postalCode": "1000",
    "addressCountry": "BD"
  },
  "telephone": "+880 1511-710730",
  "email": "info@rowshanaraedu.com",
  "sameAs": [
    "https://www.facebook.com/rowshanaraedu",
    "https://www.youtube.com/@rowshanaraedu"
  ]
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://rowshanaraedu.com/#website",
  "url": "https://rowshanaraedu.com",
  "name": "Rowshanara Edu",
  "publisher": {
    "@id": "https://rowshanaraedu.com/#organization"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          id="organization-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          id="website-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
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
