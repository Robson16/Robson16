import { notFound } from 'next/navigation'

import { db } from '@/app/_lib/prisma'

import ProjectForm from '../../_components/ProjectForm'

interface EditProjectPageProps {
  params: Promise<{
    projectId: string
  }>
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { projectId } = await params

  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      translations: true,
      gallery: {
        orderBy: {
          order: 'asc',
        },
      },
      skills: true,
      links: true,
      experiences: true,
    },
  })

  if (!project) {
    notFound()
  }

  const languages = await db.language.findMany({
    orderBy: { isDefault: 'desc' },
  })

  const rawSkills = await db.skill.findMany({
    include: {
      translations: {
        where: { locale: 'pt' },
      },
    },
  })

  const skills = rawSkills.map((skill) => ({
    id: skill.id,
    name: skill.translations[0]?.name || 'Unknown',
  }))

  const experiences = await db.experience.findMany({
    select: { id: true, company: true },
  })

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 py-10">
      <ProjectForm
        initialData={project}
        languages={languages}
        skills={skills}
        experiences={experiences}
      />
    </div>
  )
}
