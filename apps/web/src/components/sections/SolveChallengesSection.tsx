'use client'
import Container from '@/components/ui/Container'
import { Button, Heading, Text } from '@/components/ui'

export default function SolveChallengesSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#9F3AED]">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <Heading level={1} className="text-white mb-6">
            Ready to Solve These Challenges?
          </Heading>
          <Text className="text-xl text-white/90 mb-10">
            TryOnAR transforms these pain points into competitive advantages with our no-code AR
            solution.
          </Text>
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

