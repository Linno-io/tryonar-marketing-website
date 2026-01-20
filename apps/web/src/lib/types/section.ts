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
  }
  secondaryButton: {
    text: string
    internalLink?: string
    externalLink?: string
  }
}export interface SuccessStoriesSection extends Section {
  _type: 'successStoriesSectionType'
  _key: string
  eyebrow: string
  heading: string
  description: string
  stats: {
    label: string
    sublabel: string
    icon: 'store' | 'target' | 'trending-up' | 'refresh'
  }[]
  stories: {
    industry: string
    quote: string
    author: string
    role: string
    avatar: {
      asset: {
        _ref: string
        url?: string
      }
    }
    metrics: {
      conversion: string
      return: string
      satisfaction: string
    }
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
