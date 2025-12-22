import { Section } from './section'
import { Seo } from './seo'

export interface Page {
  title: string
  slug: { current: string }
  sections: Section[]
  seo: Seo
}