'use client'

import { Button } from '@heroui/react'
import { Prisma } from '@prisma/client'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import PortfolioThumb from '@/app/_components/PortfolioThumb'
import useMasonry from '@/app/_hooks/useMasonry'

export type PortfolioProject = Prisma.ProjectGetPayload<{
  include: {
    translations: true
    gallery: true
    skills: {
      include: {
        skill: {
          include: {
            translations: true
          }
        }
      }
    }
    links: true
  }
}>

interface PortfolioSectionProps {
  projects: PortfolioProject[]
}

export default function PortfolioSection({ projects }: PortfolioSectionProps) {
  const [visibleProjects, setVisibleProjects] = useState(6)
  const masonryContainer = useMasonry()
  const t = useTranslations('Portfolio')

  const loadMoreProjects = () => {
    setVisibleProjects((prevVisible) => prevVisible + 6)
  }

  return (
    <section id="portfolio" aria-labelledby="portfolio-title">
      <div className="container mx-auto max-w-3xl px-4 py-28 xl:max-w-7xl">
        <h3
          id="portfolio-title"
          className="mb-16 text-center text-4xl font-medium"
        >
          {t('title')}
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
            <p className="col-span-full text-center text-zinc-500">
              {t('noProjects')}
            </p>
          )}
        </div>

        {visibleProjects < projects.length && (
          <div className="mt-8 flex items-center justify-center text-center">
            <Button
              size="lg"
              onPress={loadMoreProjects}
              className={clsx(
                'flex items-center gap-2 rounded-full px-8 py-3',
                'bg-emerald-800 font-bold text-white transition-all',
                'hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none',
              )}
            >
              {t('loadMore')}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
