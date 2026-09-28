'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

interface FeatureTranslationInput {
  locale: string
  title: string
  description: string
}

interface CreateFeatureInput {
  icon: string
  order: number
  translations: FeatureTranslationInput[]
}

export async function createFeatureAction(data: CreateFeatureInput) {
  try {
    await db.feature.create({
      data: {
        icon: data.icon,
        order: data.order,
        translations: {
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
    console.error('Error creating feature: ', error)

    return {
      success: false,
      error: 'Error saving feature to database.',
    }
  }
}
