import { client } from './client'
import { SiteSettings } from '../types/siteSettings'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings"][0]{
    "logo": {
      "url": logo.asset->url,
      "alt": logo.alt
    },
    "favicon": favicon.asset->url,
    headerMenu[]{
      label,
      link,
      "internalLink": internalLink->{
        _type,
        _id,
        "slug": slug.current
      }
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
    copyrightText,
    socialLinks[]{
      platform,
      url
    }
  }`
  
  return client.fetch(query)
}
