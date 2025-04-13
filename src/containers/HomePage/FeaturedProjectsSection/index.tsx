'use client'

import Carousel from '@/components/Carousel'
import FeaturedProjectItem from '@/components/FeaturedProjectItem'
import projectsData from '@/data/projects.json'
import { Project } from '@/types/Project'
import { useTranslations } from 'next-intl'

export default function FeaturedProjectsSection() {
  const t = useTranslations('FeaturedProjects')

  const projects = projectsData.projects as Project[]

  const featuredProjects: Project[] = projects.filter(
    (project) => project.featured,
  )

  return (
    <section id="featured-projects" aria-labelledby="featured-projects-title">
      <div className="bg-[url('/images/computer.jpg')] bg-cover bg-center">
        <div className="bg-black bg-opacity-90">
          <div className="container mx-auto px-2 py-28 xl:max-w-screen-xl">
            <h3 className="mb-16 text-center text-4xl font-medium">
              {t('title')}
            </h3>
            {featuredProjects.length === 0 ? (
              <p className="text-center">Carregando...</p>
            ) : featuredProjects.length === 1 ? (
              // When having only one project, directly render the Featured Product
              <FeaturedProjectItem project={featuredProjects[0]} />
            ) : (
              // If has more than one project, use Carousel
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
