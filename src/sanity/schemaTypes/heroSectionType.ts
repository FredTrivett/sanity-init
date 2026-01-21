import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

// Hero Section as an object type (for embedding in page sections array)
export const heroSectionType = defineType({
    name: 'heroSection',
    title: 'Hero Section',
    type: 'object',
    icon: ImageIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'text',
            title: 'Text',
            type: 'text',
            rows: 3,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alternative text',
                    type: 'string',
                }),
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'imagePosition',
            title: 'Image Position',
            type: 'string',
            options: {
                list: [
                    { title: 'Left', value: 'left' },
                    { title: 'Right', value: 'right' },
                ],
                layout: 'radio',
            },
            initialValue: 'right',
        }),
        defineField({
            name: 'button',
            title: 'Button',
            type: 'object',
            description: 'Optional - leave empty to hide the button',
            fields: [
                defineField({
                    name: 'label',
                    title: 'Button Label',
                    type: 'string',
                }),
                defineField({
                    name: 'link',
                    title: 'Button Link',
                    type: 'string',
                    description: 'URL or path (e.g., /contact or https://example.com)',
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
            imagePosition: 'imagePosition',
        },
        prepare({ title, media, imagePosition }) {
            return {
                title: title || 'Hero Section',
                subtitle: `Hero · Image ${imagePosition || 'right'}`,
                media,
            }
        },
    },
})
