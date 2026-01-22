import { defineType, defineField } from 'sanity'

export const experienceSectionType = defineType({
  name: 'experienceSectionType',
  title: 'Experience Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'array',
      of: [{ type: 'textSegment' }],
      initialValue: [
        { text: 'Experience the ', type: 'normal' },
        { text: 'New Era', type: 'highlight' },
        { text: ' of Shopping', type: 'normal' }
      ]
    }),
    defineField({
      name: 'features',
      title: 'Features',
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
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'description',
          }
        }
      }],
      validation: Rule => Rule.required().min(4).max(4),
      initialValue: [
        {
          title: 'Stand out from your competitors',
          description: "Wouldn't you rather shop in the store with a virtual try-on? Let's be honest here.",
        },
        {
          title: 'Save money. Save nature.',
          description: 'Returns and refunds cost time, money and CO2. Minimize them with our tool.',
        },
        {
          title: 'Enhance customer experience',
          description: "Wouldn't you rather shop in the store with a virtual try-on? Let's be honest here.",
        },
        {
          title: 'No shipping required',
          description: "Wouldn't you rather shop in the store with a virtual try-on? Let's be honest here.",
        },
      ]
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
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'Experience Section',
        subtitle: 'Shopping Experience'
      }
    }
  }
})
