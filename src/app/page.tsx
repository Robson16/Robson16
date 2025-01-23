import Header from '@/components/Header'
import AboutSection from '@/containers/HomePage/AboutSection'
import ExperienceSection from '@/containers/HomePage/ExperienceSection'
import HeroSection from '@/containers/HomePage/HeroSection'
import SkillsSection from '@/containers/HomePage/SkillsSection'
import { about, education, experiences, projects, skills } from '@/lib/data'

export default async function Home() {
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection
          features={about.features}
          skills={skills}
          featuredProjects={featuredProjects}
        />
        <SkillsSection
          technical={skills.technical}
          professional={skills.professional}
        />
        <ExperienceSection education={education} experiences={experiences} />
      </main>
    </>
  )
}
