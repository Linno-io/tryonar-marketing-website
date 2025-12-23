import { defineType, defineField } from 'sanity'

export const ctaSectionType = defineType({
  name: 'ctaSectionType',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
      description: 'Main headline for the CTA section'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
      description: 'Supporting text below the title'
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Challenges', value: 'challenges' },
          { title: 'Transform', value: 'transform' }
        ],
        layout: 'radio'
      },
      initialValue: 'challenges',
      validation: (rule) => rule.required(),
      description: 'Select variant style (Transform shows stats badges)'
    }),
    defineField({
      name: 'stats',
      title: 'Stats Badges',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(6),
      description: 'Stats displayed as badges (only shown when variant is "Transform", max 6)',
      hidden: ({ parent }) => parent?.variant !== 'transform'
    }),
    defineField({
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
          name: 'link',
          title: 'Button Link',
          type: 'url',
          validation: (rule) => rule.required()
        }
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (rule) => rule.required()
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'url',
          validation: (rule) => rule.required()
        }
      ],
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title',
      variant: 'variant'
    },
    prepare({ title, variant }) {
      return {
        title: title || 'CTA Section',
        subtitle: `Variant: ${variant || 'challenges'}`
      }
    }
  }
})
