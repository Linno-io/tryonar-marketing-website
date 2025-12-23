import { defineType, defineField } from 'sanity'

export const heroSectionType = defineType({
  name: 'heroSectionType',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
      description: 'Main headline for the hero section (supports line breaks)'
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
      description: 'Supporting text below the heading'
    }),
    defineField({
      name: 'trustBadges',
      title: 'Trust Badges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Badge Text',
              type: 'string',
              validation: (rule) => rule.required()
            }
          ],
          preview: {
            select: {
              title: 'text'
            }
          }
        }
      ],
      validation: (rule) => rule.max(5),
      description: 'Trust badges displayed below the subtext (max 5)'
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA Button',
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
      name: 'secondaryCta',
      title: 'Secondary CTA Button',
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
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required()
        }
      ],
      validation: (rule) => rule.required(),
      description: 'Main hero image displayed below the CTAs'
    })
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'heroImage'
    }
  }
})
