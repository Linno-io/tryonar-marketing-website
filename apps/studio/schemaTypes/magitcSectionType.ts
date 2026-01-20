import { defineType } from 'sanity'


export const magicSectionType = defineType({
    name: 'magicSectionType',
    title: 'Magic Section',
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
            name: 'statistics',
            type: 'array',
            title: 'Statistics',
            of: [
                {
                    type: 'object',
                    name: 'statistic',
                    title: 'Statistic',
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            title: 'Title',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'description',
                            type: 'string',
                            title: 'Description',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'value',
                            type: 'string',
                            title: 'Value',
                            validation: (rule) => rule.required(),
                        },
                    ],
                },
            ],
             validation: (rule: any) =>
                rule.required()
                .min(2)
                .max(10)
                .custom((items: any[]) => {
                    if (!items) return true; // handled by required()
                    return items.length % 2 === 0 || 'Number of items must be even (2 to 10)';
                }),
            description: 'Add even number of statistics to display as cards'
        }
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title[0]?.text || 'Magic Section',
            }
        }
    }
})
