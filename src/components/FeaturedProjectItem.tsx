import { Project } from '@/types/Project'
import clsx from 'clsx'
import Image from 'next/image'

type FeaturedProjectItemProps = {
  project: Project
}

export default function FeaturedProjectItem({
  project,
}: FeaturedProjectItemProps) {
  const {
    featuredImage: { src, title, width, height },
    category,
    heading,
    subheading,
    description,
    url,
  } = project

  return (
    <div className="flex columns-2 flex-col gap-8 lg:flex-row">
      <div className="flex flex-1">
        <Image
          src={src}
          priority={true}
          alt={title}
          width={width}
          height={height}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col items-center lg:items-start">
        <span className="bold text-1xl mb-2 uppercase text-teal-600">
          {category}
        </span>
        <h4 className="bold mb-2 text-3xl uppercase">{heading}</h4>
        <h5 className="mb-4 uppercase">{subheading}</h5>
        <p className="mb-8 text-center lg:text-left">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            'flex items-center gap-2 rounded-full px-8 py-3',
            'bg-teal-600 font-bold text-white transition-all',
            'hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500',
          )}
          aria-label={`Ver detalhes sobre o projeto ${heading}`}
        >
          Ver detalhes
        </a>
      </div>
    </div>
  )
}
