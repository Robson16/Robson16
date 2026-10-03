'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { validateTranslations } from '@/app/_utils/validate-translations'

const createExperienceSchema = z.object({
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

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>

export async function createExperienceAction(data: CreateExperienceInput) {
  try {
    const validatedData = createExperienceSchema.parse(data)
    const translationError = await validateTranslations(
      validatedData.translations,
      ['role'],
    )

    if (translationError) {
      return { success: false, error: translationError }
    }

    await db.experience.create({
      data: {
        company: validatedData.company,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        translations: {
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
    console.error('Error creating experience: ', error)

    return {
      success: false,
      error: 'Error saving experience to database.',
    }
  }
}
