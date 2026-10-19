import { client } from './client'
import { SiteSettings } from '../types/siteSettings'
import type { Locale } from '@/lib/i18n/config'
import { localizeLinks } from '@/lib/i18n/links'

// Same fallback rule as pages: the translated settings if published, else English.
export async function getSiteSettings(lang: Locale): Promise<SiteSettings | null> {
  const query = `coalesce(
    *[_type == "siteSettings" && language == $lang][0],
    *[_type == "siteSettings" && coalesce(language, "en") == "en"][0]
  ){
    siteTitle,
    siteDescription,
    "logo": {
      "url": logo.asset->url,
      "alt": logo.alt
    },
    "favicon": {
      "url": favicon.asset->url,
      "alt": favicon.alt
    },
    headerMenu[]{
      label,
      link,
      "internalLink": internalLink->{
        _type,
        _id,
        "slug": slug.current
      }
    },
    signinInfo{
      enabled,
      label,
      externalLink,
      "internalSlug": internalLink->slug.current,
    },
    footerMenus[]{
      title,
      items[]{
        label,
        link,
        "internalLink": internalLink->{
          _type,
          _id,
          "slug": slug.current
        }
      }
    },
    "footerLogo": {
      "url": footerLogo.asset->url,
      "alt": footerLogo.alt
    },
    copyrightText,
    contactInfo{
      label,
      externalLink,
      "internalSlug": internalLink->slug.current,
    },
    socialLinks[]{
      platform,
      url
    }
  }`
  
  const settings: SiteSettings | null = await client.fetch(query, { lang }, { next: { revalidate: 60 } })
  return settings ? localizeLinks(settings, lang) : null
}
