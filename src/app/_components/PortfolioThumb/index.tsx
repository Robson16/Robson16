'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { PiArrowUpRightBold } from 'react-icons/pi'

import { Link } from '@/app/_i18n/navigation'

import { PortfolioProject } from '../PortfolioSection'

interface PortfolioThumbProps {
  locale: string
  project: PortfolioProject
}

export default function PortfolioThumb({
  locale,
  project,
}: PortfolioThumbProps) {
  const tPortfolio = useTranslations('Portfolio')

  const featuredImage = project.gallery?.[0]?.url || '/images/placeholder.jpg'
  const translation =
    project.translations.find((t) => t.locale === locale) ||
    project.translations[0]

  if (!translation) return null

  // Formata a data de desenvolvimento (developedAt) para o idioma atual
  const rawDate = new Date(project.developedAt).toLocaleDateString(locale, {
    month: 'short',
    year: 'numeric',
  })
  const formattedDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1)

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={clsx(
        'group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50',
        'transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl',
        'focus-visible:rounded-xl focus-visible:ring-4 focus-visible:ring-emerald-600 focus-visible:outline-none',
      )}
    >
      {/* Imagem de Capa do Projeto com efeito de zoom no hover */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
        <Image
          src={featuredImage}
          alt={translation.title}
          width={1200}
          height={900}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge da Data de Desenvolvimento flutuante */}
        <div className="absolute top-3 left-3 rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 backdrop-blur-md">
          {formattedDate}
        </div>
      </div>

      {/* Conteúdo textual do Card */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <h4 className="text-xl font-bold text-white transition-colors group-hover:text-emerald-400">
              {translation.title}
            </h4>
            <PiArrowUpRightBold
              size={20}
              className="shrink-0 text-zinc-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400"
            />
          </div>

          <p className="line-clamp-2 text-sm text-zinc-400">
            {translation.description}
          </p>
        </div>

        {/* Rodapé do Card com Tags de Tecnologias (Skills) */}
        {project.skills && project.skills.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5 border-t border-zinc-800/80 pt-4">
            {project.skills.slice(0, 3).map((ps) => {
              const skillName =
                ps.skill.translations.find((t) => t.locale === locale)?.name ||
                ps.skill.translations[0]?.name ||
                'Unknown'
              return (
                <span
                  key={ps.skillId}
                  className="rounded-md border border-emerald-600/30 bg-emerald-950/30 px-2.5 py-0.5 text-xs text-emerald-400"
                >
                  {skillName}
                </span>
              )
            })}
            {project.skills.length > 3 && (
              <span className="self-center px-1 text-xs text-zinc-500">
                +{project.skills.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
