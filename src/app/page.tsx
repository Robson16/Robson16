import Header from '@/components/Header'
import AboutSection from '@/containers/HomePage/AboutSection'
import ContactSection from '@/containers/HomePage/ContactSection'
import ExperienceSection from '@/containers/HomePage/ExperienceSection'
import HeroSection from '@/containers/HomePage/HeroSection'
import PortfolioSection from '@/containers/HomePage/PortfolioSection'
import SkillsSection from '@/containers/HomePage/SkillsSection'
import { about, education, experiences, projects, skills } from '@/lib/data'

export default async function Home() {
  const featuredProjects = projects.filter((project) => project.featured)
  const linkedin = about.social.find((item) => item.name === 'LinkedIn')

  return (
    <>
      <Header />
      <main>
        <HeroSection
          photoUrl={about.photoUrl}
          name={about.name}
          title={about.title}
          email={about.email}
          location={about.location}
          social={about.social}
        />
        <AboutSection
          description={about.description}
          features={about.features}
          skills={skills}
          featuredProjects={featuredProjects}
        />
        <SkillsSection
          technical={skills.technical}
          professional={skills.professional}
        />
        <ExperienceSection education={education} experiences={experiences} />
        <PortfolioSection projects={projects} />
        <ContactSection
          location={about.location}
          email={about.email}
          linkedinUrl={linkedin?.url || ''}
        />
      </main>
    </>
  )
}
