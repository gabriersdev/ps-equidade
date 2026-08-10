import type {Metadata} from "next";
import {appConfigs} from "@/resources/resources";
import {Inter} from "next/font/google";
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";
import {BootstrapClient} from "@/components/bootstrap-client";
import "./globals.css";
import React from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: appConfigs.title,
  description: appConfigs.description,
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
    <body className="d-flex flex-column min-vh-100">
    <Header/>
    <main className="container py-4 flex-grow-1">
      {children}
    </main>
    <Footer/>
    <BootstrapClient/>
    </body>
    </html>
  );
}
