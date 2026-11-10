import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import { appConfigs } from "@/resources/resources";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import AlertInfo from "@/components/alert-info";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s - ${appConfigs.title}`,
    default: appConfigs.title,
  },
  description: appConfigs.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-brand-canvas font-sans text-brand-ink antialiased">
        <MotionProvider>
          <Header />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <AlertInfo />
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
