'use client'

import { 
    HeroSection as HeroSectionProps, 
    RealitySection as RealitySectionProps, 
    CTASection as CTASectionProps, 
    SuccessStoriesSection as SuccessStoriesSectionProps, 
    IndustrySolutionsSection as IndustrySolutionsSectionProps, 
    ResourceSection as ResourceSectionProps,
    MagicSection as MagicSectionProps,
    FAQSection as FAQSectionProps
} from '@/lib/types/section';

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
import FAQAccordion from './sections/FAQSection'
import { Page } from '@/lib/types/page'
import ResourceSection from './sections/ResourceSection'
import MagicSection from './sections/MagicSection'

interface PageRenderedProps {
    page: Page
    home?: boolean
}

export default function PageRenderer({page, home}: PageRenderedProps) {
    const {
        sections = []
    } = page

console.log(page);
    // if(home) {
    //     console.log('Rendering home page with sections:', sections);
    //     return (
    //         <>
    //             <HeroSection data={sections[0] as HeroSectionProps} />
    //             <EcommerceChallenge />
    //             <ReadyToSolveSection />
    //             <ExperienceSection />
    //             <IndustrySolutionsSection />
    //             <JourneySection />
    //             <GallerySection />
    //             <TestimonialSection data={sections[2] as SuccessStoriesSectionProps} />
    //             <VirtualTryOnSection />
    //             <FAQAccordion />
    //             <CTASection data={sections[4] as CTASectionProps} />
    //         </>
    //     )
    // }

    if(!sections || sections.length === 0) {
        return null;
    }

    return (
        <>
            <div className={`${page?.slug?.current}-page-container`}>
                {
                    sections.map((section) => {
                        switch(section._type) {
                            case 'ctaSectionType':
                                return <CTASection key={section._key} data={section as CTASectionProps} />;
                            case "resourceSectionType":
                                return <ResourceSection key={section._key} data={section as ResourceSectionProps} />;
                             case "successStoriesSectionType":
                                return <TestimonialSection key={section._key} data={section as SuccessStoriesSectionProps} />;
                            case "magicSectionType":
                                return <MagicSection key={section._key} data={section as MagicSectionProps} />;
                            case "faqSectionType":
                                return <FAQAccordion key={section._key} data={section as FAQSectionProps} />;
                            case 'heroSectionType':
                                return <HeroSection key={section._key} data={section as HeroSectionProps} />
                            default:
                                return null;
                        }
                    })
                }
            </div>

            {/* {sections.map((section) => {
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
            })} */}
            {/* <EcommerceChallenge />
            <ReadyToSolveSection />
            <ExperienceSection />
            <IndustrySolutionsSection />
            <JourneySection />
            <GallerySection />
            <TestimonialSection />
            <VirtualTryOnSection />
            <FAQAccordion />
            <CTASection data={ctaData as CTASectionProps} /> */}
        </>
    )
}
