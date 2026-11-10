import type { Metadata } from "next";
import React from "react";
import { dictionary } from "@/resources/dictionary";

export const metadata: Metadata = {
  title: dictionary.calendario.title,
};

export default function CalendarLayout({
                                         children,
                                       }: {
  children: React.ReactNode
}) {
  return children;
}
