import { defineType } from 'sanity'

export const instantTryOnSectionType = defineType({
    name: 'instantTryOnSectionType',
    title: 'Instant Try-On Section',
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
            name: 'stats',
            title: 'Stats',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'stat',
                    title: 'Stat',
                    fields: [
                        {
                            name: 'value',
                            title: 'Value',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        },
                    ],
                    preview: {
                        select: { title: 'value', subtitle: 'label' },
                    },
                },
            ],
            validation: (rule) => rule.min(1).required(),
        },
        {
            name: 'contentTitle',
            title: 'Content Title',
            type: 'richTextHighlight',
            description: 'Title for the bottom content area (supports highlight)',
            validation: (rule) => rule.required(),
        },
        {
            name: 'contentDescription',
            title: 'Content Description',
            type: 'text',
            rows: 3,
            validation: (rule) => rule.required(),
        },
        {
            name: 'sectionImage',
            title: 'Section Image',
            type: 'image',
            fields: [
                { name: 'alt', title: 'Alt Text', type: 'string' },
            ],
            validation: (rule) => rule.required(),
        },
        {
            name: 'sectionVideo',
            title: 'Section Video (optional)',
            type: 'file',
            options: { accept: 'video/*' },
            description: 'If provided, image becomes the poster. Video lazy-loads when visible.',
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
        select: { title: 'title', media: 'sectionImage' },
        prepare(selection: { title?: any[]; media?: any }) {
            const plainTitle = Array.isArray(selection.title)
                ? selection.title.map((t) => t?.text).join(' ')
                : 'Instant Try-On Section'
            return {
                title: plainTitle || 'Instant Try-On Section',
                subtitle: 'Instant Try-On Section',
                media: selection.media,
            }
        },
    },
})
