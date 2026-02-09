import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://valentinespecial.vercel.app'),
  title: "Valentine Special - Create Personalized Valentine Surprise in 10 Seconds",
  description: "Create a magical, personalized Valentine's Day surprise for your loved one. Upload your photo, enter their name, and share a unique romantic experience. No coding needed! 100% Free & Easy.",
  keywords: [
    "valentine",
    "valentine's day",
    "romantic surprise",
    "personalized gift",
    "love",
    "valentine card",
    "romantic animation",
    "valentine message",
    "love confession",
    "digital valentine",
    "valentine surprise",
    "romantic proposal"
  ],
  authors: [{ name: "Shivam Tiwari" }],
  creator: "Shivam Tiwari",
  publisher: "Shivam Tiwari",
  openGraph: {
    title: "Valentine Special - Make Her Day Unforgettable 💖",
    description: "Create a personalized Valentine surprise in seconds. Upload your photo and create magic! Perfect for expressing your love.",
    type: "website",
    url: "https://valentinespecial.vercel.app",
    siteName: "Valentine Special",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Valentine Special - Create Personalized Valentine Surprise"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentine Special - Make Her Day Unforgettable 💖",
    description: "Create a personalized Valentine surprise in seconds!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Viewport must be exported separately in Next.js 14+
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
