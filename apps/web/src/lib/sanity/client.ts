import { createClient } from "next-sanity";
import { createImageUrlBuilder } from '@sanity/image-url'

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

export async function getAllPages() {
    const query = `*[_type == "page"]{title, slug}`
    return client.fetch(query, {}, { next: { revalidate: 60 } })
}

export async function getPageBySlug(slug: string) {
    const query = `*[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    sections[]{
        ...,
         _type,
        _key,
        primaryButton{
            ...,
            "internalLink": internalLink->slug.current,
        },
        secondaryButton{
            ...,
            "internalLink": internalLink->slug.current
        },
        sectionImage{
            "url": asset->url,
            "alt": alt
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
            }
        },
        cards[]{
            ...,
            "image":{
                "url": image.asset->url,
                "alt": image.alt
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
            "alt": alt
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
    return client.fetch(query, { slug }, { next: { revalidate: 60 } })
}