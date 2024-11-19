import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              Patient Portal
            </Link>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-4">
              {/* <li><Link href="/#features" className="text-sm text-muted-foreground hover:text-primary">Features</Link></li>
              <li><Link href="/#about" className="text-sm text-muted-foreground hover:text-primary">About</Link></li> */}
              <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">Dashboard</Link></li>
              <li><Button asChild variant="outline"><Link href="/login">Login</Link></Button></li>
              <li><Button asChild><Link href="/signup">Sign Up</Link></Button></li>
              <li><ThemeToggle /></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}