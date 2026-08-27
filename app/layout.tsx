import type {Metadata} from "next";
import {appConfigs} from "@/resources/resources";
import {Inter} from "next/font/google";
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";
import {BootstrapClient} from "@/components/bootstrap-client";
import "./globals.css";
import React from "react";
import Link from "next/link";
import {breadcrumbTranslations} from "@/resources/dictionary";
import {renderText} from "@/libs/render-text";
import {Alert} from "react-bootstrap";
import AlertInfo from "@/components/alert-info";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="pt-BR" className={`${inter.variable}`}>
    <body className="d-flex flex-column min-vh-100">
    <Header/>
    <main className="container py-4 flex-grow-1">
      <AlertInfo/>
      {children}
    </main>
    <Footer/>
    <BootstrapClient/>
    </body>
    </html>
  );
}
