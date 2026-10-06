import { Prisma } from '@prisma/client'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { getProjectLinkLabel } from '@/app/_utils/get-project-link-label'

import { PlatformIcon } from '../PlatformIcon'

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
  const tPortfolio = useTranslations('Portfolio')
  const tProject = useTranslations('ProjectDetails')
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
          width={1200}
          height={900}
          className="h-auto w-full rounded-lg object-cover shadow-xl"
        />
      </div>

      <div className="flex max-h-[60vh] flex-1 flex-col pr-2">
        <div className="grow">
          <h4 className="mb-2 text-center text-3xl font-bold uppercase lg:text-left">
            {translation.title}
          </h4>
          <p className="mb-8 text-center text-zinc-300 lg:text-left">
            {translation.description}
          </p>

          {project.skills && project.skills.length > 0 && (
            <div className="mb-8">
              <h5 className="mb-3 text-center text-sm font-semibold text-zinc-400 uppercase lg:text-left">
                {tProject('technologies')}
              </h5>
              <ul className="mb-8 flex flex-wrap justify-center gap-2 lg:justify-start">
                {project.skills.map((ps) => {
                  const skillName =
                    ps.skill.translations.find((t) => t.locale === locale)
                      ?.name ||
                    ps.skill.translations[0]?.name ||
                    'Unknown'
                  return (
                    <li
                      key={ps.skillId}
                      className="rounded border border-solid border-emerald-600 bg-emerald-900/20 px-3 py-1 text-sm text-emerald-400"
                    >
                      {skillName}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-auto flex flex-col items-center gap-4 border-t border-zinc-800 pt-6 lg:items-start">
          {project.links && project.links.length > 0 && (
            <ul className="flex w-full flex-col flex-wrap justify-center gap-4 md:flex-row lg:justify-start">
              {project.links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      'flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold capitalize',
                      'bg-emerald-800 text-white transition-all',
                      'hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none',
                    )}
                  >
                    <PlatformIcon platform={link.type} />
                    <span>{getProjectLinkLabel(link.type, tProject)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <Link
            href={`/${locale}/projects/${project.slug}`}
            className={clsx(
              'flex w-full items-center justify-center gap-2 rounded-lg border-2 border-emerald-600 px-6 py-3 text-base font-bold uppercase',
              'bg-transparent text-emerald-500 transition-all',
              'hover:bg-emerald-600 hover:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none',
            )}
          >
            {tPortfolio('seeMore')}
          </Link>
        </div>
      </div>
    </div>
  )
}
