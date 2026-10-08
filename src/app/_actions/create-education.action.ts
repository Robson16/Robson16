'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { validateTranslations } from '@/app/_utils/validate-translations'

const createEducationSchema = z.object({
  startDate: z.iso.date(),
  endDate: z.iso.date().nullable(),
  order: z.number().int(),
  translations: z.array(
    z.object({
      locale: z.string().trim().min(1),
      title: z.string(),
      institution: z.string(),
      description: z.string(),
    }),
  ),
})

export type CreateEducationInput = z.infer<typeof createEducationSchema>

export async function createEducationAction(inputData: CreateEducationInput) {
  try {
    const data = createEducationSchema.parse(inputData)

    const translationError = await validateTranslations(data.translations, [
      'title',
      'institution',
    ])

    if (translationError) {
      return { success: false, error: translationError }
    }

    const education = await db.education.create({
      data: {
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        order: data.order,
        translations: {
          create: data.translations.map((translation) => ({
            locale: translation.locale,
            title: translation.title,
            institution: translation.institution,
            description: translation.description,
          })),
        },
      },
    })

    revalidatePath('/admin/educations')

    return { success: true, educationId: education.id }
  } catch (error) {
    console.error('Error creating education: ', error)

    return {
      success: false,
      error: 'Error saving education to database.',
    }
  }
}
