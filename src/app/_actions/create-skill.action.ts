'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

interface SkillTranslationInput {
  locale: string
  name: string
}

interface CreateSkillInput {
  icon: string
  category: string
  translations: SkillTranslationInput[]
}

export async function createSkillAction(data: CreateSkillInput) {
  try {
    await db.skill.create({
      data: {
        icon: data.icon,
        category: data.category,
        translations: {
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
    console.error('Error creating skill: ', error)

    return {
      success: false,
      error: 'Error saving skill to database.',
    }
  }
}
