import { createClient } from "next-sanity";
import { createImageUrlBuilder } from '@sanity/image-url'
import type { Locale } from '@/lib/i18n/config'
import { localizeLinks } from '@/lib/i18n/links'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "90a20xmm",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
    useCdn: false,
});

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source)
}

// Pages without a slug can't be routed, so they're skipped rather than failing the build.
export async function getAllPageSlugs(): Promise<string[]> {
    const query = `array::unique(*[_type == "page" && defined(slug.current)].slug.current)`
    return client.fetch(query, {}, { next: { revalidate: 60 } })
}

// Prefers the page written in `lang` and falls back to the English one, so
// untranslated pages still render. `language` tells the caller which it got.
// Documents created before translations existed have no language and count as English.
export async function getPageBySlug(slug: string, lang: Locale) {
    const query = `coalesce(
        *[_type == "page" && slug.current == $slug && language == $lang][0],
        *[_type == "page" && slug.current == $slug && coalesce(language, "en") == "en"][0]
    ){
    title,
    slug,
    "language": coalesce(language, "en"),
    "availableLanguages": array::unique(*[_type == "page" && slug.current == $slug]{"l": coalesce(language, "en")}.l),
    sections[]{
        ...,
         _type,
        _key,
        author{
            ...,
            "image": {
                "url": image.asset->url,
                "alt": image.alt
            }
        },
        pricingTable{
            ...,
            plans[]{
                ...,
                primaryButton{
                    ...,
                    "internalLink": internalLink->slug.current,
                }
            }
        },
        primaryButton{
            ...,
            "internalLink": internalLink->slug.current,
        },
        secondaryButton{
            ...,
            "internalLink": internalLink->slug.current
        },
        sectionImage{
            ...,
            "url": asset->url,
            "alt": alt,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
        },
        posterImage{
            ...,
            "url": asset->url,
            "alt": alt,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
        },
        frameImage{
            "url": asset->url,
            "alt": alt,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
        },
        sectionVideo{
            ...,
            "url": asset->url,
        },
        resources[]{
            ...,
            "icon": {
                "url": icon.asset->url,
                "alt": icon.alt
            },
            "link": coalesce(link.internalLink->slug.current,
                    link.externalLink
                )
        },
        steps[]{
            ...,
            "image":{
                "url": image.asset->url,
                "alt": image.alt
            },
            "video":{
                "url": video.asset->url
            },
        },
        avatars[]{
            ...,
            "url": asset->url,
            "alt": alt
        },
        items[]{
            ...,
            "sectionImage":{
                "url": sectionImage.asset->url,
                "alt": sectionImage.alt
            }
        },
        cards[]{
            ...,
            "image":{
                "url": image.asset->url,
                "alt": image.alt
            },
            "icon":{
                "url": icon.asset->url,
                "alt": icon.alt
            },
            "video":{
                "url": video.asset->url
            },
            "extraImage":{
                "url": extraImage.asset->url,
                "alt": extraImage.alt
            },
        },
        stats[]{
            ...,
            type,
            label
        },
        stories[]{
            ...,
            "authorImage": {
                "url": authorImage.asset->url,
                "alt": authorImage.alt
            }
        },
        additionalLink{
            ...,
            "url": coalesce(url.internalLink->slug.current,
                    url.externalLink
                )
        },
        images[]{
            "url": asset->url,
            "alt": alt,
            "video": video.asset->url
        },
        tabs[]{
            ...,
            "image":{
                "url": image.asset->url,
                "alt": image.alt
            },
            "tabContent": tabContent{
                ...,
                "image":{
                    "url": image.asset->url,
                    "alt": image.alt
                },
                "video": { "url": video.asset->url },
                features[]{
                    ...,
                    "icon":{
                        "url": icon.asset->url,
                        "alt": icon.alt
                    }
                },
                primaryButton{
                    ...,
                    "internalLink": internalLink->slug.current,
                },
                secondaryButton{
                    ...,
                    "internalLink": internalLink->slug.current
                },
            },
            products[]{
                ...,
                "image":{
                    "url": image.asset->url,
                    "alt": image.alt
                },
                "video": { "url": video.asset->url },
                features[]{
                    ...,
                    "icon":{
                        "url": icon.asset->url,
                        "alt": icon.alt
                    }
                },
                primaryButton{
                    ...,
                    "internalLink": internalLink->slug.current,
                },
                secondaryButton{
                    ...,
                    "internalLink": internalLink->slug.current
                },
            },
            cards[]{
                ...,
                primaryButton{
                    ...,
                    "internalLink": internalLink->slug.current,
                },

            }
        },
    },
    seo{
      metaTitle,
      metaDescription,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage{
        asset->{
          url
        }
      }
    }
  }`
    const page = await client.fetch(query, { slug, lang }, { next: { revalidate: 60 } })
    return page ? localizeLinks(page, lang) : null
}