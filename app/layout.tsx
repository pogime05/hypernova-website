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
    "HyperNova Technologies is a digital studio crafting websites, web apps, mobile apps, and digital cards for founders and brands.",
  keywords: ["web development", "digital studio", "web apps", "mobile apps", "digital cards"],
  openGraph: {
    title: "HyperNova Technologies",
    description: "We build digital things that actually work.",
    type: "website",
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
