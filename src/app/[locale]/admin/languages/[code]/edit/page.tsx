import { notFound } from 'next/navigation'

import { db } from '@/app/_lib/prisma'

import LanguageForm from '../../_components/LanguageForm'

interface EditLanguagePageProps {
  params: Promise<{
    code: string
  }>
}

export default async function EditLanguagePage({
  params,
}: EditLanguagePageProps) {
  const { code } = await params

  const language = await db.language.findUnique({
    where: {
      code,
    },
  })

  if (!language) {
    notFound()
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-4 py-10">
      <LanguageForm initialData={language} />
    </div>
  )
}
