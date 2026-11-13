import { getHomeData } from '@/app/_actions/get-home-data.action'
import AboutSection from '@/app/_components/AboutSection'
import ContactSection from '@/app/_components/ContactSection'
import FeaturedProjectsSection from '@/app/_components/FeaturedProjectsSection'
import FeaturesSection from '@/app/_components/FeaturesSection'
import Header from '@/app/_components/Header'
import HeroSection from '@/app/_components/HeroSection'
import PortfolioSection from '@/app/_components/PortfolioSection'

interface PageProps {
  params: Promise<{ locale: string }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }]
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params

  const {
    profileData,
    socialData,
    skillsData,
    featuresData,
    featuredProjects,
    initialPortfolioProjects,
  } = await getHomeData(locale)

  const topSkills = skillsData.map((skill) => ({
    id: skill.id,
    name: skill.translations[0]?.name || 'Unknown',
  }))

  return (
    <>
      <Header />
      <main>
        <HeroSection profileData={profileData} socialData={socialData} />
        <AboutSection
          locale={locale}
          profileData={profileData}
          topSkills={topSkills}
        />
        <FeaturesSection featuresData={featuresData} />
        <FeaturedProjectsSection featuredProjects={featuredProjects} />
        <PortfolioSection
          locale={locale}
          initialProjects={initialPortfolioProjects}
        />
        <ContactSection profileData={profileData} socialData={socialData} />
      </main>
    </>
  )
}
