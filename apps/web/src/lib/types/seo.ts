export interface Seo {
  metaTitle: string
  metaDescription: string
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: { asset: { url: string } }
}