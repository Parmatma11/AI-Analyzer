import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Claude-inspired Code Review",
  description: "A warm, editorial take on code analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-16">
          {children}
        </main>
      </body>
    </html>
  );
}
