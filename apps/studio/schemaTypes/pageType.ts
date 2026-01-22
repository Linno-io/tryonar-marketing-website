import { defineType, defineField } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'heroSectionType' },
        { type: 'realitySectionType' },
        { type: 'ctaSectionType' },
        { type: 'successStoriesSectionType' },
        { type: 'industrySolutionsSectionType' },
        { type: 'resourceSectionType' },
        { type: 'magicSectionType' },
        { type: 'faqSectionType' },
        { type: 'workFlowSectionType' },
        { type: 'cardsSectionType' },
        { type: 'trustCardSectionType' },
        { type: 'comparisonSectionType' },
        { type: 'ecommerceChallengeType' },
        { type: 'readyToSolveSectionType' },
        { type: 'experienceSectionType' },
        { type: 'journeySectionType' },
      ]
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({
      name: 'parent',
      title: 'Parent Page',
      type: 'reference',
      to: [{ type: 'page' }],
    })
  ]
})