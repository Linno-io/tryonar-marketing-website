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

export type SocialPlatform = 'Facebook' | 'Instagram' | 'Twitter' | 'LinkedIn' | 'YouTube'

export interface SocialLink {
  platform: SocialPlatform
  url: string
}

export interface SiteSettings {
  logo: SanityImage
  favicon?: SanityImage
  headerMenu: MenuItem[]
  footerMenus: FooterMenu[]
  copyrightText: string
  socialLinks: SocialLink[]
}
