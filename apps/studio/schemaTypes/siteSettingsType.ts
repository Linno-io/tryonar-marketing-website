import {defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    {
      name: 'favicon',
      type: 'image',
      title: 'Favicon',
      description: 'Upload a favicon for your site (recommended: 32x32 PNG or ICO)',
      options: {
        hotspot: false,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Alternative text for the favicon (optional)',
        },
      ],
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Logo',
      validation: (rule) => rule.required(),
    },
    {
      name: 'headerMenu',
      type: 'array',
      title: 'Header Menu',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          title: 'Menu Item',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (rule) => rule.required(),
            },
            {
              name: 'link',
              type: 'string',
              title: 'External Link',
              description: 'External URL',
            },
            {
              name: 'internalLink',
              type: 'reference',
              title: 'Internal Link',
              to: [{type: 'page'}],
              description: 'Reference to an internal page',
            },
          ],
        },
      ],
    },
    {
      name: 'footerMenus',
      type: 'array',
      title: 'Footer Menus',
      of: [
        {
          type: 'object',
          name: 'footerMenu',
          title: 'Footer Menu',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (rule) => rule.required(),
            },
            {
              name: 'items',
              type: 'array',
              title: 'Menu Items',
              of: [
                {
                  type: 'object',
                  name: 'menuItem',
                  title: 'Menu Item',
                  fields: [
                    {
                      name: 'label',
                      type: 'string',
                      title: 'Label',
                      validation: (rule) => rule.required(),
                    },
                    {
                      name: 'link',
                      type: 'string',
                      title: 'External Link',
                      description: 'External URL',
                    },
                    {
                      name: 'internalLink',
                      type: 'reference',
                      title: 'Internal Link',
                      to: [{type: 'page'}],
                      description: 'Reference to an internal page',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'string',
      title: 'Copyright Text',
    },
    {
      name: 'socialLinks',
      type: 'array',
      title: 'Social Links',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: [
                  {title: 'Facebook', value: 'Facebook'},
                  {title: 'Instagram', value: 'Instagram'},
                  {title: 'Twitter', value: 'Twitter'},
                  {title: 'LinkedIn', value: 'LinkedIn'},
                  {title: 'YouTube', value: 'YouTube'},
                ],
              },
              validation: (rule) => rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    },
  ],
})
