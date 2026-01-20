"use client";
import CTASection from '@/components/sections/CTASection';
import HeroSection from '@/components/sections/HeroSection';
import { memo } from 'react';
import { HeroSection as HeroSectionProps, RealitySection as RealitySectionProps, CTASection as CTASectionProps, SuccessStoriesSection as SuccessStoriesSectionProps, IndustrySolutionsSection as IndustrySolutionsSectionProps } from '@/lib/types/section'


const page = () => {
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
            <HeroSection />
            <CTASection data={ctaData as CTASectionProps} />
        </>
    );
};

export default memo(page);