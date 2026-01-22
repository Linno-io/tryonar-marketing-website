import { defineType } from 'sanity'


export const comparisonSectionType = defineType({
    name: 'comparisonSectionType',
    title: 'Comparison Section',
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
            name: 'traditionalAR',
            title: 'Traditional AR',
            type: 'object',
            validation: (rule) => rule.required(),
            description: 'Details about Traditional AR',
            fields: [
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                    validation: (rule) => rule.required(),
                },
                {
                    name: 'features',
                    title: 'Features',
                    type: 'array',
                    of: [{type: 'string'}],
                    description: 'List of features for Traditional AR',
                }
            ]
        },
        {
            name: 'tryOnAR',
            title: 'TryOnAR',
            type: 'object',
            validation: (rule) => rule.required(),
            description: 'Details about TryOnAR',
            fields: [
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                    validation: (rule) => rule.required(),
                },
                {
                    name: 'features',
                    title: 'Features',
                    type: 'array',
                    of: [{type: 'string'}],
                    description: 'List of features for Traditional AR',
                }
            ]
        },
        {
            name: 'basicWebAR',
            title: 'Basic Web AR',
            type: 'object',
            validation: (rule) => rule.required(),
            description: 'Details about Basic Web AR',
            fields: [
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                    validation: (rule) => rule.required(),
                },
                {
                    name: 'features',
                    title: 'Features',
                    type: 'array',
                    of: [{type: 'string'}],
                    description: 'List of features for Traditional AR',
                }
            ]
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
        },
        prepare(selection: { title?: any[]; media?: any }) {
            const { title } = selection

            const plainTitle = Array.isArray(title)
                ? title.map((t) => t?.text).join(' ')
                : 'Comparison Section'

            return {
                title: plainTitle || 'Comparison Section',
            }
        },
    },
})
