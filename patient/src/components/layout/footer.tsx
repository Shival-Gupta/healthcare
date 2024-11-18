import Link from "next/link";

export default function SiteFooter() {
    return (
        <footer className="bg-background border-t py-6 px-4 md:px-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-muted-foreground">© 2024 Patient Portal. All rights reserved.</p>
                <nav className="flex gap-4 mt-4 md:mt-0">
                    <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
                    <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
                    <Link href="/support" className="text-sm text-muted-foreground hover:text-primary">Support</Link>
                </nav>
            </div>
        </footer>
    );
}