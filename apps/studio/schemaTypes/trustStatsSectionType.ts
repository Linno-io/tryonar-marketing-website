import { defineType } from 'sanity'

export const trustStatsSectionType = defineType({
    name: 'trustStatsSectionType',
    title: 'Trust Stats Section',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'richTextHighlight',
            description: 'Main heading of the trust section',
        },
        {
            name: 'avatars',
            title: 'Avatars',
            type: 'array',
            of: [
                {
                    type: 'image',
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                        },
                    ],
                },
            ],
            description: 'User avatars shown near the title',
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
                            description: 'e.g. 2.3x, 30hrs, 91%',
                        },
                        {
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 3,
                            validation: (rule) => rule.required(),
                        },
                    ],
                    preview: {
                        select: {
                            title: 'value',
                            subtitle: 'title',
                        },
                    },
                },
            ],
            validation: (rule) => rule.min(1).required(),
            description: 'Trust and performance statistics',
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare(selection: { title?: any[] }) {
            const plainTitle = Array.isArray(selection.title)
                ? selection.title.map((t) => t?.text).join(' ')
                : 'Trust Stats Section'

            return {
                title: plainTitle || 'Trust Stats Section',
                subtitle: 'Social proof and key metrics',
            }
        },
    },
})
