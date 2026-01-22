import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface HeroSectionProps {
    title: string;
    text: string;
    image: {
        asset: { _ref: string };
        alt?: string;
    };
    imagePosition?: "left" | "right";
    button?: {
        label?: string;
        link?: string;
    };
    isFirst?: boolean;
}

export function HeroSection({
    title,
    text,
    image,
    imagePosition = "right",
    button,
    isFirst = false,
}: HeroSectionProps) {
    const isImageLeft = imagePosition === "left";

    // Use H1 for first section, H2 for subsequent sections
    const HeadingTag = isFirst ? "h1" : "h2";

    return (
        <section className="">
            <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
                <div
                    className={`flex flex-col items-center gap-12 lg:flex-row lg:gap-16 ${isImageLeft ? "lg:flex-row-reverse" : ""
                        }`}
                >
                    {/* Content */}
                    <div className="flex flex-1 flex-col items-start">
                        <HeadingTag className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl lg:text-6xl">
                            {title}
                        </HeadingTag>
                        <p className="mt-6 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                            {text}
                        </p>
                        {button?.label && button?.link && (
                            <Link
                                href={button.link}
                                className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-neutral-900 px-6 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                            >
                                {button.label}
                            </Link>
                        )}
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
                        {image?.asset && (
                            <Image
                                src={urlFor(image).width(800).height(600).url()}
                                alt={image.alt || title}
                                fill
                                className="object-cover"
                                priority
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
