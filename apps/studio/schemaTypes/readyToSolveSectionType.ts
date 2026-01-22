import { defineType, defineField } from 'sanity'

export const readyToSolveSectionType = defineType({
    name: 'readyToSolveSectionType',
    title: 'Ready To Solve Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'array',
            of: [{ type: 'textSegment' }],
            initialValue: [
                { text: 'Ready to Solve These ', type: 'normal' },
                { text: 'Challenges?', type: 'highlight' }
            ]
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            initialValue: 'TryonAR transforms these pain points into competitive advantages with our no-code AR solution.',
        }),
        defineField({
            name: 'sectionImage',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text'
                }
            ]
        }),
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
                {
                    name: 'showIcon',
                    title: 'Show Icon',
                    type: 'boolean',
                    initialValue: true,
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
        prepare({ title, media }: { title: any; media: any }) {
            return {
                title: 'Ready To Solve Section',
                media
            }
        }
    }
})
