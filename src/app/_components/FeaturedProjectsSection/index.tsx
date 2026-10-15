import { getTranslations } from 'next-intl/server'

import Carousel from '@/app/_components/Carousel'
import FeaturedProjectItem from '@/app/_components/FeaturedProjectItem'
import type { ProjectWithRelations } from '@/app/_types/project'

interface FeaturedProjectsSectionProps {
  featuredProjects: ProjectWithRelations[]
}

export default async function FeaturedProjectsSection({
  featuredProjects,
}: FeaturedProjectsSectionProps) {
  const t = await getTranslations('FeaturedProjects')

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
              <FeaturedProjectItem project={featuredProjects[0]} />
            ) : (
              <Carousel>
                {featuredProjects.map((project) => (
                  <FeaturedProjectItem key={project.id} project={project} />
                ))}
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
