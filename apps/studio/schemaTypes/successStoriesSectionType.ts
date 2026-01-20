import { defineType, defineField } from 'sanity'

export const successStoriesSectionType = defineType({
    name: 'successStoriesSectionType',
    title: 'Success Stories Section',
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
            name: 'stories',
            title: 'Stories',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'story',
                    title: 'Story',
                    fields: [
                        {
                            name: 'rating',
                            title: 'Rating',
                            type: 'number',
                            validation: (rule) => rule.required().min(1).max(5),
                        },
                        {
                            name: 'authorName',
                            title: 'Author Name',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'authorPosition',
                            title: 'Author Position',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'review',
                            title: 'Review',
                            type: 'text',
                            rows: 3,
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'authorImage',
                            title: 'Author Image',
                            type: 'image',
                            validation: (rule) => rule.required(),
                            fields: [
                                {
                                    name: 'alt',
                                    type: 'string',
                                    title: 'Alt text',
                                    description: 'Alternative text for the image (optional)',
                                },
                            ],
                        }

                    ]
                }
            ],
            validation: (rule) => rule.min(1).required(),
            description: 'List of success stories to showcase'
        }
    ],
    preview: {
        select: {
            title: 'heading',
            storiesCount: 'stories'
        },
        prepare({ title, storiesCount }) {
            const count = Array.isArray(storiesCount) ? storiesCount.length : 0
            return {
                title: title || 'Success Stories Section',
                subtitle: `${count} ${count === 1 ? 'story' : 'stories'}`
            }
        }
    }
})
