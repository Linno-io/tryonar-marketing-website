'use client'

import { HeroSection as HeroSectionProps, RealitySection as RealitySectionProps, CTASection as CTASectionProps, SuccessStoriesSection as SuccessStoriesSectionProps, IndustrySolutionsSection as IndustrySolutionsSectionProps } from '@/lib/types/section'
import HeroSection from './sections/HeroSection'
import RealityCheckSection from './sections/RealityCheckSection'
import CTASection from './sections/CTASection'
import SuccessStoriesSection from './sections/SuccessStoriesSection'
import IndustrySolutionsSection from './sections/IndustrySolutionsSection'
import Navigation from './Navigation'
import Footer from './Footer'
import ReadyToSolveSection from './sections/ReadyToSolveSection'
import JourneySection from './sections/JourneySection'
import ExperienceSection from './sections/ExperienceSection'
import VirtualTryOnSection from './sections/VirtualTryonSection'
import GallerySection from './sections/GallerySection'
import { Container, DotBackground } from '@/components/ui'
import SolutionSection from './sections/SolutionSection'
import TestimonialSection from './sections/TestimonialSection'
import EcommerceChallenge from './sections/EcommerceChallenge'

interface Props {
  sections: (HeroSectionProps | RealitySectionProps | CTASectionProps | SuccessStoriesSectionProps | IndustrySolutionsSectionProps)[]
}

export default function PageRenderer({ sections }: Props) {
  const ctaData = {
    title: "Ready to scale your business?",
    description: "Join thousands of companies using our platform to streamline their workflow and increase productivity.",
    primaryButton: {
      text: "Get Started",
      link: "/signup"
    },
    secondaryButton: {
      text: "Watch Demo",
      link: "/demo"
    }
  }
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'heroSectionType':
            return <HeroSection key={section._key} data={section as HeroSectionProps} />
          // case 'realitySectionType':
          //   return <RealityCheckSection key={section._key} data={section as RealitySectionProps} />
          // case 'ctaSectionType':
          //   return <CTASection key={section._key} data={section as CTASectionProps} />
          // case 'successStoriesSectionType':
          //   return <SuccessStoriesSection key={section._key} data={section as SuccessStoriesSectionProps} />
          // case 'industrySolutionsSectionType':
          //   return <IndustrySolutionsSection key={section._key} data={section as IndustrySolutionsSectionProps} />
          default:
            return null
        }
      })} 
      {/* <EcommerceChallenge />
      <ReadyToSolveSection />
      <JourneySection />
      <IndustrySolutionsSection />
      <GallerySection />
      <TestimonialSection />
      <ExperienceSection />
      <VirtualTryOnSection />
      <CTASection data={ctaData as CTASectionProps} /> */}
      
    </>
  )
}
