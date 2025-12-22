// schemas/page.js
import { defineType, defineField } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ 
      name: 'slug', 
      title: 'Slug', 
      type: 'slug', 
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'parent',
      title: 'Parent Page',
      type: 'reference',
      to: [{ type: 'page' }],
    })
  ]
})
