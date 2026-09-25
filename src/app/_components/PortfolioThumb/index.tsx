'use client'

import { Modal } from '@heroui/react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { AiFillGithub, AiFillGitlab } from 'react-icons/ai'
import { PiMagnifyingGlassBold } from 'react-icons/pi'
import { useMediaQuery } from 'react-responsive'

import { PortfolioProject } from '../PortfolioSection'

type PortfolioThumbProps = { project: PortfolioProject }

const getPlatformIcon = (platform: string) => {
  const p = platform.toLowerCase()
  if (p.includes('github')) return <AiFillGithub size={25} />
  if (p.includes('gitlab')) return <AiFillGitlab size={25} />
}

export default function PortfolioThumb({ project }: PortfolioThumbProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const t = useTranslations('Portfolio')
  const locale = useLocale()

  const featuredImage = project.gallery?.[0]?.url || '/images/placeholder.jpg'
  const translation =
    project.translations.find((t) => t.locale === locale) ||
    project.translations[0]

  if (!translation) return null

  return (
    <Modal>
      <Modal.Trigger
        className={clsx(
          'group relative block h-70 w-full cursor-pointer border-none bg-transparent p-0 text-left outline-none',
          'focus-visible:rounded-lg focus-visible:ring-4 focus-visible:ring-teal-600',
        )}
      >
        <Image
          src={featuredImage}
          alt={translation.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="rounded-lg shadow-xl transition"
        />
        <div
          className={clsx(
            'absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-lg',
            'bg-emerald-800/90 text-white opacity-0 transition-opacity duration-600 ease-in-out',
            'group-hover:opacity-100',
          )}
        >
          <PiMagnifyingGlassBold size={30} className="mb-4" />
          <h4 className="mb-2 px-4 text-center text-xl font-bold uppercase">
            {translation.title}
          </h4>
          <span className="text-sm tracking-wide uppercase">
            {t('seeMore')}
          </span>
        </div>
      </Modal.Trigger>

      <Modal.Backdrop className="bg-black/90 backdrop-opacity-90 transition-opacity">
        <Modal.Container>
          <Modal.Dialog
            className={clsx(
              'rounded-lg bg-zinc-900 p-6 pt-14 text-white sm:pt-6',
              isMobile ? 'max-w-sm' : 'w-full max-w-5xl',
            )}
          >
            <Modal.CloseTrigger className="m-2 rounded-full bg-emerald-600 p-2 text-white transition-colors duration-300 ease-in-out" />
            <Modal.Body className="flex flex-col gap-8 bg-zinc-900 lg:flex-row">
              <ModalContentBody project={project} />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

function ModalContentBody({ project }: { project: PortfolioProject }) {
  const locale = useLocale()
  const featuredImage = project.gallery?.[0]?.url || '/images/placeholder.jpg'
  const translation =
    project.translations.find((t) => t.locale === locale) ||
    project.translations[0]

  if (!translation) return null

  return (
    <div className="flex w-full flex-col gap-8 bg-zinc-900 lg:flex-row">
      <div className="relative min-h-75 flex-1 lg:min-h-100">
        <Image
          src={featuredImage}
          alt={translation.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex max-h-[60vh] flex-1 flex-col items-center overflow-y-auto pr-2 lg:items-start">
        <h4 className="mb-2 text-center text-3xl font-bold uppercase lg:text-left">
          {translation.title}
        </h4>
        <p className="mb-8 text-center text-zinc-300 lg:text-left">
          {translation.description}
        </p>

        {project.skills && project.skills.length > 0 && (
          <ul className="mb-8 flex flex-wrap justify-center gap-2 lg:justify-start">
            {project.skills.map((ps) => {
              const skillName =
                ps.skill.translations.find((t) => t.locale === locale)?.name ||
                ps.skill.translations[0]?.name ||
                'Unknown'
              return (
                <li
                  key={ps.skillId}
                  className="rounded border border-solid border-teal-600 bg-teal-900/20 px-3 py-1 text-sm text-teal-400"
                >
                  {skillName}
                </li>
              )
            })}
          </ul>
        )}

        {project.links && project.links.length > 0 && (
          <ul className="flex w-full flex-col flex-wrap justify-center gap-4 md:flex-row lg:justify-start">
            {project.links.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    'flex items-center gap-2 rounded-full px-6 py-3 text-base font-bold capitalize',
                    'bg-emerald-800 text-white transition-all',
                    'hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none',
                  )}
                >
                  {getPlatformIcon(link.type)}
                  <span>{link.type}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
