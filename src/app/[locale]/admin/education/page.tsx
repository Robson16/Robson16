import { Link } from '@/app/_i18n/navigation'
import { db } from '@/app/_lib/prisma'

import EducationTable from './_components/EducationTable'

interface EducationPageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function EducationPage({ params }: EducationPageProps) {
  const { locale } = await params

  const rawEducationList = await db.education.findMany({
    include: {
      translations: true,
    },
    orderBy: {
      startDate: 'desc',
    },
  })

  const educationData = rawEducationList.map((edu) => {
    const translation =
      edu.translations.find((t) => t.locale === locale) || edu.translations[0]

    return {
      id: edu.id,
      institution: translation?.institution || 'Institution not set',
      title: translation?.title || 'Title not set',
      startDate: edu.startDate,
      endDate: edu.endDate,
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-zinc-100">Education</h2>
        <Link
          href="/admin/education/new"
          className="rounded-full bg-emerald-800 px-6 py-2.5 font-bold text-white transition-all hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        >
          + New Education
        </Link>
      </div>

      <EducationTable educationList={educationData} currentLocale={locale} />
    </div>
  )
}
