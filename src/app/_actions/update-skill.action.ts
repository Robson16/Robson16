'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

interface SkillTranslationInput {
  locale: string
  name: string
}

interface UpdateSkillInput {
  icon: string
  category: string
  translations: SkillTranslationInput[]
}

export async function updateSkillAction(id: string, data: UpdateSkillInput) {
  try {
    await db.skill.update({
      where: { id },
      data: {
        icon: data.icon,
        category: data.category,
        translations: {
          deleteMany: { skillId: id },
          create: data.translations.map((translation) => ({
            locale: translation.locale,
            name: translation.name,
          })),
        },
      },
    })

    revalidatePath('/admin/skills')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error updating skill: ', error)

    return {
      success: false,
      error: 'Error updating skill in database.',
    }
  }
}
