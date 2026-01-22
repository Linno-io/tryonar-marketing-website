'use client'

import { 
    HeroSection as HeroSectionProps, 
    RealitySection as RealitySectionProps, 
    CTASection as CTASectionProps, 
    SuccessStoriesSection as SuccessStoriesSectionProps, 
    IndustrySolutionsSection as IndustrySolutionsSectionProps, 
    ResourceSection as ResourceSectionProps,
    MagicSection as MagicSectionProps,
    FAQSection as FAQSectionProps,
    WorkflowSection as WorkflowSectionProps,
    CardsSection as CardsSectionProps,
    TrustCardSection as TrustCardSectionProps,
    ComparisonSection as ComparisonSectionProps,
    EcommerceChallengeSection as EcommerceChallengeSectionProps,
    ReadyToSolveSection as ReadyToSolveSectionProps,
    ExperienceSection as ExperienceSectionProps,
    JourneySection as JourneySectionProps,
    VirtualTryonSection as VirtualTryonSectionProps,
    GallerySection as GallerySectionProps,
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
import WorkflowSection from './sections/WorkflowSection';
import CardsSection from './sections/CardsSection';
import TrustCardSection from './sections/TrustCardSection';
import ComparisonSection from './sections/ComparisonSection';

interface PageRenderedProps {
    page: Page
    home?: boolean
}

export default function PageRenderer({page, home}: PageRenderedProps) {
    const {
        sections = []
    } = page

    if(!sections || sections.length === 0) {
        return null;
    }

    return (
        <>
            <main className={`${page?.slug?.current}-page-container`}>
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
                                return <HeroSection key={section._key} data={section as HeroSectionProps} />;
                            case 'industrySolutionsSectionType':
                               return <IndustrySolutionsSection key={section._key} data={section as IndustrySolutionsSectionProps} />;
                            case 'workFlowSectionType':
                               return <WorkflowSection key={section._key} data={section as WorkflowSectionProps} />;
                            case 'cardsSectionType':
                               return <CardsSection key={section._key} data={section as CardsSectionProps} />;
                            case 'trustCardSectionType':
                               return <TrustCardSection key={section._key} data={section as TrustCardSectionProps} />;
                            case 'comparisonSectionType':
                               return <ComparisonSection key={section._key} data={section as ComparisonSectionProps} />;
                            case 'ecommerceChallengeType':
                               return <EcommerceChallenge key={section._key} data={section as EcommerceChallengeSectionProps} />;
                            case 'readyToSolveSectionType':
                               return <ReadyToSolveSection key={section._key} data={section as ReadyToSolveSectionProps} />;
                            case 'experienceSectionType':
                               return <ExperienceSection key={section._key} data={section as ExperienceSectionProps} />;
                            case 'journeySectionType':
                               return <JourneySection key={section._key} data={section as JourneySectionProps} />;
                            case 'virtualTryonSectionType':
                               return <VirtualTryOnSection key={section._key} data={section as VirtualTryonSectionProps} />;
                            case 'gallerySectionType':
                               return <GallerySection key={section._key} data={section as GallerySectionProps} />;
                            default:
                                return null;
                        }
                    })
                }
            </main>
        </>
    )
}
