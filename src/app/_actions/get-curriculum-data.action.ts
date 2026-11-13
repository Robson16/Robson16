'use server'

import { db } from '@/app/_lib/prisma'

export async function getCurriculumData(locale: string) {
  const profile = await db.profile.findFirstOrThrow({
    include: {
      translations: {
        where: {
          locale,
        },
      },
    },
  })

  const socialLinks = await db.socialLink.findMany({
    orderBy: {
      order: 'asc',
    },
  })

  const experiences = await db.experience.findMany({
    include: {
      translations: {
        where: {
          locale,
        },
      },
    },
    orderBy: {
      startDate: 'desc',
    },
  })

  const educations = await db.education.findMany({
    include: {
      translations: {
        where: {
          locale,
        },
      },
    },
    orderBy: {
      startDate: 'desc',
    },
  })

  const skills = await db.skill.findMany({
    include: {
      translations: {
        where: {
          locale,
        },
      },
    },
  })

  const sortedSkills = skills.sort((a, b) => {
    const nameA = a.translations[0]?.name || ''
    const nameB = b.translations[0]?.name || ''
    return nameA.localeCompare(nameB, locale)
  })

  return {
    profile,
    socialLinks,
    experiences,
    educations,
    skills: sortedSkills,
  }
}
