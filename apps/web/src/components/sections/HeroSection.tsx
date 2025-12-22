import { HeroSection as HeroSectionType } from '@/lib/types/section'
import { Container, Heading, Text, Button } from '@/components/ui'

interface HeroSectionProps {
  data: HeroSectionType
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${data.backgroundImage?.asset.url})` }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <Container className="relative z-10 text-center text-white">
        <Heading level={1} className="mb-4">
          {data.headline}
        </Heading>
        <Text variant="lead" className="mb-8 text-white/90">
          {data.subText}
        </Text>
        {data.ctaButtonText && (
          <Button href={data.ctaButtonLink} variant="primary" size="lg">
            {data.ctaButtonText}
          </Button>
        )}
      </Container>
    </section>
  )
}