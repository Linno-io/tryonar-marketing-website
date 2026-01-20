import { client } from './client'
import { SiteSettings } from '../types/siteSettings'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings"][0]{
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
  
  return client.fetch(query)
}
