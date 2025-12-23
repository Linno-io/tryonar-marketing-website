'use client'
import Container from '@/components/ui/Container'
import { Button, Heading, Text } from '@/components/ui'

export default function TransformStoreSection() {
  const benefits = [
    { text: 'Setup in under minutes', icon: '⚡' },
    { text: 'No credit card required', icon: '💳' },
    { text: '14 day free trial', icon: '📅' },
    { text: '24/7 support included', icon: '🛟' },
  ]

  return (
    <section className="py-20 lg:py-32 bg-[#9F3AED]">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <Heading level={1} className="text-white mb-6">
            Ready to transform your store with AR?
          </Heading>
          <Text className="text-xl text-white/90 mb-10">
            Join 10,000+ successful e-commerce stores already using TryOnAR to boost conversions and
            reduce returns.
          </Text>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {benefits.map((benefit) => (
              <div
                key={benefit.text}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <div className="text-3xl mb-2">{benefit.icon}</div>
                <Text className="text-white text-sm font-medium">{benefit.text}</Text>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-[#9F3AED] hover:bg-gray-100 shadow-lg"
            >
              See Our Solution
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white/10 bg-transparent"
            >
              Calculate ROI
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

