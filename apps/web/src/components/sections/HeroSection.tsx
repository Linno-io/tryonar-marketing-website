'use client'
import { Button, Badge } from '@/components/ui'
import Container from '@/components/ui/Container'

export default function HeroSection() {
  const trustBadges = [
    { text: '94% Higher Conversion', icon: '✓' },
    { text: '64% Fewer Returns', icon: '✓' },
    { text: '3-Tap Setup', icon: '✓' },
  ]

  return (
    <section className="relative bg-white pt-32 lg:pt-40 pb-20 lg:pb-32 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              AR for Everyone, Not Just Tech Giants
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Transform your e-commerce store with 3-tap AR integration. Let customers try before
              they buy, reduce returns by 64%, and boost conversions by 94% with our no-code AR
              solution.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {trustBadges.map((badge) => (
                <Badge 
                  key={badge.text} 
                  variant="success" 
                  icon={<span className="text-[#0AA44C] font-bold text-lg">{badge.icon}</span>}
                >
                  {badge.text}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button variant="primary" size="lg" href="#start-trial">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" href="#watch-demo">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Content - AR Visualization */}
          <div className="relative">
            <div className="relative">
              {/* Man with sunglasses image */}
              <div className="relative z-10">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop"
                    alt="Man wearing AR sunglasses"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* UI Element showing sunglasses selection */}
              <div className="absolute -bottom-12 -left-12 bg-[#9F3AED] rounded-2xl p-6 shadow-2xl z-20 w-64">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-3 aspect-square flex items-center justify-center">
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  </div>
                  <div className="bg-white rounded-lg p-3 aspect-square flex items-center justify-center">
                    <div className="w-12 h-12 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <button className="w-full bg-white text-[#9F3AED] font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Buy Now
                  </button>
                  <button className="w-full bg-[#9F3AED] text-white font-semibold py-2.5 rounded-lg text-sm border-2 border-white hover:bg-[#8B2FD9] transition-colors">
                    TryOn AR
                  </button>
                </div>
              </div>

              {/* Dotted line connecting UI to face */}
              <svg 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10 w-40 h-32"
                viewBox="0 0 160 128"
                style={{ pointerEvents: 'none' }}
              >
                <path
                  d="M 80 0 Q 40 64 0 128"
                  stroke="#9F3AED"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
