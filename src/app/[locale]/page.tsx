import AboutSection from '@/app/_components/AboutSection'
import ContactSection from '@/app/_components/ContactSection'
import FeaturedProjectsSection from '@/app/_components/FeaturedProjectsSection'
import FeaturesSection from '@/app/_components/FeaturesSection'
import Header from '@/app/_components/Header'
import HeroSection from '@/app/_components/HeroSection'
import PortfolioSection from '@/app/_components/PortfolioSection'
import { db } from '@/app/_lib/prisma'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params

  const [profileData, socialData, skillsData, portfolioProjects] =
    await Promise.all([
      db.profile.findFirstOrThrow({
        include: {
          translations: {
            where: {
              locale,
            },
          },
        },
      }),
      db.socialLink.findMany({
        orderBy: {
          order: 'asc',
        },
      }),
      db.skill.findMany({
        take: 7,
        include: {
          translations: {
            where: {
              locale,
            },
          },
          _count: {
            select: {
              projects: true,
            },
          },
        },
        orderBy: {
          projects: {
            _count: 'desc',
          },
        },
      }),
      db.project.findMany({
        include: {
          translations: {
            where: {
              locale,
            },
          },
          gallery: {
            orderBy: {
              order: 'asc',
            },
          },
          skills: {
            include: {
              skill: {
                include: {
                  translations: {
                    where: {
                      locale,
                    },
                  },
                },
              },
            },
          },
          links: true,
        },
        orderBy: {
          developedAt: 'desc',
        },
      }),
    ])

  const topSkills = skillsData.map((skill) => ({
    id: skill.id,
    name: skill.translations[0]?.name || 'Unknown',
  }))

  return (
    <>
      <Header />
      <main>
        <HeroSection profileData={profileData} socialData={socialData} />
        <AboutSection profileData={profileData} topSkills={topSkills} />
        <FeaturesSection locale={locale} />
        <FeaturedProjectsSection locale={locale} />
        <PortfolioSection locale={locale} projects={portfolioProjects} />
        <ContactSection profileData={profileData} socialData={socialData} />
      </main>
    </>
  )
}
