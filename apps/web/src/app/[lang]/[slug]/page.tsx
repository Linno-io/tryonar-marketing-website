export const revalidate = 60
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import PageRenderer from '@/components/PageRenderer'
import { getAllPageSlugs, getPageBySlug } from '@/lib/sanity/client'
import { isLocale } from '@/lib/i18n/config'
import { buildPageMetadata } from '@/lib/i18n/metadata'

interface PageProps {
    params: Promise<{ lang: string; slug: string }>
}

// Every language gets every slug: untranslated pages fall back to English content.
export async function generateStaticParams() {
    try {
        const slugs = await getAllPageSlugs()
        return slugs.map((slug) => ({ slug }))
    } catch {
        return []
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang, slug } = await params
    if (!isLocale(lang)) return {}
    return buildPageMetadata(await getPageBySlug(slug, lang), slug, lang)
}

export default async function Page({ params }: PageProps) {
    const { lang, slug } = await params
    if (!isLocale(lang)) {
        return notFound()
    }

    const page = await getPageBySlug(slug, lang)

    if (!page) {
        return notFound()
    }

    return <PageRenderer page={page}/>
}
