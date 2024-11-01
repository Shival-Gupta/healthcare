import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header";

const fontFace = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patient Portal",
  description: "Portal for patients to manage appointments, view medical records, and access telemedicine services.",
};

export default function RootLayout({ children }:
  Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={fontFace.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          // disableTransitionOnChange
          >
            <>
              <SiteHeader />
              {children}
            </>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
