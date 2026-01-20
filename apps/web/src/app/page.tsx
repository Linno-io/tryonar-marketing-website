export const revalidate = 60
import PageRenderer from '@/components/PageRenderer'
import { getPageBySlug } from '@/lib/sanity/client'
import { Metadata } from 'next'

interface PageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const page = await getPageBySlug(slug ?? 'home')

    if (!page) {
        return {
            title: 'TryOn AR - AR for Everyone, Not Just Tech Giants',
            description: 'Transform your e-commerce store with 3-tap AR integration. Let customers try before they buy, reduce returns by 64%, and boost conversions by 94% with our no-code AR solution.',
        }
    }

    const { seo } = page

    return {
        title: seo?.metaTitle || page.title || 'TryOn AR - AR for Everyone, Not Just Tech Giants',
        description: seo?.metaDescription || 'Transform your e-commerce store with 3-tap AR integration. Let customers try before they buy, reduce returns by 64%, and boost conversions by 94% with our no-code AR solution.',
        alternates: {
            canonical: seo?.canonicalUrl,
        },
        openGraph: {
            title: seo?.ogTitle || seo?.metaTitle || page.title,
            description: seo?.ogDescription || seo?.metaDescription,
            images: seo?.ogImage?.asset?.url ? [{ url: seo.ogImage.asset.url }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: seo?.ogTitle || seo?.metaTitle || page.title,
            description: seo?.ogDescription || seo?.metaDescription,
            images: seo?.ogImage?.asset?.url ? [seo.ogImage.asset.url] : [],
        },
    }
}


export default async function HomePage() {
  const page = await getPageBySlug('home')

  return <PageRenderer page={page} home={true}/>
}
