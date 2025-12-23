export const revalidate = 60
import { notFound } from 'next/navigation'
import PageRenderer from '@/components/PageRenderer'
import { getAllPages, getPageBySlug } from '@/lib/sanity/client'
import type { Page as PageType } from '@/lib/types/page'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  try {
    const pages = await getAllPages()
    return pages.map((p: PageType) => ({
      slug: p.slug.current,
    }))
  } catch {
    return []
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  
  if (!page) {
    return notFound()
  }

  return <PageRenderer sections={page.sections || []} />
}
