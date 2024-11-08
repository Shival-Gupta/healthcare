import Link from "next/link"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { UserNav } from "@/components/navigation/user-nav"
import { SearchMenu } from "@/components/navigation/search-menu"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4">
          <Link href="/" className="flex items-center space-x-2">
            <Label className="cursor-pointer text-lg font-bold">Patient Portal</Label>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <SearchMenu />
          <nav className="flex items-center space-x-2">
            <Link href="/appointments" className={cn(buttonVariants({ variant: "ghost" }), "hidden md:flex")}>
              Appointments
            </Link>
            <Link href="/medical-records" className={cn(buttonVariants({ variant: "ghost" }), "hidden md:flex")}>
              Records
            </Link>
            <ThemeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}