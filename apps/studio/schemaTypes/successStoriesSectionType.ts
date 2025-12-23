import { defineType, defineField } from 'sanity'

export const successStoriesSectionType = defineType({
  name: 'successStoriesSectionType',
  title: 'Success Stories Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'Trusted by Industry Leaders',
      validation: (rule) => rule.required(),
      description: 'Small text above the heading'
    }),
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'text',
      rows: 2,
      initialValue: 'Join thousands of successful stores',
      validation: (rule) => rule.required(),
      description: 'Main headline for the section'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      initialValue: 'See how leading e-commerce brands are transforming their customer experience with TryonAR',
      validation: (rule) => rule.required(),
      description: 'Supporting text below the heading'
    }),
    defineField({
      name: 'stats',
      title: 'Statistics Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Stat Label',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Main statistic (e.g., "10,000+" or "94%")'
            },
            {
              name: 'sublabel',
              title: 'Sublabel',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Description of the stat (e.g., "Active Stores")'
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Store', value: 'store' },
                  { title: 'Target', value: 'target' },
                  { title: 'Trending Up', value: 'trending-up' },
                  { title: 'Refresh', value: 'refresh' }
                ]
              },
              validation: (rule) => rule.required(),
              description: 'Icon to display with the statistic'
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'sublabel',
              icon: 'icon'
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: `${title} - ${subtitle}`,
                subtitle: `Icon: ${icon}`
              }
            }
          }
        }
      ],
      validation: (rule) => rule.required().max(4),
      description: 'Statistics to display (max 4)'
    }),
    defineField({
      name: 'stories',
      title: 'Success Stories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'industry',
              title: 'Industry',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Industry name (e.g., "Fashion Industry")'
            },
            {
              name: 'quote',
              title: 'Testimonial Quote',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
              description: 'Customer testimonial quote'
            },
            {
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Name of the person giving the testimonial'
            },
            {
              name: 'role',
              title: 'Author Role',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Job title of the person (e.g., "E-COMMERCE DIRECTOR")'
            },
            {
              name: 'avatar',
              title: 'Avatar Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: (rule) => rule.required(),
              description: 'Profile photo of the testimonial author'
            },
            {
              name: 'metrics',
              title: 'Success Metrics',
              type: 'object',
              fields: [
                {
                  name: 'conversion',
                  title: 'Conversion Increase',
                  type: 'string',
                  validation: (rule) => rule.required(),
                  description: 'e.g., "+127%"'
                },
                {
                  name: 'return',
                  title: 'Return Reduction',
                  type: 'string',
                  validation: (rule) => rule.required(),
                  description: 'e.g., "-68%"'
                },
                {
                  name: 'satisfaction',
                  title: 'Customer Satisfaction',
                  type: 'string',
                  validation: (rule) => rule.required(),
                  description: 'e.g., "4.9/5"'
                }
              ],
              validation: (rule) => rule.required(),
              description: 'Key performance metrics'
            }
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'industry',
              media: 'avatar'
            },
            prepare({ title, subtitle, media }) {
              return {
                title,
                subtitle,
                media
              }
            }
          }
        }
      ],
      validation: (rule) => rule.required().min(1).max(5),
      description: 'Customer success stories (1-5 stories)'
    })
  ],
  preview: {
    select: {
      title: 'heading',
      storiesCount: 'stories'
    },
    prepare({ title, storiesCount }) {
      const count = Array.isArray(storiesCount) ? storiesCount.length : 0
      return {
        title: title || 'Success Stories Section',
        subtitle: `${count} ${count === 1 ? 'story' : 'stories'}`
      }
    }
  }
})
