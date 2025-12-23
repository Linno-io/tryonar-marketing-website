import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: "tlwbga8t",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getAllPages() {
  const query = `*[_type == "page"]{title, slug}`
  return client.fetch(query)
}

export async function getPageBySlug(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    sections,
    seo
  }`
  return client.fetch(query, { slug })
}