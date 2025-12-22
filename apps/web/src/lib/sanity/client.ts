import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "tlwbga8t",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});


export async function getAllPages() {
  const query = `*[_type == "page"]{title, slug}`
  return client.fetch(query)
}

export async function getPageBySlug(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    sections[]{
      ..., 
      _type == "heroSection" => {...},
      _type == "featuresSection" => {...}
    },
    seo
  }`
  return client.fetch(query, { slug })
}