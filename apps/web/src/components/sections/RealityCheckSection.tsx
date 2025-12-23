'use client'
import Container from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui'

export default function RealityCheckSection() {
  const problems = [
    {
      title: 'Low Conversion',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      ),
    },
    {
      title: '30% Return Rate',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: 'Dev Complexity',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  const returnRateIssues = [
    'Size and fit uncertainty drives returns',
    'Color perception varies on different screens',
    'Virtual try-ons impossible to judge online',
    'Quality, while shipping and processing',
  ]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        <div className="text-center mb-16">
          <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            THE REALITY CHECK
          </Text>
          <Heading level={1} className="mb-6">
            AR for Everyone, Not Just Tech Giants
          </Heading>
          <Text className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transform your e-commerce store with 3-tap AR integration. Let customers try before
            they buy, reduce returns by 64%, and boost conversions by 94% with our no-code AR
            solution.
          </Text>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#9F3AED] transition-colors"
            >
              <div className="text-[#9F3AED] mb-4">{problem.icon}</div>
              <Heading level={4} className="text-gray-900">
                {problem.title}
              </Heading>
            </div>
          ))}
        </div>

        {/* Business Impact and Return Rate Details */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Business Impact Card */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
            <Heading level={3} className="mb-6 text-gray-900">
              Business Impact
            </Heading>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Text className="text-gray-700">Lost Revenue:</Text>
                <Text className="font-semibold text-red-600">High</Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="text-gray-700">Customer Satisfaction:</Text>
                <Text className="font-semibold text-red-600">Low</Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="text-gray-700">Operational Costs:</Text>
                <Text className="font-semibold text-red-600">Rising</Text>
              </div>
            </div>
          </div>

          {/* 30% Return Rate Details */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
            <Heading level={3} className="mb-4 text-gray-900">
              30% Return Rate
            </Heading>
            <Text className="text-gray-600 mb-6">
              Fashion and eyewear see the highest return rates due to poor fit visualization.
              Customers can't truly experience products before buying.
            </Text>
            <Text className="text-sm font-semibold text-gray-700 mb-4">
              Average return rate for fashion/eyewear
            </Text>
            <ul className="space-y-3">
              {returnRateIssues.map((issue, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <Text className="text-gray-600">{issue}</Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

