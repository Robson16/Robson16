import { notFound } from 'next/navigation'

import { db } from '@/app/_lib/prisma'

import EducationForm from '../../_components/EducationForm'

interface EditEducationPageProps {
  params: Promise<{
    educationId: string
  }>
}

export default async function EditEducationPage({
  params,
}: EditEducationPageProps) {
  const { educationId } = await params

  const education = await db.education.findUnique({
    where: {
      id: educationId,
    },
    include: {
      translations: true,
    },
  })

  if (!education) {
    notFound()
  }

  const languages = await db.language.findMany({
    orderBy: {
      isDefault: 'desc',
    },
  })

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-4 py-10">
      <EducationForm languages={languages} initialData={education} />
    </div>
  )
}
