import { defineType } from 'sanity'

export const beautyFeatureGridSectionType = defineType({
    name: 'beautyFeatureGridSectionType',
    title: 'Beauty Feature Grid Section',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'richTextHighlight',
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
            name: 'cards',
            title: 'Feature Cards',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'featureCard',
                    title: 'Feature Card',
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
                            rows: 2,
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'image',
                            title: 'Image / Video Poster',
                            type: 'image',
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alt Text',
                                    type: 'string',
                                },
                            ],
                            validation: (rule) => rule.required(),
                            description: 'Shown as card image, or as poster frame before the video plays',
                        },
                        {
                            name: 'video',
                            title: 'Video (optional)',
                            type: 'file',
                            options: { accept: 'video/*' },
                            description: 'If provided, image becomes the poster. Video lazy-loads when section enters viewport.',
                        },
                        {
                            name: 'cardButton',
                            title: 'Card Button (optional)',
                            type: 'object',
                            fields: [
                                { name: 'text', title: 'Button Text', type: 'string' },
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
                                    validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https'] }),
                                },
                            ],
                        },
                        {
                            name: 'extraImage',
                            title: 'Extra Image (optional)',
                            type: 'image',
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alt Text',
                                    type: 'string',
                                },
                            ],
                            description: 'Overlay image displayed in front of the video/image. Style via .bfg-extra-img-{index} class.',
                        },
                    ],
                    preview: {
                        select: {
                            title: 'cardTitle',
                            media: 'image',
                        },
                        prepare(selection: { title?: string; media?: any }) {
                            return {
                                title: selection.title || 'Feature Card',
                                media: selection.media,
                            }
                        },
                    },
                },
            ],
            validation: (rule) => rule.min(1).required(),
        },
        {
            name: 'primaryButton',
            title: 'Primary Button',
            type: 'object',
            fields: [
                { name: 'text', title: 'Button Text', type: 'string' },
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
                    validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
                },
                { name: 'showIcon', title: 'Show Icon', type: 'boolean', initialValue: true },
            ],
        },
        {
            name: 'secondaryButton',
            title: 'Secondary Button',
            type: 'object',
            fields: [
                { name: 'text', title: 'Button Text', type: 'string' },
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
                    validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
                },
                { name: 'showIcon', title: 'Show Icon', type: 'boolean', initialValue: true },
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'cards.0.image',
        },
        prepare(selection: { title?: any[]; media?: any }) {
            const plainTitle = Array.isArray(selection.title)
                ? selection.title.map((t) => t?.text).join(' ')
                : 'Beauty Feature Grid Section'
            return {
                title: plainTitle || 'Beauty Feature Grid Section',
                subtitle: 'Beauty Feature Grid Section',
                media: selection.media,
            }
        },
    },
})
