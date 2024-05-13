import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.scss";
import RootLayout from "./rootlayout";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Solar ROI",
  description: "Solar ROI",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <body className={inter.className}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
