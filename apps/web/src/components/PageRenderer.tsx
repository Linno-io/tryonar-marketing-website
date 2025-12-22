'use client'

import { HeroSection as HeroSectionProps } from '@/lib/types/section'
import HeroSection from './sections/HeroSection'

interface Props {
  sections: HeroSectionProps[]
}

export default function PageRenderer({ sections }: Props) {
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'heroSectionType':
            return <HeroSection key={section._key} data={section} />
          default:
            return null
        }
      })}
    </>
  )
}
