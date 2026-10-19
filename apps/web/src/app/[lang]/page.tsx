export const revalidate = 60
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import PageRenderer from '@/components/PageRenderer'
import { getPageBySlug } from '@/lib/sanity/client'
import { isLocale } from '@/lib/i18n/config'
import { buildPageMetadata } from '@/lib/i18n/metadata'

interface PageProps {
    params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params
    if (!isLocale(lang)) return {}
    return buildPageMetadata(await getPageBySlug('home', lang), 'home', lang)
}

export default async function HomePage({ params }: PageProps) {
    const { lang } = await params
    if (!isLocale(lang)) return notFound()

    const page = await getPageBySlug('home', lang)
    if (!page) return notFound()

    return <PageRenderer page={page} home={true}/>
}
