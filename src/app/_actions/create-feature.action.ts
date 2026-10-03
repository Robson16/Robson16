'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { validateTranslations } from '@/app/_utils/validate-translations'

const createFeatureSchema = z.object({
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

export type CreateFeatureInput = z.infer<typeof createFeatureSchema>

export async function createFeatureAction(data: CreateFeatureInput) {
  try {
    const validatedData = createFeatureSchema.parse(data)
    const translationError = await validateTranslations(
      validatedData.translations,
    )

    if (translationError) {
      return { success: false, error: translationError }
    }

    await db.feature.create({
      data: {
        icon: validatedData.icon,
        order: validatedData.order,
        translations: {
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
    console.error('Error creating feature: ', error)

    return {
      success: false,
      error: 'Error saving feature to database.',
    }
  }
}
