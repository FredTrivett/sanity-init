import type { Metadata } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
    title: "Website",
    description: "Built with Sanity and Next.js",
};

export default async function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
            <SanityLive />
            {(await draftMode()).isEnabled && <VisualEditing />}
        </>
    );
}
