import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ImmoSoft - Gestion Immobilière",
  description: "Application de gestion immobilière et clients",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`flex h-screen overflow-hidden bg-background font-sans antialiased`}
        cz-shortcut-listen="true"
      >
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
          <footer className="border-t border-border bg-card px-6 py-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Berry Matondo</span>
              <span>All rights reserved © 2023</span>
            </div>
          </footer>
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
