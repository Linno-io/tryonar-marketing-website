import { defineType } from 'sanity'


export const trustCardSectionType = defineType({
    name: 'trustCardSectionType',
    title: 'Trust Card Section',
    type: 'object',
    fields: [
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
            type: 'text',
            rows: 3,
            validation: (rule) => rule.required(),
            description: 'Supporting text below the title'
        },
        {
            name: 'cards',
            title: 'Cards',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'card',
                    title: 'Card',
                    fields: [
                        {
                            name: 'cardTitle',
                            title: 'Title',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 3,
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'tags',
                            title: 'Tags',
                            type: 'array',
                            of: [{ type: 'string' }],
                            description: 'Tags to display above the title (optional)'
                        },
                        {
                            name: 'image',
                            title: 'Icon',
                            type: 'image',
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alt Text',
                                    type: 'string',
                                }
                            ],
                            description: 'Image representing the card'
                        },
                    ],
                    preview: {
                        select: {
                            title: 'cardTitle',
                            media: 'image',
                            tags: 'tags',
                        },
                        prepare(selection: { title?: string; media?: any; tags?: string[] }) {
                            const { title, media, tags } = selection;

                            return {
                                title: title || 'Card',
                                media,
                            };
                        },
                    },
                }
            ],
            validation: (rule) => rule.min(1).required(),
            description: 'List of cards to showcase'
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
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'cards.0.image',
        },
        prepare(selection: { title?: any[]; media?: any }) {
            const { title, media } = selection

            const plainTitle = Array.isArray(title)
                ? title.map((t) => t?.text).join(' ')
                : 'Trust Card Section'

            return {
                title: plainTitle || 'Trust Card Section',
                subtitle: 'Trust Card Section',
                media: media,
            }
        },
    },
})
