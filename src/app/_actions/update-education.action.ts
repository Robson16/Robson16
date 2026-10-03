'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { validateTranslations } from '@/app/_utils/validate-translations'

const updateEducationSchema = z.object({
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

export type UpdateEducationInput = z.infer<typeof updateEducationSchema>

export async function updateEducationAction(
  id: string,
  updateData: UpdateEducationInput,
) {
  try {
    const data = updateEducationSchema.parse(updateData)
    const translationError = await validateTranslations(data.translations, [
      'title',
      'institution',
    ])

    if (translationError) {
      return { success: false, error: translationError }
    }

    await db.education.update({
      where: { id },
      data: {
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        order: data.order,
        translations: {
          deleteMany: { educationId: id },
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

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error updating education: ', error)

    return {
      success: false,
      error: 'Error updating education in database.',
    }
  }
}
