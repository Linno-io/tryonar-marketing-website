import PageRenderer from '@/components/PageRenderer'
import { getPageBySlug } from '@/lib/sanity/client'

export default async function HomePage() {
  const page = await getPageBySlug('home')
  
  return <PageRenderer sections={page?.sections || []} />
}
