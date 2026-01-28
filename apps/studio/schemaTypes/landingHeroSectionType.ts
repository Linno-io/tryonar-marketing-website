import { defineType } from 'sanity'

export const landingHeroSectionType = defineType({
    name: 'landingHeroSectionType',
    title: 'Landing Hero Section',
    type: 'object',
    fields: [
        {
            name: 'tag',
            title: 'Tag',
            type: 'text',
            rows: 2,
            validation: (rule) => rule.required(),
            description: 'A short tag line to display above the title'
        },
        {
            name: 'title',
            title: 'Title',
            type: 'richTextHighlight',
            validation: (rule) => rule.required(),
            description: 'Main heading for the success stories section',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'richTextHighlight',
            validation: (rule) => rule.required(),
            description: 'Supporting text below the title'
        },
        {
            name: 'sectionImage',
            title: 'Section Image',
            type: 'image',
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    validation: (rule) => rule.required()
                },
                {
                    name: 'imageTitle',
                    title: 'Image Title',
                    type: 'string',
                },
                {
                    name: 'imageDescription',
                    title: 'Image Description',
                    type: 'string',
                }
            ],
            validation: (rule) => rule.required(),
            description: 'Main image for the hero section'
        },
        {
            name: 'primaryButton',
            title: 'Primary Button',
            type: 'object',
            fields: [
                {
                    name: 'text',
                    title: 'Button Text',
                    type: 'string',
                    validation: (rule) => rule.required()
                },
                {

                    name: 'internalLink',
                    title: 'Internal Link',
                    type: 'reference',
                    to: [{ type: 'page' }],
                },
                {
                    name: 'externalLink',
                    title: 'External Link',
                    type: 'url',
                    validation: Rule =>
                        Rule.uri({
                            scheme: ['http', 'https'],
                        }),
                },
                {
                    name: 'showIcon',
                    title: 'Show Icon',
                    type: 'boolean',
                    initialValue: true,
                },
                {
                    name: 'trustText',
                    title: 'Trust Text',
                    type: 'string',
                },
            ],
            validation: (rule) => rule.required()
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'sectionImage',
        },
        prepare(selection: { title?: any[]; media?: any }) {
            const { title, media } = selection

            const plainTitle = Array.isArray(title)
                ? title.map((t) => t?.text).join(' ')
                : 'Hero Section'

            return {
                title: plainTitle || 'Hero Section',
                subtitle: 'Hero Section',
                media,
            }
        },
    },

})
