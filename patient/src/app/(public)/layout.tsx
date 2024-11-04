// src/app/(public)/layout.tsx

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="p-6">
        {children}
      </div>
    );
  }
  