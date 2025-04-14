import Header from '@/components/Header'
import AboutSection from '@/containers/HomePage/AboutSection'
import ContactSection from '@/containers/HomePage/ContactSection'
import ExperienceSection from '@/containers/HomePage/ExperienceSection'
import FeaturedProjectsSection from '@/containers/HomePage/FeaturedProjectsSection'
import FeaturesSection from '@/containers/HomePage/FeaturesSection'
import HeroSection from '@/containers/HomePage/HeroSection'
import PortfolioSection from '@/containers/HomePage/PortfolioSection'
import SkillsSection from '@/containers/HomePage/SkillsSection'

export default async function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <FeaturedProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <PortfolioSection />
        <ContactSection />
      </main>
    </>
  )
}
