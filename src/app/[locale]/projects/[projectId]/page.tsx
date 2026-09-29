import { ProjectLinkType } from '@prisma/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import DynamicIcon from '@/app/_components/DynamicIcon'
import Header from '@/app/_components/Header'
import iconsData from '@/app/_data/icons.json'
import { db } from '@/app/_lib/prisma'

interface ProjectPageProps {
  params: Promise<{
    locale: string
    projectId: string
  }>
}

type IconKey = keyof typeof iconsData.icons

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, projectId } = await params
  const t = await getTranslations('ProjectDetails')

  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      translations: {
        where: {
          locale,
        },
      },
      gallery: {
        orderBy: {
          order: 'asc',
        },
      },
      skills: {
        include: {
          skill: {
            include: {
              translations: {
                where: {
                  locale,
                },
              },
            },
          },
        },
      },
      links: true,
      experiences: true,
    },
  })

  if (!project || project.translations.length === 0) {
    notFound()
  }

  const translation = project.translations[0]

  function getLinkConfig(type: ProjectLinkType) {
    const iconKey = type.toLowerCase() as IconKey
    const iconConfig = iconsData.icons[iconKey]

    if (!iconConfig) {
      console.warn(`Icon not found in JSON for type: ${type}`)
      return {
        ...iconsData.icons['other'],
        label: t('links.other'),
      }
    }

    let label = t('links.other')

    switch (type) {
      case ProjectLinkType.GITHUB:
        label = t('links.github')
        break
      case ProjectLinkType.GITLAB:
        label = t('links.gitlab')
        break
      case ProjectLinkType.FIGMA:
        label = t('links.figma')
        break
      case ProjectLinkType.YOUTUBE:
        label = t('links.youtube')
        break
      case ProjectLinkType.WEBSITE:
        label = t('links.website')
        break
    }

    return {
      ...iconConfig,
      label,
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-950 pt-32 pb-20">
        <div className="container mx-auto max-w-5xl px-4">
          {/* Cabeçalho */}
          <div className="mb-12 text-center md:text-left">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              {translation.title}
            </h1>
          </div>

          {/* Imagem Principal */}
          {project.gallery.length > 0 && (
            <div className="relative mb-16 w-full overflow-hidden rounded-xl border border-zinc-800 shadow-2xl">
              <Image
                src={project.gallery[0].url}
                alt={`Hero image for ${translation.title}`}
                width={1200}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          )}

          {/* Layout Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Coluna Principal: Sobre o Projeto */}
            <div className="lg:col-span-2">
              <section className="mb-12">
                <h2 className="mb-6 text-3xl font-semibold text-emerald-500">
                  {t('aboutProject')}
                </h2>
                <div className="max-w-none text-zinc-300">
                  <p className="whitespace-pre-wrap">
                    {translation.description}
                  </p>
                </div>
              </section>

              {/* Seções Opcionais (Desafio, Solução) */}
              {translation.challenge && (
                <section className="mb-12">
                  <h3 className="mb-4 text-2xl font-semibold text-white">
                    {t('challenge')}
                  </h3>
                  <div className="max-w-none text-zinc-300">
                    <p className="whitespace-pre-wrap">
                      {translation.challenge}
                    </p>
                  </div>
                </section>
              )}

              {translation.solution && (
                <section className="mb-12">
                  <h3 className="mb-4 text-2xl font-semibold text-white">
                    {t('solution')}
                  </h3>
                  <div className="max-w-none text-zinc-300">
                    <p className="whitespace-pre-wrap">
                      {translation.solution}
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* Coluna Lateral: Detalhes Técnicos e Links */}
            <div className="flex h-fit flex-col gap-8 rounded-xl bg-zinc-900/50 p-6 shadow-inner">
              {/* Links Dinâmicos */}
              {project.links.length > 0 && (
                <div className="flex flex-col gap-4">
                  {project.links.map((link) => {
                    const config = getLinkConfig(link.type)
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-500"
                      >
                        <DynamicIcon
                          icon={config.name}
                          iconFamily={config.family}
                          size={18}
                        />
                        {config.label}
                      </a>
                    )
                  })}
                </div>
              )}

              {/* Tecnologias */}
              {project.skills.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-zinc-200">
                    {t('technologies')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((ps) => (
                      <span
                        key={ps.skillId}
                        className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
                      >
                        {ps.skill.translations[0]?.name || 'Tecnologia'}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
