import { db } from '@/app/_lib/prisma'

import ExperienceForm from '../_components/ExperienceForm'

export default async function NewExperiencePage() {
  const languages = await db.language.findMany({
    orderBy: {
      isDefault: 'desc',
    },
  })

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 py-10">
      <ExperienceForm languages={languages} />
    </div>
  )
}
