import { ProjectLinkType } from '@prisma/client'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import Header from '@/app/_components/Header'
import { PlatformIcon } from '@/app/_components/PlatformIcon'
import { db } from '@/app/_lib/prisma'

import ProjectImageModal from './_components/ProjectImageModal'

interface ProjectPageProps {
  params: Promise<{
    locale: string
    projectId: string
  }>
}

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

  function getLinkLabel(type: ProjectLinkType) {
    switch (type) {
      case ProjectLinkType.GITHUB:
        return t('links.github')
      case ProjectLinkType.GITLAB:
        return t('links.gitlab')
      case ProjectLinkType.FIGMA:
        return t('links.figma')
      case ProjectLinkType.YOUTUBE:
        return t('links.youtube')
      case ProjectLinkType.WEBSITE:
        return t('links.website')
      default:
        return t('links.other')
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

          {/* Imagem Principal (Hero) */}
          {project.gallery.length > 0 && (
            <ProjectImageModal
              src={project.gallery[0].url}
              alt={`Hero image for ${translation.title}`}
              triggerClassName="relative mb-16 block aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-800 shadow-2xl"
              imageClassName="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          )}

          {/* Layout Grid do Estudo de Caso */}
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

              {translation.impact && (
                <section className="mb-12">
                  <h3 className="mb-4 text-2xl font-semibold text-white">
                    {t('impact')}
                  </h3>
                  <div className="max-w-none text-zinc-300">
                    <p className="whitespace-pre-wrap">{translation.impact}</p>
                  </div>
                </section>
              )}
            </div>

            {/* Coluna Lateral: Detalhes Técnicos e Links */}
            <div className="flex h-fit flex-col gap-8 rounded-xl bg-zinc-900/50 p-6 shadow-inner">
              {/* Links Dinâmicos */}
              {project.links.length > 0 && (
                <div className="flex flex-col gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <PlatformIcon platform={link.type} size={20} />
                      {getLinkLabel(link.type)}
                    </a>
                  ))}
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

          {/* Galeria Completa (Pula a primeira imagem que já está no Hero) */}
          {project.gallery.length > 1 && (
            <section className="mt-20 border-t border-zinc-800/50 pt-16">
              <h2 className="mb-12 text-center text-3xl font-semibold text-white">
                {t('gallery')}
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.slice(1).map((image) => (
                  <ProjectImageModal
                    key={image.id}
                    src={image.url}
                    alt={`${translation.title} gallery image`}
                    triggerClassName="group relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 shadow-lg"
                    imageClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  )
}
