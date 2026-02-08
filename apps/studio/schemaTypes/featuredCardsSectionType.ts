import { defineType } from 'sanity'

export const featuredCardsSectionType = defineType({
    name: 'featuredCardsSectionType',
    title: 'Featured Cards Section',
    type: 'object',
    fields: [
        {
            name: 'items',
            title: 'Case Studies',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'item',
                    title: 'Case Study',
                    fields: [
                        {
                            name: 'companyName',
                            title: 'Company Name',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'highlightValue',
                            title: 'Highlight Value',
                            type: 'string',
                            validation: (rule) => rule.required(),
                            description: 'e.g. 312% ROI, 450% Growth',
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 3,
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'sectionImage',
                            title: 'Background Image',
                            type: 'image',
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alt Text',
                                    type: 'string',
                                },
                            ],
                            validation: (rule) => rule.required(),
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
                                    validation: (Rule) =>
                                        Rule.uri({
                                            scheme: ['http', 'https'],
                                        }),
                                },
                            ],
                        },
                    ],
                    preview: {
                        select: {
                            title: 'companyName',
                            subtitle: 'highlightValue',
                            media: 'image',
                        },
                    },
                },
            ],
            validation: (rule) => rule.min(1).required(),
        },
    ],
    preview: {
        prepare() {
            return {
                title: 'Case Study Highlights',
                subtitle: 'Large visual case studies',
            }
        },
    },
})
