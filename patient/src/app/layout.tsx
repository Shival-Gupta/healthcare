import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import SiteFooter from "@/components/layout/footer";
import { ClerkProvider } from '@clerk/nextjs';
import SiteHeaderCommon from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patient Portal",
  description: "Manage your health records and appointments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SiteHeaderCommon />
            <main>
              {children}
            </main>
            <SiteFooter />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}