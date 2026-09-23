import { Link } from '@/app/_i18n/navigation'
import { db } from '@/app/_lib/prisma'

import SkillsTable from './_components/SkillsTable'

interface SkillsPageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function SkillsPage({ params }: SkillsPageProps) {
  const { locale } = await params

  const rawSkills = await db.skill.findMany({
    include: {
      translations: true,
      projects: true,
    },
    orderBy: {
      category: 'asc',
    },
  })

  const skills = rawSkills.map((skill) => {
    const translation =
      skill.translations.find((t) => t.locale === locale) ||
      skill.translations[0]

    return {
      id: skill.id,
      name: translation?.name || 'No name',
      category: skill.category || 'Uncategorized',
      icon: skill.icon || '',
      projectsCount: skill.projects.length,
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-zinc-100">Skills</h2>
        <Link
          href="/admin/skills/new"
          className="rounded-full bg-emerald-800 px-6 py-2.5 font-bold text-white transition-all hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        >
          + New Skill
        </Link>
      </div>

      <SkillsTable skills={skills} />
    </div>
  )
}
