'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

interface ExperienceTranslationInput {
  locale: string
  role: string
  description: string
}

interface UpdateExperienceInput {
  company: string
  startDate: string
  endData?: string | null
  translations: ExperienceTranslationInput[]
}

export async function updateExperienceAction(
  id: string,
  data: UpdateExperienceInput,
) {
  try {
    await db.experience.update({
      where: { id },
      data: {
        company: data.company,
        startDate: new Date(data.startDate),
        endDate: data.endData ? new Date(data.endData) : null,
        translations: {
          deleteMany: { experienceId: id },
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
    console.error('Error updating experience: ', error)

    return {
      success: false,
      error: 'Error updating experience in database.',
    }
  }
}
