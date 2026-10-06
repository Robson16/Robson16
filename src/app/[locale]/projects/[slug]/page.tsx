import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { FaBriefcase } from 'react-icons/fa6'

import Header from '@/app/_components/Header'
import { PlatformIcon } from '@/app/_components/PlatformIcon'
import { db } from '@/app/_lib/prisma'
import { getProjectLinkLabel } from '@/app/_utils/get-project-link-label'

import CommitTimeline from '../_components/CommitTimeline'
import ProjectImageModal from '../_components/ProjectImageModal'

interface ProjectPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params
  const t = await getTranslations('ProjectDetails')

  const project = await db.project.findUnique({
    where: {
      slug: slug,
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
      experiences: {
        include: {
          experience: {
            select: {
              id: true,
              company: true,
              startDate: true,
              endDate: true,
              translations: {
                where: { locale },
                select: { role: true },
              },
            },
          },
        },
      },
    },
  })

  if (!project || project.translations.length === 0) {
    notFound()
  }

  const translation = project.translations[0]

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
              loading="eager"
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
                      {getProjectLinkLabel(link.type, t)}
                    </a>
                  ))}
                </div>
              )}

              {project.experiences.length > 0 && (
                <section className="border-t border-zinc-800 pt-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-200">
                    <FaBriefcase className="text-emerald-500" />
                    {t('relatedExperience')}
                  </h3>
                  <ul className="space-y-4">
                    {project.experiences.map(({ experience }) => {
                      const dateFormatter = new Intl.DateTimeFormat(locale, {
                        month: 'short',
                        year: 'numeric',
                      })

                      return (
                        <li key={experience.id}>
                          {experience.translations[0] && (
                            <p className="font-medium text-white">
                              {experience.translations[0].role}
                            </p>
                          )}
                          <p className="text-sm text-zinc-300">
                            {experience.company}
                          </p>
                          <p className="mt-1 text-xs text-zinc-500">
                            {dateFormatter.format(experience.startDate)}
                            {' - '}
                            {experience.endDate
                              ? dateFormatter.format(experience.endDate)
                              : t('present')}
                          </p>
                        </li>
                      )
                    })}
                  </ul>
                </section>
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

          {project.links.map((link) => {
            if (link.type === 'GITHUB' || link.type === 'GITLAB') {
              return <CommitTimeline key={link.id} repoUrl={link.url} />
            }
          })}
        </div>
      </main>
    </>
  )
}
