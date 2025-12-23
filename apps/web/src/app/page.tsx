import Navigation from '@/components/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import RealityCheckSection from '@/components/sections/RealityCheckSection'
import SolveChallengesSection from '@/components/sections/SolveChallengesSection'
import SuccessStoriesSection from '@/components/sections/SuccessStoriesSection'
import IndustrySolutionsSection from '@/components/sections/IndustrySolutionsSection'
import TransformStoreSection from '@/components/sections/TransformStoreSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <RealityCheckSection />
      <SolveChallengesSection />
      <SuccessStoriesSection />
      <IndustrySolutionsSection />
      <TransformStoreSection />
      <Footer />
    </>
  )
}
