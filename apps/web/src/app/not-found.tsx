'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020408] via-[#0F0A1F] to-[#1A0E2E] flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9F3AED] rounded-full opacity-10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0AA44C] rounded-full opacity-10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto px-4 py-20">
          {/* AR-themed 404 visual */}
          <div className="mb-8 relative">
            <div className="relative inline-block">
              <div className="text-[120px] md:text-[180px] lg:text-[220px] font-bold leading-none">
                <span className="bg-gradient-to-r from-[#ffffff] via-[#454147] to-[#0f0615] bg-clip-text text-transparent animate-gradient">
                  404
                </span>
              </div>
              
              {/* AR scanning lines effect */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#0AA44C] to-transparent animate-scan"></div>
              </div>
            </div>
          </div>

          {/* Main message */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-['Circular_Std',sans-serif]">
            Lost in the Virtual Space?
          </h1>
          
          <p className="text-lg md:text-xl text-[#E7E5EAB2] mb-3 max-w-2xl mx-auto leading-relaxed">
            Looks like you&apos;ve wandered off the path to <span className="text-white font-semibold">TryOnAR</span>
          </p>

          <p className="text-base md:text-lg text-[#B8B6BB] mb-10 max-w-xl mx-auto">
            The page you&apos;re looking for doesn&apos;t exist in this reality. Let&apos;s get you back on track to experience the future of virtual try-on.
          </p>

          {/* AR-themed icon */}
          <div className="mb-10 flex justify-center">
            <div className="relative">
              <svg 
                width="100" 
                height="100" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="animate-float"
              >
                {/* AR marker corners */}
                <path d="M10 10H25M10 10V25" stroke="#454147" strokeWidth="3" strokeLinecap="round" />
                <path d="M90 10H75M90 10V25" stroke="#454147" strokeWidth="3" strokeLinecap="round" />
                <path d="M10 90H25M10 90V75" stroke="#454147" strokeWidth="3" strokeLinecap="round" />
                <path d="M90 90H75M90 90V75" stroke="#454147" strokeWidth="3" strokeLinecap="round" />
                
                {/* Center crosshair */}
                <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                <circle cx="50" cy="50" r="12" stroke="white" strokeWidth="2" opacity="0.8" />
                <path d="M50 35V65M35 50H65" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              
              {/* Pulsing ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-2 border-[#9F3AED] rounded-full animate-ping opacity-20"></div>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

            <Link href="/">
              <Button variant="primary" size="lg" className='bg-[#454147] hover:!bg-[#403e4c]'>
                Return to Home
              </Button>
            </Link>

            <Link href="/product-demo">
              <Button variant="secondary" size="lg" className='bg-white hover:!bg-white !text-[var(--color-text-primary)] '>
                Try Our Demo
              </Button>
            </Link>
          </div>

          {/* Help text */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-[#B8B6BB]">
              Need help? <Link href="/contact" className="text-white hover:text-[#B8B6BB] transition-colors underline">Contact our team</Link>
            </p>
          </div>
        </div>
      </Container>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes scan {
          0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100px);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
