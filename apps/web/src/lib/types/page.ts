import { Section } from './section'
import { Seo } from './seo'
import type { Locale } from '../i18n/config'

export interface Page {
  title: string
  slug: { current: string }
  /** Language of the content actually returned — English when the requested translation doesn't exist yet. */
  language: Locale
  /** Every language this slug has been published in. */
  availableLanguages: Locale[]
  sections: Section[]
  seo: Seo
}

export  interface PageProps {
    params: {
        slug: string
    }
}