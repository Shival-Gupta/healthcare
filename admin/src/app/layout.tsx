import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const fontFace = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "Admin portal for managing healthcare operations and administration.",
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
