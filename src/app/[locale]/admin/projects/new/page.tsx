import { db } from '@/app/_lib/prisma'

import ProjectForm from '../_components/ProjectForm'

export default async function NewProjectPage() {
  const languages = await db.language.findMany({
    orderBy: {
      isDefault: 'desc',
    },
  })

  const skills = await db.skill.findMany({
    include: {
      translations: {
        where: {
          locale: 'en',
        },
      },
    },
  })

  const experiences = await db.experience.findMany({
    orderBy: {
      startDate: 'desc',
    },
  })

  const formattedSkills = skills.map((skill) => ({
    id: skill.id,
    name: skill.translations[0]?.name || 'Unnamed Skill',
  }))

  const formattedExperiences = experiences.map((exp) => ({
    id: exp.id,
    company: exp.company,
  }))

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 py-10">
      <ProjectForm
        languages={languages}
        skills={formattedSkills}
        experiences={formattedExperiences}
      />
    </div>
  )
}
