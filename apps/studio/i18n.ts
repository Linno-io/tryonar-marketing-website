import {defineField, type SlugValidationContext} from 'sanity'

// Keep in sync with LOCALES in apps/web/src/lib/i18n/config.ts.
export const SUPPORTED_LANGUAGES = [
  {id: 'en', title: 'English'},
  {id: 'fr', title: 'French'},
  {id: 'es', title: 'Spanish'},
  {id: 'nl', title: 'Dutch'},
]

export const TRANSLATED_SCHEMA_TYPES = ['page', 'siteSettings']

// Written by the plugin's Translations menu. Documents created before
// translations existed have no value; the website treats those as English.
export const languageField = defineField({
  name: 'language',
  title: 'Language',
  type: 'string',
  options: {list: SUPPORTED_LANGUAGES.map(({id, title}) => ({title, value: id}))},
  readOnly: ({value}) => Boolean(value),
})

/**
 * Slugs only need to be unique within a language, so /pricing and /fr/pricing
 * can share the slug "pricing" — which is what the website's routing expects.
 */
export async function isUniqueSlugPerLanguage(
  slug: string,
  context: SlugValidationContext,
): Promise<boolean> {
  const {document, getClient} = context
  if (!document) return true

  const id = document._id.replace(/^drafts\./, '')
  const language = typeof document.language === 'string' ? document.language : 'en'
  const query = `!defined(*[
    _type == $type &&
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    coalesce(language, "en") == $language
  ][0]._id)`

  return getClient({apiVersion: '2024-01-01'}).fetch(query, {
    type: document._type,
    draft: `drafts.${id}`,
    published: id,
    slug,
    language,
  })
}
