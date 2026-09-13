'use client'

import { Modal } from '@heroui/react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { AiFillGithub, AiFillGitlab } from 'react-icons/ai'
import { ImGit } from 'react-icons/im'
import { PiMagnifyingGlassBold } from 'react-icons/pi'
import { useMediaQuery } from 'react-responsive'

import { Project } from '@/app/_types/Project'

type PortfolioThumbProps = { project: Project }

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'GitHub':
      return <AiFillGithub size={25} />
    case 'GitLab':
      return <AiFillGitlab size={25} />
    default:
      return <ImGit size={25} />
  }
}

export default function PortfolioThumb({ project }: PortfolioThumbProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const t = useTranslations('Portfolio')
  const locale = useLocale()

  const { featuredImage, heading } = project

  return (
    <Modal>
      <Modal.Trigger
        className={clsx(
          'group relative cursor-pointer border-none bg-transparent p-0 text-left outline-none',
          'focus-visible:rounded-lg focus-visible:ring-4 focus-visible:ring-teal-600',
        )}
      >
        <Image
          src={featuredImage.src}
          alt={
            featuredImage.title[locale as keyof typeof featuredImage.title] ||
            featuredImage.title.pt
          }
          className="rounded-lg shadow-xl transition"
          width={featuredImage.width}
          height={featuredImage.height}
        />
        <div
          className={clsx(
            'absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-lg',
            'bg-emerald-800/90 text-white opacity-0 transition-opacity duration-600 ease-in-out',
            'group-hover:opacity-100',
          )}
        >
          <PiMagnifyingGlassBold size={30} className="mb-4" />
          <h4 className="mb-2 text-xl font-bold">
            {heading[locale as keyof typeof heading] || heading.pt}
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

function ModalContentBody({ project }: { project: Project }) {
  const t = useTranslations('Portfolio')
  const locale = useLocale()

  const {
    featuredImage,
    category,
    heading,
    subheading,
    description,
    technologies,
    url,
    urlLabel,
    repositories,
  } = project

  return (
    <div className="flex w-full flex-col gap-8 bg-zinc-900 lg:flex-row">
      <div className="flex-1">
        <Image
          src={featuredImage.src}
          alt={heading[locale as keyof typeof heading] || heading.pt}
          width={featuredImage.width}
          height={featuredImage.height}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-1 flex-col items-center lg:items-start">
        <span className="mb-2 text-xl font-bold text-emerald-400 uppercase">
          {category[locale as keyof typeof category] || category.pt}
        </span>
        <h4 className="mb-2 text-3xl font-bold uppercase">
          {heading[locale as keyof typeof heading] || heading.pt}
        </h4>
        <h5 className="mb-4 uppercase">
          {subheading[locale as keyof typeof subheading] || subheading.pt}
        </h5>
        <p className="mb-8 text-center lg:text-left">
          {description[locale as keyof typeof description] || description.pt}
        </p>
        {technologies.length > 0 && (
          <ul className="mb-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded border border-solid border-teal-600 px-3 py-1"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
        <ul className="flex flex-col flex-wrap gap-4 md:flex-row">
          {url && (
            <li>
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  urlLabel?.[locale as keyof typeof urlLabel] ||
                  urlLabel?.pt ||
                  t('seeWebsite')
                }
                className={clsx(
                  'flex items-center gap-2 rounded-full px-8 py-3 text-base font-bold capitalize',
                  'bg-emerald-800 text-white transition-all',
                  'hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none',
                )}
              >
                {urlLabel?.[locale as keyof typeof urlLabel] ||
                  urlLabel?.pt ||
                  t('seeWebsite')}
              </Link>
            </li>
          )}

          {repositories &&
            repositories.length > 0 &&
            repositories.map((repo) => (
              <li key={repo.url}>
                <Link
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    'flex items-center gap-2 rounded-full px-6 py-3 text-base font-bold capitalize',
                    'bg-emerald-800 text-white transition-all',
                    'hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none',
                  )}
                >
                  {getPlatformIcon(repo.platform)}
                  <span>
                    {repo.type[locale as keyof typeof repo.type] ||
                      repo.type.pt}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
