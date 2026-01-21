import { SanityImage } from "./siteSettings"

export interface Section {
  _type: string
  [key: string]: any
}

export interface HeroSection extends Section {
  _type: 'heroSectionType'
  heading: string
  subtext: string
  trustBadges?: { text: string }[]
  primaryCta: {
    text: string
    link: string
  }
  secondaryCta: {
    text: string
    link: string
  }
  heroImage?: {
    asset: {
      _ref: string
      url?: string
    }
    alt?: string
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
  heading: string
  subheading: string
  industries: {
    id: {
      current: string
    }
    label: string
    title: string
    description: string
    image: {
      asset: {
        _ref: string
        url?: string
      }
    }
    roi: string
    features: {
      label: string
      icon: 'scan' | 'sparkles' | 'layoutPanel' | 'share'
    }[]
    stats: {
      value: string
      label: string
    }[]
    comingSoon?: boolean
  }[]
}
