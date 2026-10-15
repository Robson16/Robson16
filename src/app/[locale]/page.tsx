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

export const revalidate = 3600

export default async function Home({ params }: PageProps) {
  const { locale } = await params

  const [profileData, socialData, skillsData, featuresData, portfolioProjects] =
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
      db.feature.findMany({
        include: {
          translations: {
            where: {
              locale,
            },
          },
        },
        orderBy: {
          order: 'asc',
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

  const featuredProjects = portfolioProjects.filter(
    (project) => project.tier === 1,
  )

  return (
    <>
      <Header />
      <main>
        <HeroSection profileData={profileData} socialData={socialData} />
        <AboutSection profileData={profileData} topSkills={topSkills} />
        <FeaturesSection featuresData={featuresData} />
        <FeaturedProjectsSection featuredProjects={featuredProjects} />
        <PortfolioSection projects={portfolioProjects} />
        <ContactSection profileData={profileData} socialData={socialData} />
      </main>
    </>
  )
}
