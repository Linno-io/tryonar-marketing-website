import { defineType } from 'sanity'

export const businessResultsSectionType = defineType({
    name: 'businessResultsSectionType',
    title: 'Business Results Section',
    type: 'object',
    fields: [
        {
            name: 'enableBottomPadding',
            title: 'Enable Bottom Padding',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'title',
            title: 'Title',
            type: 'richTextHighlight',
            validation: (rule) => rule.required(),
        },
        {
            name: 'cards',
            title: 'Cards',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'card',
                    title: 'Card',
                    fields: [
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'image',
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alt Text',
                                    type: 'string',
                                }
                            ],
                            description: 'Icon for the card (SVG or PNG)',
                        },
                        {
                            name: 'cardTitle',
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
                            title: 'cardTitle',
                            media: 'icon',
                        },
                        prepare(selection: { title?: string; media?: any }) {
                            return {
                                title: selection.title || 'Card',
                                media: selection.media,
                            }
                        },
                    },
                }
            ],
            validation: (rule) => rule.min(1).required(),
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare(selection: { title?: any[] }) {
            const plainTitle = Array.isArray(selection.title)
                ? selection.title.map((t) => t?.text).join(' ')
                : 'Business Results Section'
            return {
                title: plainTitle || 'Business Results Section',
                subtitle: 'Business Results Section',
            }
        },
    },
})
