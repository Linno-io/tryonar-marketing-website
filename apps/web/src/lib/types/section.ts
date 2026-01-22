import { SanityImage } from "./siteSettings"

export interface Section {
  _type: string
  [key: string]: any
}

export interface HeroSection extends Section {
  _type: 'heroSectionType'
  title: SectionTitle[]
  description: string
  sectionImage: SanityImage
  tags?: string[]
  customContainer?: boolean
  primaryButton: {
    text: string
    internalLink?: string
    externalLink?: string
    showIcon?: boolean
  }
  secondaryButton: {
    text: string
    internalLink?: string
    externalLink?: string
    showIcon?: boolean
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
  primaryButton: {
    text: string
    internalLink?: string
    externalLink?: string
    showIcon?: boolean
  }
  secondaryButton: {
    text: string
    internalLink?: string
    externalLink?: string
    showIcon?: boolean
  }
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
      primaryButton?: {
        text: string
        internalLink?: string
        externalLink?: string
        showIcon?: boolean
      }
      secondaryButton?: {
        text: string
        internalLink?: string
        externalLink?: string
        showIcon?: boolean
      }
    }
  }[]
  showStatsOnBottom: boolean
  primaryButton?: {
    text: string
    internalLink?: string
    externalLink?: string
    showIcon?: boolean
  }
  secondaryButton?: {
    text: string
    internalLink?: string
    externalLink?: string
    showIcon?: boolean
  }
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
  primaryButton: {
    text: string
    internalLink?: string
    externalLink?: string
    showIcon?: boolean
  }
  secondaryButton: {
    text: string
    internalLink?: string
    externalLink?: string
    showIcon?: boolean
  }
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
  primaryButton: {
    text: string
    internalLink?: string
    externalLink?: string
    showIcon?: boolean
  }
  secondaryButton: {
    text: string
    internalLink?: string
    externalLink?: string
    showIcon?: boolean
  }
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
  primaryButton: {
    text: string
    internalLink?: string
    externalLink?: string
    showIcon?: boolean
  }
}
