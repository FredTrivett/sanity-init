import { HeroSection } from "./HeroSection";

// Define the section types
interface HeroSectionData {
    _type: "heroSection";
    _key: string;
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
}

// Union type for all section types
type Section = HeroSectionData;
// Add more section types here as you create them:
// type Section = HeroSectionData | FeaturesSectionData | CTASectionData;

interface SectionsRendererProps {
    sections: Section[];
}

export function SectionsRenderer({ sections }: SectionsRendererProps) {
    if (!sections || sections.length === 0) {
        return null;
    }

    return (
        <>
            {sections.map((section) => {
                // Use _key as the unique identifier (Sanity generates this for array items)
                const key = section._key;

                switch (section._type) {
                    case "heroSection":
                        return (
                            <HeroSection
                                key={key}
                                title={section.title}
                                text={section.text}
                                image={section.image}
                                imagePosition={section.imagePosition}
                                button={section.button}
                            />
                        );

                    // Add more section types here:
                    // case "featuresSection":
                    //   return <FeaturesSection key={key} {...section} />;

                    default:
                        // Log unknown section types during development
                        console.warn(`Unknown section type: ${(section as Section)._type}`);
                        return null;
                }
            })}
        </>
    );
}
