import { defineType } from 'sanity'

export const pricingTableSectionType = defineType({
    name: 'pricingTableSectionType',
    title: 'Pricing Table Section',
    type: 'object',
    fields: [
        {
            name: 'tabs',
            title: 'Pricing Tabs',
            type: 'array',
            of: [
                {
                    name: 'pricingTab',
                    title: 'Pricing Tab',
                    type: 'object',
                    fields: [
                        {
                            name: 'tabLabel',
                            title: 'Tab Label',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'cards',
                            title: 'Pricing Cards',
                            type: 'array',
                            of: [
                                {
                                    name: 'pricingCard',
                                    title: 'Pricing Card',
                                    type: 'object',
                                    fields: [
                                        {
                                            name: 'isPopular',
                                            title: 'Is Popular',
                                            type: 'boolean',
                                            initialValue: false,
                                            validation: (rule) => rule.required(),
                                        },
                                        {
                                            name: 'heading',
                                            title: 'Card Heading',
                                            type: 'string',
                                            validation: (rule) => rule.required(),
                                        },
                                        {
                                            name: 'description',
                                            title: 'Card Description',
                                            type: 'text',
                                            rows: 3,
                                            validation: (rule) => rule.required(),
                                        },
                                        {
                                            name: 'price',
                                            title: 'Price',
                                            type: 'number',
                                        },
                                        {
                                            name: 'duration',
                                            title: 'Duration (e.g., per month)',
                                            type: 'string',
                                        },
                                        {
                                            name: 'customPricingText',
                                            title: 'Custom Pricing Text',
                                            type: 'string',
                                        },
                                        {
                                            name: 'primaryButton',
                                            title: 'Button',
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
                                            name: 'featuresSectionTitle',
                                            title: 'Features Section Title',
                                            type: 'string',
                                            initialValue: 'Features included:'
                                        },
                                        {
                                            name: 'inCludedFeatures',
                                            title: 'Included Features',
                                            type: 'array',
                                            of: [{ type: 'string' }],
                                            validation: (rule) => rule.required().min(1),
                                        },
                                        {
                                            name: 'usageLimitsSectionTitle',
                                            title: 'Usage Limits Section Title',
                                            type: 'string',
                                            initialValue: 'Usage limits:'
                                        },
                                        {
                                            name: 'usageLimits',
                                            title: 'Usage Limits',
                                            type: 'array',
                                            of: [{ type: 'string' }],
                                        }
                                    ],
                                    preview: {
                                        select: {
                                            title: 'heading',
                                            price: 'price',
                                            isPopular: 'isPopular',
                                            duration: 'duration',
                                        },
                                        prepare({ title, price, isPopular, duration  }) {
                                            const pricing = price !== undefined ? price.toFixed(2) : 'N/A'
                                            const durationValue = duration ? duration : ''
                                            const subTitle = isPopular
                                                ? `Popular - $${pricing} ${durationValue}`
                                                : `$${pricing} ${durationValue}`

                                            return {
                                                title: title || 'Untitled Card',
                                                subtitle: subTitle,
                                            }
                                        },
                                    },
                                }
                            ],
                        },
                    ],
                    preview: {
                        select: {
                            title: 'tabLabel',
                        },
                        prepare({ title  }) {
                            return {
                                title: title || 'Untitled Tab',
                            }
                        },
                    },
                }
            ],
            description: 'Add pricing tabs to display different pricing options',
            preview: {
                select: {
                    tabs: 'tabs',
                },
                prepare({ tabs = [] }) {
                    const count = tabs.length
                    return {
                        title: `Pricing Table Section (${count} ${count === 1 ? 'tab' : 'tabs'})`,
                    }
                },
            },
        },
        {
            name: 'vatInfo',
            title: 'VAT Information',
            type: 'string',
            description: 'Information about VAT to display below the pricing tables (optional)',
        },
        {
            name: 'stats',
            type: 'array',
            title: 'Trust Badges',
            of: [
                {
                    type: 'object',
                    name: 'badge',
                    title: 'Badge',
                    fields: [
                        {
                            name: 'type',
                            type: 'string',
                            title: 'Type',
                            options: {
                                list: [
                                    { title: 'Satisfaction', value: 'satisfaction' },
                                    { title: 'Money Back Guarantee', value: 'moneyBackGuarantee' },
                                    { title: 'Support', value: 'support' },
                                    { title: 'Cancellation', value: 'cancellation' },
                                ],
                            },
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'label',
                            type: 'string',
                            title: 'Label',
                            validation: (rule) => rule.required(),
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        prepare() {
            return {
                title: 'Pricing Table Section',
            }
        },
    },

})
