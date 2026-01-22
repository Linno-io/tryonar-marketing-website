import { defineType, defineField } from 'sanity'

export const gallerySectionType = defineType({
  name: 'gallerySectionType',
  title: 'Gallery Section',
  type: 'object',
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
        ],
        preview: {
          select: {
            title: 'label',
            subtitle: 'value',
          }
        }
      }],
      validation: Rule => Rule.required().min(4).max(4),
      initialValue: [
        { label: 'Active Stores', value: '10,000+' },
        { label: 'AR Interactions', value: '50M+' },
        { label: 'Avg Conversion Lift', value: '94%' },
        { label: 'Return Reduction', value: '64%' },
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
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{
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
      }],
      validation: Rule => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'stats',
    },
    prepare({ title }) {
      return {
        title: 'Gallery Section',
        subtitle: 'Stats & Images Gallery'
      }
    }
  }
})
