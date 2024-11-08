import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const fontFace = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Provider Portal",
  description: "Portal for patients to manage appointments, view medical records, and access telemedicine services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontFace.className}>{children}</body>
    </html>
  );
}
