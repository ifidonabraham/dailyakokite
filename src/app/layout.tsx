import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}