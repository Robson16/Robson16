'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

interface FeatureTranslationInput {
  locale: string
  title: string
  description: string
}

interface UpdateFeatureInput {
  icon: string
  order: number
  translations: FeatureTranslationInput[]
}

export async function updateFeatureAction(
  id: string,
  data: UpdateFeatureInput,
) {
  try {
    await db.feature.update({
      where: { id },
      data: {
        icon: data.icon,
        order: data.order,
        translations: {
          deleteMany: { featureId: id },
          create: data.translations.map((translation) => ({
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
