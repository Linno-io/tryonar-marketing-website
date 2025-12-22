export interface Seo {
  metaTitle: string
  metaDescription: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: { asset: { url: string } }
}