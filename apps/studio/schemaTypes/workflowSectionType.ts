import { defineType, defineField } from 'sanity'

export const workFlowSectionType = defineType({
    name: 'workFlowSectionType',
    title: 'Workflow Section',
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
            name: 'steps',
            title: 'Steps',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'step',
                    title: 'Step',
                    fields: [
                        {
                            name: 'stepTitle',
                            title: 'Step Title',
                            type: 'richTextHighlight',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'stepDescription',
                            title: 'Step Description',
                            type: 'text',
                            rows: 3,
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'tags',
                            title: 'Tags',
                            type: 'array',
                            of: [{ type: 'string' }],
                            description: 'Tags to display above the title (optional)'
                        },
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
                    ],
                    preview: {
                        select: {
                            title: 'stepTitle',
                            media: 'image',
                        },
                        prepare(selection: {
                            title?: any[];
                            media?: any;
                            tags?: any[];
                        }) {
                            const { title, media, tags } = selection;

                           const plainTitle = Array.isArray(title)
                            ? title.map((seg) => seg?.text).join(' ').trim()
                            : 'Step';
                            
                                console.log('Tags in preview prepare:', title);
                            return {
                                title: plainTitle || 'Step',
                                subtitle: tags?.length ? tags.join(' • ') : 'Workflow Step',
                                media,
                            };
                        },
                    },
                }
            ],
            validation: (rule) => rule.min(1).required(),
            description: 'Tabs to showcase different industry solutions'
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
            media: 'steps.0.image',
        },
        prepare(selection: { title?: any[]; media?: any }) {
            const { title, media } = selection

            const plainTitle = Array.isArray(title)
                ? title.map((t) => t?.text).join(' ')
                : 'Workflow Section'

            return {
                title: plainTitle || 'Workflow Section',
                subtitle: 'Workflow Section',
                media: media,
            }
        },
    },

})
