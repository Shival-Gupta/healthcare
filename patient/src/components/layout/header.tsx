import { auth } from "@clerk/nextjs/server";
import PublicHeader from "./public-header";
import SiteHeader from "./site-header";

export default async function SiteHeaderCommon() {
    const { userId } = await auth();
    if (!userId) return <PublicHeader />
    return <SiteHeader />
}