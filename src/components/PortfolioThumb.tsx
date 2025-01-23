import { Project } from '@/types/Project'
import Image from 'next/image'

type PortfolioThumbProps = {
  project: Project
}

export default function PortfolioThumb({ project }: PortfolioThumbProps) {
  return (
    <Image
      src={project.featuredImage.src}
      alt={project.featuredImage.title}
      className="rounded-lg shadow-xl transition"
      width={project.featuredImage.width}
      height={project.featuredImage.height}
    />
  )
}
