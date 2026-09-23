import { Link } from '@/app/_i18n/navigation'
import { db } from '@/app/_lib/prisma'

import LanguagesTable from './_components/LanguagesTable'

export default async function LanguagesPage() {
  const languages = await db.language.findMany({
    orderBy: [
      {
        isDefault: 'desc',
      },
      {
        name: 'asc',
      },
    ],
  })

  const formattedLanguages = languages.map((lang) => ({
    code: lang.code,
    name: lang.name,
    isDefault: lang.isDefault,
  }))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-zinc-100">Languages</h2>
        <Link
          href="/admin/languages/new"
          className="rounded-full bg-emerald-800 px-6 py-2.5 font-bold text-white transition-all hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        >
          + New Language
        </Link>
      </div>

      <LanguagesTable languages={formattedLanguages} />
    </div>
  )
}
