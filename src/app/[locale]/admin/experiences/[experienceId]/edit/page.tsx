import { notFound } from 'next/navigation'

import { db } from '@/app/_lib/prisma'

import ExperienceForm from '../../_components/ExperienceForm'

interface EditExperiencePageProps {
  params: Promise<{
    experienceId: string
  }>
}

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  const { experienceId } = await params

  const experience = await db.experience.findUnique({
    where: {
      id: experienceId,
    },
    include: {
      translations: true,
    },
  })

  if (!experience) {
    notFound()
  }

  const languages = await db.language.findMany({
    orderBy: {
      isDefault: 'desc',
    },
  })

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 py-10">
      <ExperienceForm languages={languages} initialData={experience} />
    </div>
  )
}
