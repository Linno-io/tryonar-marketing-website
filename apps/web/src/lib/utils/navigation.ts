import { MenuItem } from '../types/siteSettings'
import type { Locale } from '../i18n/config'
import { localizeHref } from '../i18n/links'

export function getMenuItemUrl(item: MenuItem, locale: Locale): string {
  if (item.internalLink?.slug) {
    return localizeHref(item.internalLink.slug, locale)
  }
  return item.link || '#'
}
