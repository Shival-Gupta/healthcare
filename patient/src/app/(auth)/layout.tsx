// src/app/(auth)/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Patient Portal",
  description: "Login or Sign Up to access your patient portal.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      {children}
    </div>
  );
}
