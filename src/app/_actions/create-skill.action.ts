'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { validateTranslations } from '@/app/_utils/validate-translations'

const createSkillSchema = z.object({
  icon: z.string(),
  category: z.string().trim().min(1),
  translations: z.array(
    z.object({
      locale: z.string().trim().min(1),
      name: z.string(),
    }),
  ),
})

export type CreateSkillInput = z.infer<typeof createSkillSchema>

export async function createSkillAction(data: CreateSkillInput) {
  try {
    const validatedData = createSkillSchema.parse(data)
    const translationError = await validateTranslations(
      validatedData.translations,
      ['name'],
    )

    if (translationError) {
      return { success: false, error: translationError }
    }

    const skill = await db.skill.create({
      data: {
        icon: validatedData.icon,
        category: validatedData.category,
        translations: {
          create: validatedData.translations.map((translation) => ({
            locale: translation.locale,
            name: translation.name,
          })),
        },
      },
    })

    revalidatePath('/admin/skills')

    return { success: true, skillId: skill.id }
  } catch (error) {
    console.error('Error creating skill: ', error)

    return {
      success: false,
      error: 'Error saving skill to database.',
    }
  }
}
