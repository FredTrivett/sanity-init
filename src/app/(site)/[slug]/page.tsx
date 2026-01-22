import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY, PAGES_QUERY } from "@/sanity/lib/queries";
import { SectionsRenderer } from "@/components/sections/SectionsRenderer";

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = await client.fetch(PAGE_QUERY, { slug });

    if (!page) {
        return {};
    }

    const seo = page.seo;
    const title = seo?.metaTitle || page.title;
    const description = seo?.metaDescription || "";

    return {
        title,
        description,
        keywords: seo?.seoKeywords?.join(", "),
        robots: seo?.nofollowAttributes ? "noindex, nofollow" : undefined,
        openGraph: seo?.openGraph ? {
            title: seo.openGraph.title || title,
            description: seo.openGraph.description || description,
            siteName: seo.openGraph.siteName,
            url: seo.openGraph.url,
            images: seo.openGraph.image?.asset?.url ? [{ url: seo.openGraph.image.asset.url }] : undefined,
        } : undefined,
        twitter: seo?.twitter ? {
            card: seo.twitter.cardType as "summary" | "summary_large_image" | "app" | "player" || "summary_large_image",
            site: seo.twitter.site,
            creator: seo.twitter.creator,
        } : undefined,
    };
}

// Generate static paths for all pages
export async function generateStaticParams() {
    const pages = await client.fetch(PAGES_QUERY);

    return (pages || [])
        .filter((page: { slug: string }) => page.slug && page.slug !== "home")
        .map((page: { slug: string }) => ({
            slug: page.slug,
        }));
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;

    // Redirect "home" slug to the root
    if (slug === "home") {
        notFound();
    }

    const { data: page } = await sanityFetch({
        query: PAGE_QUERY,
        params: { slug },
    });

    if (!page) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950">
            <SectionsRenderer sections={page.sections || []} />
        </div>
    );
}
