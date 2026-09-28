import { db } from '@/app/_lib/prisma'

import EducationForm from '../_components/EducationForm'

export default async function NewEducationPage() {
  const languages = await db.language.findMany({
    orderBy: {
      isDefault: 'desc',
    },
  })

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-4 py-10">
      <EducationForm languages={languages} />
    </div>
  )
}
