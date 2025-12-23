'use client'
import { useState } from 'react'
import Container from '@/components/ui/Container'
import { Button, Heading, Text } from '@/components/ui'

export default function IndustrySolutionsSection() {
  const [activeTab, setActiveTab] = useState('fashion')

  const industries = [
    {
      id: 'fashion',
      label: 'Fashion & Apparel',
      title: 'Fashion & Apparel',
      description: 'Virtual try-ons for clothing, accessories, and fashion items.',
      features: [
        { label: 'Face shape analysis', icon: '✓' },
        { label: 'Size recommendation AI', icon: '✓' },
        { label: 'Virtual fitting rooms', icon: '✓' },
        { label: 'Social sharing integration', icon: '✓' },
      ],
      stats: [
        { value: '+127%', label: 'Conversion' },
        { value: '-68%', label: 'Return' },
        { value: '89+', label: 'Engagement' },
      ],
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
      roi: '+127% ROI',
    },
    {
      id: 'eyewear',
      label: 'Eyewear',
      title: 'Eyewear',
      description: 'Perfect fit visualization for glasses and sunglasses.',
      features: [
        { label: 'Face shape analysis', icon: '✓' },
        { label: 'Virtual try-on', icon: '✓' },
        { label: 'Frame recommendations', icon: '✓' },
        { label: 'Size guide', icon: '✓' },
      ],
      stats: [
        { value: '+94%', label: 'Conversion' },
        { value: '-64%', label: 'Return' },
        { value: '92+', label: 'Engagement' },
      ],
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=1000&fit=crop',
      roi: '+94% ROI',
    },
    {
      id: 'footwear',
      label: 'Footwear',
      title: 'Footwear',
      description: 'Virtual try-ons for shoes and sneakers.',
      features: [
        { label: 'Size recommendation', icon: '✓' },
        { label: 'Virtual try-on', icon: '✓' },
        { label: 'Style matching', icon: '✓' },
        { label: '360° view', icon: '✓' },
      ],
      stats: [
        { value: '+112%', label: 'Conversion' },
        { value: '-58%', label: 'Return' },
        { value: '85+', label: 'Engagement' },
      ],
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop',
      roi: '+112% ROI',
    },
    {
      id: 'jewelry',
      label: 'Jewelry',
      title: 'Jewelry',
      description: 'Virtual try-ons for rings, necklaces, and accessories.',
      features: [
        { label: 'Virtual try-on', icon: '✓' },
        { label: 'Size guide', icon: '✓' },
        { label: 'Style matching', icon: '✓' },
        { label: '360° view', icon: '✓' },
      ],
      stats: [
        { value: '+98%', label: 'Conversion' },
        { value: '-52%', label: 'Return' },
        { value: '91+', label: 'Engagement' },
      ],
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop',
      roi: '+98% ROI',
    },
  ]

  const activeIndustry = industries.find((ind) => ind.id === activeTab) || industries[0]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        <div className="text-center mb-16">
          <Text className="text-sm font-semibold text-[#0AA44C] uppercase tracking-wider mb-4">
            INDUSTRY SOLUTIONS
          </Text>
          <Heading level={1} className="mb-6">
            Tailored AR experiences for every industry.
          </Heading>
          <Text className="text-lg text-gray-600 max-w-3xl mx-auto">
            From fashion to jewelry, our AR solutions are custom-built to meet the unique needs of
            your industry.
          </Text>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setActiveTab(industry.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === industry.id
                  ? 'bg-[#9F3AED] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {industry.label}
            </button>
          ))}
        </div>

        {/* Active Industry Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={activeIndustry.image}
                alt={activeIndustry.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 right-4 bg-[#0AA44C] text-white px-4 py-2 rounded-lg font-bold text-sm">
              {activeIndustry.roi}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <Heading level={2} className="text-gray-900">
              {activeIndustry.title}
            </Heading>
            <Text className="text-lg text-gray-600">{activeIndustry.description}</Text>

            <div>
              <Heading level={4} className="text-gray-900 mb-4">
                Key Features
              </Heading>
              <div className="grid grid-cols-2 gap-3">
                {activeIndustry.features.map((feature) => (
                  <div key={feature.label} className="flex items-center gap-2">
                    <span className="text-[#0AA44C] font-bold">{feature.icon}</span>
                    <Text className="text-gray-700">{feature.label}</Text>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-6">
              {activeIndustry.stats.map((stat) => (
                <div key={stat.label}>
                  <Text className="text-2xl font-bold text-[#0AA44C]">{stat.value}</Text>
                  <Text className="text-xs text-gray-600">{stat.label}</Text>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" href="#start-trial">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" href="#watch-demo">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

