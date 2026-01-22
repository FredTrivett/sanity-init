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
                defineArrayMember({
                    type: 'heroSection',
                    title: 'Hero Section',
                }),
            ],
            options: {
                sortable: true,
            },
        }),
        // SEO Fields - using the plugin
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seoMetaFields',
            group: 'seo',
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
