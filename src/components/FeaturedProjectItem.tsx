import { Project } from '@/types/Project'
import { Button, Link } from '@heroui/react'
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
    urlLabel,
  } = project

  return (
    <div className="flex flex-col gap-8 lg:columns-2 lg:flex-row">
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
        {url && (
          <Button
            size="lg"
            radius="full"
            as={Link}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${urlLabel || 'Visitar site'} do projeto ${heading}`}
            role="link"
            className={clsx(
              'flex items-center gap-2 px-8 py-3',
              'bg-emerald-800 font-bold text-white transition-all',
              'hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500',
            )}
          >
            {urlLabel || 'Visitar site'}
          </Button>
        )}
      </div>
    </div>
  )
}
