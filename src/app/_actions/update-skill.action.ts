'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { validateTranslations } from '@/app/_utils/validate-translations'

const updateSkillSchema = z.object({
  icon: z.string(),
  category: z.string().trim().min(1),
  translations: z.array(
    z.object({
      locale: z.string().trim().min(1),
      name: z.string(),
    }),
  ),
})

export type UpdateSkillInput = z.infer<typeof updateSkillSchema>

export async function updateSkillAction(id: string, data: UpdateSkillInput) {
  try {
    const validatedId = z.string().trim().min(1).parse(id)
    const validatedData = updateSkillSchema.parse(data)
    const translationError = await validateTranslations(
      validatedData.translations,
      ['name'],
    )

    if (translationError) {
      return { success: false, error: translationError }
    }

    await db.skill.update({
      where: { id: validatedId },
      data: {
        icon: validatedData.icon,
        category: validatedData.category,
        translations: {
          deleteMany: { skillId: validatedId },
          create: validatedData.translations.map((translation) => ({
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
