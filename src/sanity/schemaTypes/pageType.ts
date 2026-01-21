import { DocumentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const pageType = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    icon: DocumentIcon,
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'content',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
            description: 'The URL path for this page (e.g., "about" for /about). Use "home" for the homepage.',
        }),
        defineField({
            name: 'sections',
            title: 'Page Sections',
            type: 'array',
            group: 'content',
            of: [
                // Add section types here - they will be reorderable via drag-and-drop
                defineArrayMember({
                    type: 'heroSection',
                    title: 'Hero Section',
                }),
                // Future sections can be added here:
                // defineArrayMember({ type: 'featuresSection' }),
                // defineArrayMember({ type: 'ctaSection' }),
                // defineArrayMember({ type: 'testimonialsSection' }),
            ],
            options: {
                // Enables the drag handle for reordering
                sortable: true,
            },
        }),
        // SEO Fields
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            group: 'seo',
            description: 'Override the page title for search engines',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 3,
            group: 'seo',
            description: 'Description shown in search results (recommended: 150-160 characters)',
            validation: (rule) => rule.max(160).warning('Keep under 160 characters for best SEO results'),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            slug: 'slug.current',
            sectionsCount: 'sections.length',
        },
        prepare({ title, slug, sectionsCount }) {
            return {
                title: title || 'Untitled Page',
                subtitle: `/${slug || ''} · ${sectionsCount || 0} sections`,
            }
        },
    },
})
