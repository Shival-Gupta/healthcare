import Link from "next/link";

export default function SiteFooter() {
    return (
        <footer className="border-t border-border/40 bg-background">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <Link href="/terms" className="text-sm text-muted-foreground hover:underline">Terms of Service</Link>
                    <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">Privacy Policy</Link>
                    <Link href="/support" className="text-sm text-muted-foreground hover:underline">Support</Link>
                </div>
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Patient Portal. All rights reserved.
                </p>
            </div>
        </footer>
    );
}