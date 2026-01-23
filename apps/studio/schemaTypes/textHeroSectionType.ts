import { defineType, defineField } from 'sanity'

export const textHeroSectionType = defineType({
    name: 'textHeroSectionType',
    title: 'Text Based Hero Section',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'richTextHighlight',
            validation: (rule) => rule.required(),
            description: 'Main heading for the text based hero section',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (rule) => rule.required(),
            description: 'Supporting text below the title'
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare(selection: { title?: any[] }) {
            const { title } = selection

            const plainTitle = Array.isArray(title)
                ? title.map((t) => t?.text).join(' ')
                : 'Text Based Hero Section'

            return {
                title: plainTitle || 'Text Based Hero Section',
                subtitle: 'Text Based Hero Section',
            }
        },
    },

})
