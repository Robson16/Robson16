'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { validateTranslations } from '@/app/_utils/validate-translations'

const updateFeatureSchema = z.object({
  icon: z.string().trim().min(1),
  order: z.number().int(),
  translations: z.array(
    z.object({
      locale: z.string().trim().min(1),
      title: z.string(),
      description: z.string(),
    }),
  ),
})

export type UpdateFeatureInput = z.infer<typeof updateFeatureSchema>

export async function updateFeatureAction(
  id: string,
  data: UpdateFeatureInput,
) {
  try {
    const validatedId = z.string().trim().min(1).parse(id)
    const validatedData = updateFeatureSchema.parse(data)
    const translationError = await validateTranslations(
      validatedData.translations,
    )

    if (translationError) {
      return { success: false, error: translationError }
    }

    await db.feature.update({
      where: { id: validatedId },
      data: {
        icon: validatedData.icon,
        order: validatedData.order,
        translations: {
          deleteMany: { featureId: validatedId },
          create: validatedData.translations.map((translation) => ({
            locale: translation.locale,
            title: translation.title,
            description: translation.description,
          })),
        },
      },
    })

    revalidatePath('/admin/features')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error updating feature: ', error)

    return {
      success: false,
      error: 'Error updating feature in database.',
    }
  }
}
