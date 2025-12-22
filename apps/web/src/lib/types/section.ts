export interface Section {
  _type: string
  [key: string]: any
}

export interface HeroSection extends Section {
  _type: 'heroSectionType'
  headline: string
  subText: string
  ctaButtonText?: string
  ctaButtonLink?: string
  backgroundImage?: { asset: { url: string } }
}

export interface FeaturesSection extends Section {
  _type: 'featuresSection'
  title: string
  features: { icon: { asset: { url: string } }; title: string; description: string }[]
}