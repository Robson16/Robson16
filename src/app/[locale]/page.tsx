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

  const portfolioProjects = await db.project.findMany({
    where: {
      tier: {
        in: [2, 3],
      },
    },
    include: {
      translations: { where: { locale } },
      gallery: {
        orderBy: { order: 'asc' },
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
      createdAt: 'desc',
    },
  })

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection locale={locale} />
        <FeaturesSection />
        <FeaturedProjectsSection locale={locale} />
        <PortfolioSection projects={portfolioProjects} />
        <ContactSection />
      </main>
    </>
  )
}
