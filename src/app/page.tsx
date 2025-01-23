import Header from '@/components/Header'
import AboutSection from '@/containers/HomePage/AboutSection'
import ExperienceSection from '@/containers/HomePage/ExperienceSection'
import HeroSection from '@/containers/HomePage/HeroSection'
import SkillsSection from '@/containers/HomePage/SkillsSection'
import { About } from '@/types/About'
import { Education } from '@/types/Education'
import { Experience } from '@/types/Experience'
import { FeaturedProject } from '@/types/Project'
import { Skills } from '@/types/Skill'
import fetchData from '@/utils/api'

export default async function Home() {
  const [about, skills, featuredProjects, education, experience] =
    await Promise.all([
      fetchData<About>('about'),
      fetchData<Skills>('skills'),
      fetchData<FeaturedProject[]>('projects'),
      fetchData<Education[]>('education'),
      fetchData<Experience[]>('experiences'),
    ])

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
        <ExperienceSection education={education} experiences={experience} />
      </main>
    </>
  )
}
