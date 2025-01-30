'use client'

import PortfolioThumb from '@/components/PortfolioThumb'
import useMasonry from '@/hooks/useMasonry'
import { Project } from '@/types/Project'
import { Button } from '@heroui/react'
import clsx from 'clsx'
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
      <div className="container mx-auto max-w-screen-md px-4 py-28 xl:max-w-screen-xl">
        <h3
          id="portfolio-title"
          className="mb-16 text-center text-4xl font-medium"
        >
          Portfólio
        </h3>

        <div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8 xl:grid-cols-3"
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
            <Button
              size="lg"
              radius="full"
              onPress={loadMoreProjects}
              role="button"
              className={clsx(
                'flex items-center gap-2 px-8 py-3',
                'bg-emerald-800 font-bold text-white transition-all',
                'hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500',
              )}
            >
              Exibir mais
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
