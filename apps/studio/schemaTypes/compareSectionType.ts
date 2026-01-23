import { defineType } from 'sanity'

export const compareSectionType = defineType({
    name: 'compareSectionType',
    title: 'Compare Section',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'richTextHighlight',
            validation: (rule) => rule.required(),
            description: 'Main headline for the section'
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
            name: 'pricingTable',
            title: 'Pricing Table',
            type: 'object',

            fields: [
                {
                    name: 'heading',
                    title: 'Section Heading',
                    type: 'string',
                },

                {
                    name: 'plans',
                    title: 'Plans',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            name: 'plan',
                            fields: [
                                {
                                    name: 'title',
                                    title: 'Plan Title',
                                    type: 'string',
                                    validation: Rule => Rule.required(),
                                },
                                {
                                    name: 'price',
                                    title: 'Price / Label',
                                    type: 'string',
                                },
                                {
                                    name: 'badge',
                                    title: 'Badge (optional)',
                                    type: 'string',
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
                                    ],
                                    validation: (rule) => rule.required()
                                },
                                {
                                    name: 'isPrimary',
                                    title: 'Highlight Plan',
                                    type: 'boolean',
                                    initialValue: false,
                                },
                            ],
                        },
                    ],
                    validation: Rule => Rule.min(2),
                },

                {
                    name: 'features',
                    title: 'Features',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            name: 'feature',
                            fields: [
                                {
                                    name: 'label',
                                    title: 'Feature Name',
                                    type: 'string',
                                    validation: Rule => Rule.required(),
                                },
                                {
                                    name: 'values',
                                    title: 'Plan Values',
                                    type: 'array',
                                    of: [
                                        {
                                            type: 'object',
                                            name: 'value',
                                            fields: [
                                                {
                                                    name: 'type',
                                                    title: 'Value Type',
                                                    type: 'string',
                                                    options: {
                                                        list: [
                                                            { title: 'Check', value: 'check' },
                                                            { title: 'Cross', value: 'cross' },
                                                            { title: 'Text', value: 'text' },
                                                        ],
                                                        layout: 'radio',
                                                    },
                                                    validation: Rule => Rule.required(),
                                                },
                                                {
                                                    name: 'text',
                                                    title: 'Text Value',
                                                    type: 'string',
                                                    hidden: ({ parent }) => parent?.type !== 'text',
                                                },
                                            ],
                                            preview: {
                                                select: {
                                                    type: 'type',
                                                    text: 'text',
                                                },
                                                prepare({ type, text }) {
                                                    return {
                                                        title: type === 'check' ? '✓' : type === 'cross' ? '✗' : text || '—',
                                                    }
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
            description: 'description',
        },
        prepare(selection: { title?: any[]; description?: any }) {
            const { title, description } = selection

            const plainTitle = Array.isArray(title)
                ? title.map((t) => t?.text).join(' ')
                : 'Compare Section'

            return {
                title: plainTitle || 'Compare Section',
                subtitle: description || 'Compare Section',
            }
        },
    },
})

