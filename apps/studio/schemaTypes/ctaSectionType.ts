import { defineType, defineField } from 'sanity'

export const ctaSectionType = defineType({
    name: 'ctaSectionType',
    title: 'CTA Section',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'text',
            rows: 2,
            validation: (rule) => rule.required(),
            description: 'Main headline for the CTA section'
        },
        {
            name: 'highlightText',
            title: 'Highlight Text',
            type: 'text',
            rows: 2,
            validation: (rule) => rule.required(),
            description: 'Highlighted part of heading (e.g. customer experience)'
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
            name: 'stats',
            type: 'array',
            title: 'Stats Badges',
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
                                    { title: 'Support', value: 'support' },
                                    { title: 'Security', value: 'security' },
                                    { title: 'Trial', value: 'trial' },
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
            name: 'secondaryButton',
            title: 'Secondary Button',
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
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title || 'CTA Section',
            }
        }
    }
})
