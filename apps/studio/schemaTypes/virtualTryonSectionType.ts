import { defineType, defineField } from 'sanity'

export const virtualTryonSectionType = defineType({
  name: 'virtualTryonSectionType',
  title: 'Virtual Try-on Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'array',
      of: [{ type: 'textSegment' }],
      initialValue: [
        { text: 'App-free web ', type: 'normal' },
        { text: 'virtual ', type: 'normal' },
        { text: 'Try-on', type: 'highlight' }
      ]
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue: 'From fashion to jewelry, our AR solutions are customized to meet the unique needs of your industry.',
    }),
    defineField({
      name: 'sectionImage',
      title: 'Section Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
        }
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
      media: 'sectionImage',
    },
    prepare({ title, media }) {
      return {
        title: 'Virtual Try-on Section',
        subtitle: 'App-free Web AR',
        media: media
      }
    }
  }
})
