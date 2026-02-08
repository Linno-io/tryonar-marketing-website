import { defineType } from 'sanity'

export const caseStudiesSectionType = defineType({
    name: 'caseStudiesSectionType',
    title: 'Case Studies Section',
    type: 'object',
    fields: [
        {
            name: 'showDivider',
            title: 'Show Divider',
            type: 'boolean',
            initialValue: true,
        },
        {
            name: 'title',
            title: 'Title',
            type: 'richTextHighlight',
            description: 'Main heading for the case studies section',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            description: 'Supporting text below the title',
        },
        {
            name: 'caseStudies',
            title: 'Case Studies',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'caseStudy',
                    title: 'Case Study',
                    fields: [
                        {
                            name: 'companyName',
                            title: 'Company Name',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'summary',
                            title: 'Summary',
                            type: 'text',
                            rows: 4,
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'metrics',
                            title: 'Metrics',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'metric',
                                    title: 'Metric',
                                    fields: [
                                        {
                                            name: 'value',
                                            title: 'Value',
                                            type: 'string',
                                            validation: (rule) => rule.required(),
                                            description: 'e.g. 67%',
                                        },
                                        {
                                            name: 'label',
                                            title: 'Label',
                                            type: 'string',
                                            validation: (rule) => rule.required(),
                                            description: 'e.g. Sales Increase',
                                        },
                                    ],
                                    preview: {
                                        select: {
                                            title: 'value',
                                            subtitle: 'label',
                                        },
                                    },
                                },
                            ],
                            validation: (rule) => rule.min(1).required(),
                            description: 'Key metrics shown for this case study',
                        },
                    ],
                    preview: {
                        select: {
                            title: 'companyName',
                            metrics: 'metrics',
                        },
                        prepare(selection: { title?: string; metrics?: any[] }) {
                            const { title, metrics } = selection

                            return {
                                title: title || 'Case Study',
                                subtitle: metrics?.length
                                    ? `${metrics.length} metrics`
                                    : 'No metrics added',
                            }
                        },
                    },
                },
            ],
            validation: (rule) => rule.min(1).required(),
            description: 'List of customer case studies',
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
        {
            name: 'secondaryButton',
            title: 'Secondary Button',
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
        prepare(selection: { title?: any[] }) {
            const plainTitle = Array.isArray(selection.title)
                ? selection.title.map((t) => t?.text).join(' ')
                : 'Case Studies Section'

            return {
                title: plainTitle || 'Case Studies Section',
                subtitle: 'Customer success stories with metrics',
            }
        },
    },
})
