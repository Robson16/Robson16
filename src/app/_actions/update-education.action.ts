'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

interface EducationTranslationInput {
  locale: string
  title: string
  institution: string
  description: string
}

interface UpdateEducationInput {
  startDate: string
  endDate?: string | null
  order: number
  translations: EducationTranslationInput[]
}

export async function updateEducationAction(
  id: string,
  data: UpdateEducationInput,
) {
  try {
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
