import { Prisma } from '@prisma/client'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

type ProjectWithRelations = Prisma.ProjectGetPayload<{
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

type FeaturedProjectItemProps = {
  locale: string
  project: ProjectWithRelations
}

export default function FeaturedProjectItem({
  locale,
  project,
}: FeaturedProjectItemProps) {
  const featuredImage = project.gallery?.[0]?.url || '/images/placeholder.jpg'

  const translation =
    project.translations.find((translation) => translation.locale === locale) ||
    project.translations[0]

  if (!translation) return null

  return (
    <div className="flex! flex-col gap-8 p-2 xl:columns-2 xl:flex-row">
      <div className="relative flex min-h-75 flex-1 xl:min-h-100">
        <Image
          src={featuredImage}
          priority={true}
          alt={translation.title}
          fill
          sizes="(max-width: 1280px) 100vw, 50vw"
          className="size-full rounded-lg shadow-xl"
        />
      </div>

      <div className="flex flex-1 flex-col items-center xl:items-start xl:justify-center">
        <h4 className="mb-2 text-3xl font-bold uppercase">
          {translation.title}
        </h4>
        <p className="mb-8 text-center xl:text-left">
          {translation.description}
        </p>

        {project.skills && project.skills.length > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2 xl:justify-start">
            {project.skills.slice(0, 4).map((ps) => (
              <span
                key={ps.skillId}
                className="rounded border border-teal-800/30 bg-teal-900/20 px-2 py-1 text-xs font-bold tracking-wider text-teal-600 uppercase"
              >
                {ps.skill.translations[0]?.name || 'Unknown Skill'}
              </span>
            ))}
          </div>
        )}

        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 xl:justify-start">
            {project.links.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.type}
                className={clsx(
                  'flex items-center gap-2 rounded-full px-8 py-3 capitalize',
                  'bg-emerald-800 font-bold text-white transition-all',
                  'hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none',
                )}
              >
                {link.type}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
