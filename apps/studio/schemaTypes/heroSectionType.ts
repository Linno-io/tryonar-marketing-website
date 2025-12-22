import { defineType, defineField } from 'sanity'

export const heroSectionType = defineType({
  name: 'heroSectionType',
  title: 'Hero Section',
  type: 'object',
  fields: [
    { name: 'headline', title: 'Headline', type: 'string' },
    { name: 'subText', title: 'Sub Text', type: 'text' },
    { name: 'ctaButtonText', title: 'CTA Button Text', type: 'string' },
    { name: 'ctaButtonLink', title: 'CTA Button Link', type: 'url' },
    { name: 'backgroundImage', title: 'Background Image', type: 'image' }
  ]
})
