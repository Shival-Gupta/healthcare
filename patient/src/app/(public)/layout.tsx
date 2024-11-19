import PublicHeader from "@/components/layout/public-header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      {children}
    </div>
  );
}