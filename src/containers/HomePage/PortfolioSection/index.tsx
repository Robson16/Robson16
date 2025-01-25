'use client'

import PortfolioThumb from '@/components/PortfolioThumb'
import useMasonry from '@/hooks/useMasonry'
import { Project } from '@/types/Project'
import { useState } from 'react'

type PortfolioSectionProps = {
  projects: Project[]
}

export default function PortfolioSection({ projects }: PortfolioSectionProps) {
  const [visibleProjects, setVisibleProjects] = useState(6)
  const masonryContainer = useMasonry()

  const loadMoreProjects = () => {
    setVisibleProjects((prevVisible) => prevVisible + 6)
  }

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
            projects
              .slice(0, visibleProjects)
              .map((project) => (
                <PortfolioThumb project={project} key={project.id} />
              ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Nenhum projeto disponível no momento.
            </p>
          )}
        </div>

        {visibleProjects < projects.length && (
          <div className="mt-8 flex items-center justify-center text-center">
            <button
              onClick={loadMoreProjects}
              className="flex items-center gap-2 rounded-full bg-teal-600 px-8 py-3 font-bold text-white transition-all hover:bg-teal-700"
            >
              Exibir mais
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
