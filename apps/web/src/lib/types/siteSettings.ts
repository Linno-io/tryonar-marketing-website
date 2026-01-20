export interface SanityImage {
  url: string
  alt?: string
}

export interface SanityReference {
  _type: 'reference'
  _ref: string
  slug?: string
}

export interface MenuItem {
  label: string
  link?: string
  internalLink?: SanityReference
}

export interface FooterMenu {
  title: string
  items: MenuItem[]
}

export type SocialPlatform = 'X' | 'LinkedIn' | 'YouTube'

export interface SocialLink {
  platform: SocialPlatform
  url: string
}

export interface SignInInfo {
  enabled: boolean
  label: string
  externalLink?: string
  internalSlug?: string
}

export interface ContactInfo {
  label: string
  externalLink?: string
  internalSlug?: string
}

export interface SiteSettings {
  siteTitle: string
  siteDescription: string
  logo: SanityImage
  favicon?: SanityImage
  headerMenu: MenuItem[]
  signinInfo: SignInInfo
  footerMenus: FooterMenu[]
  copyrightText: string
  socialLinks: SocialLink[]
  footerLogo: SanityImage
  contactInfo: ContactInfo
}
