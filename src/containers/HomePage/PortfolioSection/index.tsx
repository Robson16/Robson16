'use client'

import PortfolioThumb from '@/components/PortfolioThumb'
import useMasonry from '@/hooks/useMasonry'
import { Project } from '@/types/Project'
import Image from 'next/image'
import React from 'react'

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
        <div className="grid grid-cols-3 gap-8" ref={masonryContainer}>
          {projects.map((project) => (
            <PortfolioThumb project={project} key={project.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
