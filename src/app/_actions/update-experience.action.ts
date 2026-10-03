'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { validateTranslations } from '@/app/_utils/validate-translations'

const updateExperienceSchema = z.object({
  company: z.string().trim().min(1),
  startDate: z.iso.date(),
  endDate: z.iso.date().nullable(),
  translations: z.array(
    z.object({
      locale: z.string().trim().min(1),
      role: z.string(),
      description: z.string(),
    }),
  ),
})

export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>

export async function updateExperienceAction(
  id: string,
  data: UpdateExperienceInput,
) {
  try {
    const validatedId = z.string().trim().min(1).parse(id)
    const validatedData = updateExperienceSchema.parse(data)
    const translationError = await validateTranslations(
      validatedData.translations,
      ['role'],
    )

    if (translationError) {
      return { success: false, error: translationError }
    }

    await db.experience.update({
      where: { id: validatedId },
      data: {
        company: validatedData.company,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        translations: {
          deleteMany: { experienceId: validatedId },
          create: validatedData.translations.map((translation) => ({
            locale: translation.locale,
            role: translation.role,
            description: translation.description,
          })),
        },
      },
    })

    revalidatePath('/admin/experiences')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error updating experience: ', error)

    return {
      success: false,
      error: 'Error updating experience in database.',
    }
  }
}
