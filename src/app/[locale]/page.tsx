import Header from '@/components/Header'
import AboutSection from '@/containers/HomePage/AboutSection'
import ContactSection from '@/containers/HomePage/ContactSection'
import ExperienceSection from '@/containers/HomePage/ExperienceSection'
import HeroSection from '@/containers/HomePage/HeroSection'
import PortfolioSection from '@/containers/HomePage/PortfolioSection'
import SkillsSection from '@/containers/HomePage/SkillsSection'
import { education, experiences, projects } from '@/lib/data'

export default async function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection education={education} experiences={experiences} />
        <PortfolioSection projects={projects} />
        <ContactSection />
      </main>
    </>
  )
}
