import { Link } from '@/app/_i18n/navigation'
import { db } from '@/app/_lib/prisma'

import ProjectsTable from './_components/ProjectsTable'

interface ProjectsListPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{
    sort?: string
    dir?: string
  }>
}

export default async function ProjectsListPage({
  params,
  searchParams,
}: ProjectsListPageProps) {
  const { locale } = await params
  const resolvedSearchParams = await searchParams

  const sortBy = resolvedSearchParams.sort || 'tier'
  const sortDir = resolvedSearchParams.dir === 'desc' ? 'desc' : 'asc'

  const rawProjects = await db.project.findMany({
    include: {
      gallery: {
        where: { order: 0 },
        take: 1,
      },
      translations: {
        where: { locale },
      },
      skills: true,
    },
  })

  let formattedProjects = rawProjects.map((project) => ({
    id: project.id,
    tier: project.tier,
    title: project.translations[0]?.title || 'Untitled Project',
    thumbnailUrl: project.gallery[0]?.url,
    skillsCount: project.skills.length,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  }))

  formattedProjects = formattedProjects.sort((a, b) => {
    let key = sortBy as keyof typeof a

    if (sortBy === 'createdAt') key = 'createdAt'
    if (sortBy === 'updatedAt') key = 'updatedAt'

    let valueA = a[key]
    let valueB = b[key]

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      valueA = valueA.toLowerCase()
      valueB = valueB.toLowerCase()
    }

    if (valueA < valueB) return sortDir === 'asc' ? -1 : 1
    if (valueA > valueB) return sortDir === 'asc' ? 1 : -1

    return 0
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-zinc-100">Projects</h2>
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-emerald-800 px-6 py-2 text-sm font-bold text-white transition-all hover:bg-emerald-700"
        >
          + Add New Project
        </Link>
      </div>

      <ProjectsTable
        projects={formattedProjects}
        currentSort={sortBy}
        currentDir={sortDir}
        currentLocale={locale}
      />
    </div>
  )
}
