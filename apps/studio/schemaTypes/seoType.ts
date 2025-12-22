import {defineType, defineField} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', validation: Rule => Rule.required().max(160) }),
    defineField({ name: 'ogTitle', title: 'OG Title', type: 'string' }),
    defineField({ name: 'ogDescription', title: 'OG Description', type: 'text' }),
    defineField({ name: 'ogImage', title: 'OG Image', type: 'image' }),
    defineField({ name: 'canonicalUrl', title: 'Canonical URL', type: 'url' })
  ]
})
