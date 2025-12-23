'use client'

import { HeroSection as HeroSectionProps, RealitySection as RealitySectionProps, CTASection as CTASectionProps, SuccessStoriesSection as SuccessStoriesSectionProps, IndustrySolutionsSection as IndustrySolutionsSectionProps } from '@/lib/types/section'
import HeroSection from './sections/HeroSection'
import RealityCheckSection from './sections/RealityCheckSection'
import CTASection from './sections/CTASection'
import SuccessStoriesSection from './sections/SuccessStoriesSection'
import IndustrySolutionsSection from './sections/IndustrySolutionsSection'
import Navigation from './Navigation'
import Footer from './Footer'

interface Props {
  sections: (HeroSectionProps | RealitySectionProps | CTASectionProps | SuccessStoriesSectionProps | IndustrySolutionsSectionProps)[]
}

export default function PageRenderer({ sections }: Props) {
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'heroSectionType':
            return <HeroSection key={section._key} data={section as HeroSectionProps} />
          case 'realitySectionType':
            return <RealityCheckSection key={section._key} data={section as RealitySectionProps} />
          case 'ctaSectionType':
            return <CTASection key={section._key} data={section as CTASectionProps} />
          case 'successStoriesSectionType':
            return <SuccessStoriesSection key={section._key} data={section as SuccessStoriesSectionProps} />
          case 'industrySolutionsSectionType':
            return <IndustrySolutionsSection key={section._key} data={section as IndustrySolutionsSectionProps} />
          default:
            return null
        }
      })}
    </>
  )
}
