import { getTranslations } from 'next-intl/server'

import Carousel from '@/app/_components/Carousel'
import FeaturedProjectItem from '@/app/_components/FeaturedProjectItem'
import { db } from '@/app/_lib/prisma'

interface FeaturedProjectsSectionProps {
  locale: string
}

export default async function FeaturedProjectsSection({
  locale,
}: FeaturedProjectsSectionProps) {
  const t = await getTranslations('FeaturedProjects')

  const featuredProjects = await db.project.findMany({
    where: {
      tier: 1,
    },
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
                where: { locale },
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

  if (featuredProjects.length === 0) {
    return null
  }

  return (
    <section id="featured-projects" aria-labelledby="featured-projects-title">
      <div className="bg-[url('/images/computer.jpg')] bg-cover bg-center">
        <div className="bg-black/90">
          <div className="container mx-auto px-2 py-28 xl:max-w-7xl">
            <h3 className="mb-16 text-center text-4xl font-medium text-white">
              {t('title')}
            </h3>

            {featuredProjects.length === 1 ? (
              <FeaturedProjectItem
                locale={locale}
                project={featuredProjects[0]}
              />
            ) : (
              <Carousel>
                {featuredProjects.map((project) => (
                  <FeaturedProjectItem
                    key={project.id}
                    locale={locale}
                    project={project}
                  />
                ))}
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
