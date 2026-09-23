import { Link } from '@/app/_i18n/navigation'
import { db } from '@/app/_lib/prisma'

import ExperiencesTable from './_components/ExperiencesTable'

interface ExperiencesPageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function ExperiencesPage({
  params,
}: ExperiencesPageProps) {
  const { locale } = await params

  const rawExperiences = await db.experience.findMany({
    include: {
      translations: true,
    },
    orderBy: {
      startDate: 'desc',
    },
  })

  const experiences = rawExperiences.map((exp) => {
    const translation =
      exp.translations.find((t) => t.locale === locale) || exp.translations[0]

    return {
      id: exp.id,
      company: exp.company,
      role: translation?.role || 'No role set',
      startDate: exp.startDate,
      endDate: exp.endDate,
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-zinc-100">Experiences</h2>
        <Link
          href="/admin/experiences/new"
          className="rounded-full bg-emerald-800 px-6 py-2.5 font-bold text-white transition-all hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        >
          + New Experience
        </Link>
      </div>

      <ExperiencesTable experiences={experiences} currentLocale={locale} />
    </div>
  )
}
