import { defineType, defineField } from 'sanity'

export const realitySectionType = defineType({
  name: 'realitySectionType',
  title: 'Reality Check Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Small text above the heading (e.g., "The Reality Check")'
    }),
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
      description: 'Main headline for the section (supports line breaks)'
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
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Tab ID',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Unique identifier for the tab (e.g., "low-conversion")'
            },
            {
              name: 'title',
              title: 'Tab Title',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Title displayed on the tab button'
            },
            {
              name: 'subtitle',
              title: 'Tab Subtitle',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Subtitle displayed on the tab button'
            },
            {
              name: 'icon',
              title: 'Tab Icon (SVG)',
              type: 'image',
              options: {
                accept: 'image/svg+xml'
              },
              validation: (rule) => rule.required(),
              description: 'SVG icon for the tab (upload SVG file)'
            },
            {
              name: 'impact',
              title: 'Business Impact',
              type: 'object',
              fields: [
                {
                  name: 'revenue',
                  title: 'Revenue Impact',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'High', value: 'High' },
                      { title: 'Moderate', value: 'Moderate' },
                      { title: 'Low', value: 'Low' }
                    ]
                  },
                  validation: (rule) => rule.required()
                },
                {
                  name: 'satisfaction',
                  title: 'Customer Satisfaction Impact',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'High', value: 'High' },
                      { title: 'Moderate', value: 'Moderate' },
                      { title: 'Low', value: 'Low' },
                      { title: 'N/A', value: 'N/A' }
                    ]
                  },
                  validation: (rule) => rule.required()
                },
                {
                  name: 'costs',
                  title: 'Costs Impact',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'High', value: 'High' },
                      { title: 'Rising', value: 'Rising' },
                      { title: 'Moderate', value: 'Moderate' },
                      { title: 'Low', value: 'Low' }
                    ]
                  },
                  validation: (rule) => rule.required()
                }
              ],
              validation: (rule) => rule.required()
            },
            {
              name: 'detailsTitle',
              title: 'Details Title',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Title for the content panel'
            },
            {
              name: 'detailsDescription',
              title: 'Details Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
              description: 'Main description for the content panel'
            },
            {
              name: 'detailsSubtitle',
              title: 'Details Subtitle',
              type: 'string',
              description: 'Optional subtitle above the list (e.g., "Average return rate for fashion/eyewear")'
            },
            {
              name: 'detailsList',
              title: 'Details List',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (rule) => rule.required().min(1).max(6),
              description: 'List of key points (max 6 items)'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              icon: 'icon'
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: title || 'Untitled Tab',
                subtitle: subtitle || '',
                media: icon
              }
            }
          }
        }
      ],
      validation: (rule) => rule.required().min(1).max(5),
      description: 'Tabs for different reality check topics (max 5)'
    })
  ],
  preview: {
    select: {
      heading: 'heading',
      eyebrow: 'eyebrow'
    },
    prepare({ heading, eyebrow }) {
      return {
        title: eyebrow || 'Reality Check Section',
        subtitle: heading || 'No heading set'
      }
    }
  }
})
