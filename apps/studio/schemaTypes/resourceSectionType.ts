import { defineType } from 'sanity'

export const resourceSectionType = defineType({
    name: 'resourceSectionType',
    title: 'Resource Section',
    type: 'object',
    fields: [
        {
            name: 'divider',
            title: 'Show Divider',
            type: 'boolean',
            initialValue: true,
        },
        {
            name: 'title',
            title: 'Title',
            type: 'text',
            rows: 2,
            validation: (rule) => rule.required(),
            description: 'Main headline for the section'
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
            name: 'sectionImage',
            type: 'image',
            title: 'Section Image',
            validation: (rule) => rule.required(),
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt text',
                    description: 'Alternative text for the image (optional)',
                },
            ],
        },
        {
            name: 'resources',
            type: 'array',
            title: 'Resources',
            of: [
                {
                    type: 'object',
                    name: 'resource',
                    title: 'Resource',
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            title: 'Title',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'link',
                            type: 'link',
                            title: 'Link',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'icon',
                            type: 'image',
                            title: 'Icon',
                            validation: (rule) => rule.required(),
                            fields: [
                                {
                                    name: 'alt',
                                    type: 'string',
                                    title: 'Alt text',
                                    description: 'Alternative text for the Icon (optional)',
                                },
                            ],
                        },
                    ],
                },
            ],
            validation: (rule) => rule.required().min(1).max(4),
            description: 'Add up to 4 resources to display in this section'
        }
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title || 'Resource Section',
            }
        }
    }
})
