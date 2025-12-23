import { MenuItem } from '../types/siteSettings'

export function getMenuItemUrl(item: MenuItem): string {
  if (item.internalLink?.slug) {
    return `/${item.internalLink.slug}`
  }
  return item.link || '#'
}
