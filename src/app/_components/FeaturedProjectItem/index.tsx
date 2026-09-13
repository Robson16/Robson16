import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

import { Project } from '@/app/_types/Project'

type FeaturedProjectItemProps = { project: Project }

export default function FeaturedProjectItem({
  project,
}: FeaturedProjectItemProps) {
  const t = useTranslations('FeaturedProjects')
  const locale = useLocale()

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
    <div className="flex! flex-col gap-8 p-2 xl:columns-2 xl:flex-row">
      <div className="flex flex-1">
        <Image
          src={src}
          priority={true}
          alt={title[locale as keyof typeof title] || title.pt}
          width={width}
          height={height}
          className="size-full rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col items-center xl:items-start">
        <span className="mb-2 text-xl font-bold text-teal-600 uppercase">
          {category[locale as keyof typeof category] || category.pt}
        </span>
        <h4 className="mb-2 text-3xl font-bold uppercase">
          {heading[locale as keyof typeof heading] || heading.pt}
        </h4>
        <h5 className="mb-4 uppercase">
          {subheading[locale as keyof typeof subheading] || subheading.pt}
        </h5>
        <p className="mb-8 text-center xl:text-left">
          {description[locale as keyof typeof description] || description.pt}
        </p>
        {url && (
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              urlLabel?.[locale as keyof typeof urlLabel] ??
              urlLabel?.pt ??
              t('visitProject')
            }
            className={clsx(
              'flex items-center gap-2 rounded-full px-8 py-3 capitalize',
              'bg-emerald-800 font-bold text-white transition-all',
              'hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none',
            )}
          >
            {urlLabel?.[locale as keyof typeof urlLabel] ||
              urlLabel?.pt ||
              t('visitProject')}
          </Link>
        )}
      </div>
    </div>
  )
}
