// src/app/(main)/layout.tsx

import { SiteHeader } from "@/components/layout/site-header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="container mx-auto p-6">{children}</div>
    </div>
  );
}
