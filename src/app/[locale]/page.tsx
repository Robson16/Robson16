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

export default async function Home({ params }: PageProps) {
  const { locale } = await params

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection locale={locale} />
        <FeaturesSection />
        <FeaturedProjectsSection />
        <PortfolioSection />
        <ContactSection />
      </main>
    </>
  )
}
