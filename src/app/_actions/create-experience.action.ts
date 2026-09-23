'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

interface ExperienceTranslationInput {
  locale: string
  role: string
  description: string
}

interface CreateExperienceInput {
  company: string
  startDate: string
  endDate?: string | null
  translations: ExperienceTranslationInput[]
}

export async function createExperienceAction(data: CreateExperienceInput) {
  try {
    await db.experience.create({
      data: {
        company: data.company,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        translations: {
          create: data.translations.map((translation) => ({
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
