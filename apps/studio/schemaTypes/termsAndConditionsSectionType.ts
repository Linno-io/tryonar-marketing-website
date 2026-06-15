import { defineType } from 'sanity'

export const termsAndConditionsSectionType = defineType({
    name: 'termsAndConditionsSectionType',
    title: 'Terms & Conditions Section',
    type: 'object',
    fields: [
        {
            name: 'sections',
            title: 'Content Sections',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'contentSection',
                    fields: [
                        {
                            name: 'heading',
                            title: 'Section Heading',
                            type: 'string',
                            validation: (rule) => rule.required(),
                            description: 'e.g. "Overview", "Online Store Terms", "General Conditions"',
                        },
                        {
                            name: 'body',
                            title: 'Content',
                            type: 'array',
                            of: [
                                {
                                    type: 'block',
                                    styles: [
                                        { title: 'Normal', value: 'normal' },
                                        { title: 'Heading 3', value: 'h3' },
                                        { title: 'Heading 4', value: 'h4' },
                                        { title: 'Quote', value: 'blockquote' },
                                    ],
                                    lists: [
                                        { title: 'Bullet', value: 'bullet' },
                                        { title: 'Numbered', value: 'number' },
                                    ],
                                    marks: {
                                        decorators: [
                                            { title: 'Strong', value: 'strong' },
                                            { title: 'Emphasis', value: 'em' },
                                            { title: 'Underline', value: 'underline' },
                                            { title: 'Strike', value: 'strike-through' },
                                            { title: 'Code', value: 'code' },
                                        ],
                                        annotations: [
                                            {
                                                name: 'link',
                                                type: 'object',
                                                title: 'Link',
                                                fields: [
                                                    {
                                                        name: 'href',
                                                        title: 'URL',
                                                        type: 'url',
                                                        validation: (rule) =>
                                                            rule.uri({ scheme: ['http', 'https', 'mailto'] }),
                                                    },
                                                    {
                                                        name: 'blank',
                                                        title: 'Open in new tab',
                                                        type: 'boolean',
                                                        initialValue: false,
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                },
                            ],
                            validation: (rule) => rule.required(),
                            description: 'Rich text content — supports headings, bullet/numbered lists, quotes, bold, italic, underline, and links.',
                        },
                    ],
                    preview: {
                        select: { title: 'heading' },
                        prepare({ title }: { title?: string }) {
                            return { title: title || 'Content Section' }
                        },
                    },
                },
            ],
            validation: (rule) => rule.required().min(1),
            description: 'Content sections for the Terms & Conditions page',
        },
    ],
    preview: {
        prepare() {
            return {
                title: 'Terms & Conditions Section',
                subtitle: 'Legal content',
            }
        },
    },
})
