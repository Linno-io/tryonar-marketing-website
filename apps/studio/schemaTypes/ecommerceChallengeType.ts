import { defineType, defineField } from 'sanity'

export const ecommerceChallengeType = defineType({
  name: 'ecommerceChallengeType',
  title: 'E-commerce Challenge Section',
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'The Reality Check',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'array',
      of: [{ type: 'textSegment' }],
      initialValue: [
        { text: "E-commerce's Biggest ", type: 'normal' },
        { text: 'Challenge', type: 'highlight' }
      ]
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue: "Online shoppers can't truly experience products before buying, leading to high return rates and lost conversions.",
    }),
    defineField({
      name: 'tabs',
      title: 'Challenge Tabs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'tabId',
            title: 'Tab ID',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'tabLabel',
            title: 'Tab Label',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'contentDescription',
            title: 'Content Description',
            type: 'text',
          }),
          defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
          }),
          defineField({
            name: 'image',
            title: 'Image',
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
        ],
        preview: {
          select: {
            title: 'tabLabel',
            subtitle: 'title',
          }
        }
      }],
      initialValue: [
        {
          tabId: 'low-conversion',
          tabLabel: 'Low Conversion',
          title: 'Low Conversion',
          value: '2.86%',
          contentDescription: "Online shoppers can't truly experience products before buying, leading to high return rates and lost conversions.",
          features: [
            'Limited product interaction reduces engagement',
            'Difficulty imagining product in real environment',
            'Lack of scale and context understanding',
            'Missing emotional connection with products',
          ],
        },
        {
          tabId: 'return-rate',
          tabLabel: 'Return Rate',
          title: '30% Return Rate',
          value: 'High',
          contentDescription: "Online shoppers can't truly experience products before buying, leading to high return rates and lost conversions.",
          features: [
            'Incorrect size or fit expectations',
            'Color mismatch from screen to reality',
            'High logistics and restocking costs',
            'Negative environmental impact',
          ],
        },
        {
          tabId: 'dev-complexity',
          tabLabel: 'Dev Complexity',
          title: 'Dev Complexity',
          value: 'High',
          contentDescription: "Online shoppers can't truly experience products before buying, leading to high return rates and lost conversions.",
          features: [
            'Steep learning curve for WebGL',
            'Asset optimization challenges',
            'Cross-browser 3D rendering issues',
            'Longer time-to-market for AR features',
          ],
        },
      ]
    }),
  ],
  preview: {
    select: {
      title: 'tagline',
    },
    prepare({ title }) {
      return {
        title: title || 'E-commerce Challenge Section',
        subtitle: 'Challenge Section'
      }
    }
  }
})
