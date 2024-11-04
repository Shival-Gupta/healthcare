import Link from "next/link";

export default function SiteFooter() {
    return (
        <footer className="mt-12 text-gray-500 text-center">
            <Link href="/terms">Terms of Service</Link> | <Link href="/privacy">Privacy Policy</Link> |{" "}
            <Link href="/support">Support</Link>
        </footer>
    );
}