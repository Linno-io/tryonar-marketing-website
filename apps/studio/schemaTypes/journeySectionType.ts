import { defineType, defineField } from 'sanity'

export const journeySectionType = defineType({
  name: 'journeySectionType',
  title: 'Journey Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'array',
      of: [{ type: 'textSegment' }],
      initialValue: [
        { text: 'Your Journey to ', type: 'normal' },
        { text: 'AR Success', type: 'highlight' }
      ]
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue: 'Three simple steps to transform your e-commerce experience',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'subtext',
            title: 'Subtext',
            type: 'text',
            validation: Rule => Rule.required(),
          }),
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'description',
          }
        }
      }],
      validation: Rule => Rule.required().min(3).max(3),
      initialValue: [
        {
          title: 'Connect',
          description: 'Link your e-commerce platform',
          subtext: 'Three simple steps to transform your e-commerce experience',
        },
        {
          title: 'Upload',
          description: 'Add your product catalog',
          subtext: 'Upload and configure your product catalog with AR-ready content',
        },
        {
          title: 'Launch',
          description: 'Go live with AR experiences',
          subtext: 'Launch your enhanced AR shopping experience to customers worldwide',
        },
      ]
    }),
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
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Journey Section',
        subtitle: 'AR Success Journey'
      }
    }
  }
})
