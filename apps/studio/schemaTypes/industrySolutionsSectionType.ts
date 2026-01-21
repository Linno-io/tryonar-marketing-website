import { defineType, defineField } from 'sanity'

const isComingSoon = (context: any) => context?.parent?.comingSoon === true


export const industrySolutionsSectionType = defineType({
    name: 'industrySolutionsSectionType',
    title: 'Industry Solutions Section',
    type: 'object',
    fields: [
        {
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            validation: (rule) => rule.required(),
            description: 'A short tagline to introduce the industry solutions section',
        },
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
            name: 'tabs',
            title: 'Tabs',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'tab',
                    title: 'Tab',
                    fields: [
                        {
                            name: 'comingSoon',
                            title: 'Coming Soon',
                            type: 'boolean',
                            initialValue: false,
                        },
                        {
                            name: 'tabLabel',
                            title: 'Tab Label',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'tabContent',
                            title: 'Tab Content',
                            type: 'object',
                            hidden: ({ parent }) => parent?.comingSoon === true,
                            validation: (Rule) =>
                            Rule.custom((value, context) => {
                                if (isComingSoon(context)) return true
                                if (!value) return 'Tab Content is required when Coming Soon is disabled'
                                return true
                            }),
                            fields: [
                                {
                                    name: 'image',
                                    title: 'Image',
                                    type: 'image',
                                    fields: [
                                        {
                                            name: 'alt',
                                            title: 'Alt Text',
                                            type: 'string',
                                        }
                                    ],
                                    description: 'Image representing the industry solution'
                                },
                                {
                                    name: 'contentTitle',
                                    title: 'Content Title',
                                    type: 'string',
                                },
                                {
                                    name: 'contentDescription',
                                    title: 'Content Description',
                                    type: 'text',
                                    rows: 3,
                                },
                                {
                                    name: 'features',
                                    title: 'Features',
                                    type: 'array',
                                    of: [
                                        {
                                            type: 'object',
                                            name: 'feature',
                                            title: 'Feature',
                                            fields: [
                                                {
                                                    name: 'featureTitle',
                                                    title: 'Feature Title',
                                                    type: 'string',
                                                    validation: (rule) => rule.required(),
                                                },
                                                {
                                                    name: 'icon',
                                                    title: 'Icon',
                                                    type: 'image',
                                                    fields: [
                                                        {
                                                            name: 'alt',
                                                            title: 'Alt Text',
                                                            type: 'string',
                                                            validation: (rule) => rule.required()
                                                        }
                                                    ],
                                                    validation: (rule) => rule.required(),
                                                    description: 'Icon representing the feature'
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: 'stats',
                                    title: 'Statistics',
                                    type: 'array',
                                    of: [
                                        {
                                            type: 'object',
                                            name: 'statistic',
                                            title: 'Statistic',
                                            fields: [
                                                {
                                                    name: 'label',
                                                    title: 'Label',
                                                    type: 'string',
                                                    validation: (rule) => rule.required(),
                                                },
                                                {
                                                    name: 'value',
                                                    title: 'Value',
                                                    type: 'string',
                                                    validation: (rule) => rule.required(),
                                                },
                                            ]
                                        }
                                    ],
                                    description: 'Key statistics to highlight (optional)'
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
                            ]
                        },
                    ]
                }
            ],
            validation: (rule) => rule.min(1).required(),
            description: 'Tabs to showcase different industry solutions'
        },
        {
            name: 'showStatsOnBottom',
            title: 'Show Statistics on Bottom',
            type: 'boolean',
            initialValue: false,
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
            media: 'tabs.0.tabContent.image',
        },
        prepare(selection: { title?: any[]; media?: any }) {
            const { title, media } = selection

            const plainTitle = Array.isArray(title)
                ? title.map((t) => t?.text).join(' ')
                : 'Industry Section'

            return {
                title: plainTitle || 'Industry Solutions Section',
                subtitle: 'Industry Solutions Section',
                media: media,
            }
        },
    },
})
