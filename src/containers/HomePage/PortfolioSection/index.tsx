'use client'

import PortfolioThumb from '@/components/PortfolioThumb'
import useMasonry from '@/hooks/useMasonry'
import { Project } from '@/types/Project'

type PortfolioSectionProps = {
  projects: Project[]
}

export default function PortfolioSection({ projects }: PortfolioSectionProps) {
  const masonryContainer = useMasonry()

  return (
    <section id="portfolio" aria-labelledby="portfolio-title">
      <div className="container mx-auto px-4 py-28 lg:max-w-screen-xl">
        <h3
          id="portfolio-title"
          className="mb-16 text-center text-4xl font-medium"
        >
          Portfólio
        </h3>

        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-8"
          ref={masonryContainer}
        >
          {projects.length > 0 ? (
            projects.map((project) => (
              <PortfolioThumb project={project} key={project.id} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Nenhum projeto disponível no momento.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
