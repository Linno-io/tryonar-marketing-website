import { SanityImage } from "./siteSettings"

export interface Section {
  _type: string
  [key: string]: any
}

export interface Button {
  text: string
  internalLink?: string
  externalLink?: string
  showIcon?: boolean
}

export interface HeroSection extends Section {
  _type: 'heroSectionType'
  title: SectionTitle[]
  description: string
  sectionImage: SanityImage
  tags?: string[]
  customContainer?: boolean
  primaryButton: Button
  secondaryButton: Button
}

export interface LandingHeroSection extends Section {
  _type: 'landingHeroSectionType'
  title: SectionTitle[]
  description: SectionTitle[]
  sectionImage: SanityImage & {
    imageTitle?: string
    imageDescription?: string
  }
  tag?: string
  primaryButton: Button & {
    trustText?: string
  }
}

export interface FeaturesSection extends Section {
  _type: 'featuresSection'
  title: string
  features: { icon: { asset: { url: string } }; title: string; description: string }[]
}

export interface RealitySection extends Section {
  _type: 'realitySectionType'
  _key: string
  eyebrow: string
  heading: string
  subtext: string
  tabs?: {
    id: string
    title: string
    subtitle: string
    icon: {
      asset: {
        _ref: string
        url?: string
      }
    }
    impact: {
      revenue: string
      satisfaction: string
      costs: string
    }
    detailsTitle: string
    detailsDescription: string
    detailsSubtitle?: string
    detailsList: string[]
  }[]
}

export interface CTASection extends Section {
  _type: 'ctaSectionType'
  _key: string
  title: string
  description: string
  highlightText?: string
  stats?: {
    label: string
    type: 'support' | 'security' | 'trial'
  }[]
  primaryButton: Button
  secondaryButton:Button
}

export interface ResourceSection extends Section {
  _type: 'resourceSectionType'
  _key: string
  divider: boolean
  title: string
  highlightText: string
  resources: {
    title: string
    description: string
    icon: {
      url: string
      alt?: string
    }
    link: string
  }[],
  description: string
  sectionImage: {
    url: string
    alt?: string
  }
}

interface SectionTitle {
  text: string
  type: 'highlight' | 'normal'
}
export interface SuccessStoriesSection extends Section {
  _type: 'successStoriesSectionType'
  _key: string,
  title: SectionTitle[],
  description: string,
  stories: {
    rating: number,
    review: string,
    authorPosition: string,
    authorName: string,
    authorImage: SanityImage
  }[]
}

export interface MagicSection extends Section {
  _type: 'magicSectionType'
  _key: string,
  title: SectionTitle[],
  description: string,
  additionalLink?: {
    hasAdditionalLink: boolean,
    text: string,
    url: string
  }
  statistics: {
    title: string,
    description: string,
    value: string
  }[]
}

export interface FAQSection extends Section {
  _type: 'faqSectionType'
  _key: string,
  title: SectionTitle[],
  description?: string,
  faq: {
    _key: string,
    question: string,
    answer: string,
  }[]
}

export interface IndustrySolutionsSection extends Section {
  _type: 'industrySolutionsSectionType'
  _key: string
  tagline: string
  title: SectionTitle[]
  description: string
  tabs: {
    _key: string
    comingSoon: boolean
    tabLabel: string
    tabContent: {
      image?: SanityImage
      contentTitle?: string
      contentDescription?: string
      features?: {
        featureTitle: string
        icon: SanityImage
      }[]
      stats: {
        label: string
        value: string
      }[]
      primaryButton?: Button
      secondaryButton?: Button
    }
  }[]
  showStatsOnBottom: boolean
  primaryButton?: Button
  secondaryButton?: Button
}

export interface WorkflowSection extends Section {
  _type: 'workFlowSectionType'
  _key: string
  title: SectionTitle[]
  description: string
  steps: {
    _key: string
    stepTitle: SectionTitle[]
    stepDescription: string
    image: SanityImage
    tags?: string[]
  }[]
  primaryButton: Button
  secondaryButton: Button
}

export interface CardsSection extends Section {
  _type: 'cardsSectionType'
  _key: string
  title: SectionTitle[]
  showDivider: boolean
  description: string
  cards: {
    _key: string
    cardTitle: string
    description: string
    image: SanityImage
    tags?: string[]
  }[]
  primaryButton: Button
  secondaryButton: Button
}

export interface TrustCardSection extends Section {
  _type: 'trustCardSectionType'
  _key: string
  title: SectionTitle[]
  description: string
  cards: {
    _key: string
    cardTitle: string
    description: string
    image: SanityImage
    tags?: string[]
  }[]
  primaryButton: Button
}

export interface ComparisonSection extends Section {
  _type: 'comparisonSectionType'
  _key: string
  title: SectionTitle[]
  description: string
  traditionalAR: {
    title: string
    features: string[]
  }
  tryOnAR: {
    title: string
    features: string[]
  }
  basicWebAR: {
    title: string
    features: string[]
  }
  primaryButton: Button
}

export interface EcommerceChallengeSection extends Section {
  _type: 'ecommerceChallengeType'
  _key: string
  tagline: string
  title: SectionTitle[]
  description: string
  tabs: {
    _key: string
    tabId: string
    tabLabel: string
    title: string
    value: string
    contentDescription?: string
    features: string[]
    image?: SanityImage
  }[]
}

export interface ReadyToSolveSection extends Section {
  _type: 'readyToSolveSectionType'
  _key: string
  title: SectionTitle[]
  description: string
  sectionImage: SanityImage
  primaryButton: Button
  secondaryButton: Button
}

export interface ExperienceSection extends Section {
  _type: 'experienceSectionType'
  _key: string
  title: SectionTitle[]
  features: {
    _key: string
    title: string
    description: string
  }[]
  sectionImage: SanityImage
}

export interface JourneySection extends Section {
  _type: 'journeySectionType'
  _key: string
  title: SectionTitle[]
  description: string
  steps: {
    _key: string
    title: string
    description: string
    subtext: string
  }[]
  primaryButton: Button
}

export interface TextHeroSection extends Section {
  _type: 'textHeroSectionType'
  _key: string
  title: SectionTitle[]
  description: string
}

export interface VirtualTryonSection extends Section {
  _type: 'virtualTryonSectionType'
  _key: string
  title: SectionTitle[]
  description: string
  sectionImage: SanityImage
  primaryButton: Button
}

export interface GallerySection extends Section {
  _type: 'gallerySectionType'
  _key: string
  stats: {
    _key: string
    label: string
    value: string
  }[]
  primaryButton: Button
  images: SanityImage[]
}

export interface PricingCard {
  _key: string
  isPopular: boolean
  heading: string
  description: string
  price?: number
  duration?: string
  inCludedFeatures: string[]
  usageLimits?: string[]
  customPricingText?: string
  primaryButton: Button,
  usageLimitsSectionTitle?: string
  featuresSectionTitle?: string
}

export interface PricingTableSection extends Section {
  _type: 'pricingTableSectionType'
  _key: string
  vatInfo: string
  stats: {
    _key: string
    label: string
    type: string
  }[]
  tabs: {
    _key: string
    tabLabel: string
    cards: PricingCard[]
  }[]
}

export interface SingleReviewSection extends Section {
  _type: 'singleReviewSectionType'
  _key: string
  rating: number
  review: SectionTitle[]
  author: {
    name: string
    position: string
    image: SanityImage
  }
}

export interface PricingTable {
  heading: string
  plans: {
    _key: string
    primaryButton: Button
    price?: string
    isPrimary?: boolean
    badge?: string
    title: string
  }[]
  features: {
    _key: string
    label: string
    values: {
      _key: string
      type: 'check' | 'cross' | 'text'
      text?: string
    }[]
  }[]
}
export interface CompareSection extends Section {
  _type: 'compareSectionType'
  _key: string
  title: SectionTitle[]
  description: string
  pricingTable: PricingTable
}


export interface CaseStudiesSection extends Section {
  _type: 'caseStudiesSectionType'
  _key: string
  showDivider: boolean
  title?: SectionTitle[]
  description?: string
  caseStudies: {
    _key: string
    companyName: string
    summary: string
    metrics: {
      _key: string
      value: string
      label: string
    }[]
  }[]
  primaryButton?: Button
  secondaryButton?: Button
}

