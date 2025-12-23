'use client'
import Container from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui'

export default function SuccessStoriesSection() {
  const stats = [
    {
      value: '10,000+',
      label: 'Active Stores',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      value: '50M+',
      label: 'AR Interactions',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v6a1.5 1.5 0 003 0m0-6V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      ),
    },
    {
      value: '94%',
      label: 'Avg Conversion Lift',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      value: '64%',
      label: 'Return Reduction',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        <div className="text-center mb-16">
          <Text className="text-sm font-semibold text-[#0AA44C] uppercase tracking-wider mb-4">
            TRUSTED BY INDUSTRY LEADERS
          </Text>
          <Heading level={1} className="mb-6">
            Join thousands of successful stores
          </Heading>
          <Text className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how leading e-commerce brands are transforming their customer experience with
            TryOnAR.
          </Text>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#9F3AED] transition-colors"
              >
                <div className="text-[#9F3AED] mb-4">{stat.icon}</div>
                <Heading level={3} className="text-gray-900 mb-2">
                  {stat.value}
                </Heading>
                <Text className="text-gray-600 text-sm">{stat.label}</Text>
              </div>
            ))}
          </div>

          {/* Testimonial Card */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 relative">
            <div className="absolute top-6 left-6 text-[#9F3AED] text-6xl font-bold opacity-20">
              "
            </div>
            <div className="relative z-10">
              <Text className="text-sm font-semibold text-[#9F3AED] uppercase tracking-wider mb-4">
                Success Story - Fashion Industry
              </Text>
              <Text className="text-lg text-gray-700 mb-6 leading-relaxed">
                "The 3-tap setup was incredible. We had AR running on our sneaker store in under 10
                minutes. Sales increased 94% for AR-enabled products."
              </Text>
              <div className="mb-6">
                <Text className="font-semibold text-gray-900">Jonathon Doe</Text>
                <Text className="text-sm text-gray-600">E-COMMERCE DIRECTOR</Text>
              </div>
              <div className="flex gap-6">
                <div>
                  <Text className="text-2xl font-bold text-[#0AA44C]">+127%</Text>
                  <Text className="text-xs text-gray-600">Conversion</Text>
                </div>
                <div>
                  <Text className="text-2xl font-bold text-[#0AA44C]">-68%</Text>
                  <Text className="text-xs text-gray-600">Return</Text>
                </div>
                <div>
                  <Text className="text-2xl font-bold text-[#0AA44C]">4.9/5</Text>
                  <Text className="text-xs text-gray-600">Satisfaction</Text>
                </div>
              </div>
            </div>
            {/* Carousel dots */}
            <div className="flex gap-2 mt-6 justify-center">
              {[1, 2, 3].map((dot) => (
                <div
                  key={dot}
                  className={`w-2 h-2 rounded-full ${
                    dot === 1 ? 'bg-[#9F3AED]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

