import { defineType, defineField } from 'sanity'

export const faqSectionType = defineType({
    name: 'faqSectionType',
    title: 'FAQ Section',
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
            description: 'Supporting text below the title (optional)'
        },
        {
            name: 'faq',
            title: 'Question and Answers',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'faqItem',
                    title: 'FAQ Item',
                    fields: [
                        {
                            name: 'question',
                            title: 'Question',
                            type: 'text',
                            rows: 2,
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'answer',
                            title: 'Answer',
                            type: 'text',
                            rows: 3,
                            validation: (rule) => rule.required(),
                        },
                    ]
                }
            ],
            validation: (rule) => rule.min(1).required(),
            description: 'List of FAQs to showcase'
        }
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare({ title }) {
            return {
                title: title || 'FAQ Section',
            }
        }
    }
})
