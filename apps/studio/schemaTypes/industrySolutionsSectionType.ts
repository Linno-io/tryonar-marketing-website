import { defineType, defineField } from 'sanity'

export const industrySolutionsSectionType = defineType({
  name: 'industrySolutionsSectionType',
  title: 'Industry Solutions Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Tailored AR experiences for every industry'
    }),
    defineField({
      name: 'subheading',
      title: 'Section Subheading',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
      initialValue: 'From fashion to jewelry, our AR solutions are customized to meet the unique needs of your industry'
    }),
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Industry ID',
              type: 'slug',
              validation: (rule) => rule.required(),
              description: 'Unique identifier (e.g., "fashion", "eyewear")'
            },
            {
              name: 'label',
              title: 'Tab Label',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Display name in the tab navigation'
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.custom((value, context) => {
                if (context.parent?.comingSoon) return true
                return value ? true : 'Required'
              })
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (rule) => rule.custom((value, context) => {
                if (context.parent?.comingSoon) return true
                return value ? true : 'Required'
              })
            },
            {
              name: 'image',
              title: 'Industry Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: (rule) => rule.custom((value, context) => {
                if (context.parent?.comingSoon) return true
                return value ? true : 'Required'
              })
            },
            {
              name: 'roi',
              title: 'ROI Value',
              type: 'string',
              validation: (rule) => rule.custom((value, context) => {
                if (context.parent?.comingSoon) return true
                return value ? true : 'Required'
              }),
              description: 'ROI percentage (e.g., "+127%")'
            },
            {
              name: 'features',
              title: 'Key Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Feature Label',
                      type: 'string',
                      validation: (rule) => rule.required()
                    },
                    {
                      name: 'icon',
                      title: 'Icon Name',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Scan', value: 'scan' },
                          { title: 'Sparkles', value: 'sparkles' },
                          { title: 'Layout Panel', value: 'layoutPanel' },
                          { title: 'Share', value: 'share' }
                        ]
                      },
                      validation: (rule) => rule.required()
                    }
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'icon'
                    }
                  }
                }
              ],
              validation: (rule) => rule.custom((value, context) => {
                if (context.parent?.comingSoon) return true
                if (!value || value.length < 3) return 'At least 3 features required'
                if (value.length > 6) return 'No more than 6 features allowed'
                return true
              })
            },
            {
              name: 'stats',
              title: 'Statistics',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'value',
                      title: 'Stat Value',
                      type: 'string',
                      validation: (rule) => rule.required(),
                      description: 'e.g., "+127%", "-68%", "89+"'
                    },
                    {
                      name: 'label',
                      title: 'Stat Label',
                      type: 'string',
                      validation: (rule) => rule.required(),
                      description: 'e.g., "Conversion", "Return", "Engagement"'
                    }
                  ],
                  preview: {
                    select: {
                      title: 'value',
                      subtitle: 'label'
                    }
                  }
                }
              ],
              validation: (rule) => rule.custom((value, context) => {
                if (context.parent?.comingSoon) return true
                if (!value || value.length < 3) return 'At least 3 stats required'
                if (value.length > 4) return 'No more than 4 stats allowed'
                return true
              })
            },
            {
              name: 'comingSoon',
              title: 'Coming Soon',
              type: 'boolean',
              description: 'Mark this industry as coming soon (not yet available)',
              initialValue: false
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'label',
              media: 'image'
            }
          }
        }
      ],
      validation: (rule) => rule.required().min(2)
    })
  ],
  preview: {
    select: {
      title: 'heading'
    },
    prepare({ title }) {
      return {
        title: title || 'Industry Solutions Section',
        subtitle: 'Industry Solutions'
      }
    }
  }
})
