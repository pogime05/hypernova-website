import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HyperNova Technologies — We build digital things that actually work.",
  description:
    "We design and develop websites, apps, and digital experiences for founders, brands, and businesses ready to grow.",
  keywords: ["web development", "digital studio", "web apps", "mobile apps", "digital cards"],
  metadataBase: new URL("https://hypernova-website.vercel.app"),
  openGraph: {
    title: "HyperNova Technologies — We build digital things that actually work.",
    description:
      "We design and develop websites, apps, and digital experiences for founders, brands, and businesses ready to grow.",
    url: "https://hypernova-website.vercel.app",
    siteName: "HyperNova Technologies",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "HyperNova Technologies",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HyperNova Technologies — We build digital things that actually work.",
    description:
      "We design and develop websites, apps, and digital experiences for founders, brands, and businesses ready to grow.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="antialiased bg-bg text-primary font-sans">
        {children}
      </body>
    </html>
  );
}
