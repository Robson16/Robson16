import { db } from '@/app/_lib/prisma'

import SkillForm from '../_components/SkillForm'

export default async function NewExperiencePage() {
  const languages = await db.language.findMany({
    orderBy: {
      isDefault: 'desc',
    },
  })

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-4 py-10">
      <SkillForm languages={languages} />
    </div>
  )
}
