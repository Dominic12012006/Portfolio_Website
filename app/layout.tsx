import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dominic Thomas",
  description: "Personal Portfolio — Dominic Thomas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground min-h-screen flex flex-col antialiased selection:bg-accent/20 selection:text-accent`}
      >
        <Navbar />
        <div className="flex-1 flex flex-col pt-[var(--navbar-height)]">
          {children}
        </div>
      </body>
    </html>
  );
}

