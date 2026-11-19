import type { Metadata } from "next";
import { Inter, Merriweather, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dailyakokite.vercel.app"),
  alternates: {
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "DAILY AKOKITE" }] },
  },
  title: {
    default: "DAILY AKOKITE - The Press Club, UNILAG",
    template: "%s | DAILY AKOKITE",
  },
  description:
    "Daily Akokite - The student newspaper of the University of Lagos, informing, challenging, and amplifying the Akoka community.",
  openGraph: {
    title: "DAILY AKOKITE",
    description:
      "The student newspaper of the University of Lagos. News, features, opinion and campus reporting from Akoka.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${serif.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}