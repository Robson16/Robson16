import { notFound } from 'next/navigation'

import { db } from '@/app/_lib/prisma'

import SkillForm from '../../_components/SkillForm'

interface EditSkillPageProps {
  params: Promise<{
    skillId: string
  }>
}

export default async function EditSkillPage({ params }: EditSkillPageProps) {
  const { skillId } = await params

  const skill = await db.skill.findUnique({
    where: {
      id: skillId,
    },
    include: {
      translations: true,
    },
  })

  if (!skill) {
    notFound()
  }

  const languages = await db.language.findMany({
    orderBy: {
      isDefault: 'desc',
    },
  })

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center p-4 py-10">
      <SkillForm languages={languages} initialData={skill} />
    </div>
  )
}
