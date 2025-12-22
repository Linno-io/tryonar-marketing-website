import PageRenderer from '@/components/PageRenderer'
import { getPageBySlug } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'

export default async function HomePage() {
  const page = await getPageBySlug('home')

  if (!page) return notFound()

  return <PageRenderer sections={page.sections} />
}
