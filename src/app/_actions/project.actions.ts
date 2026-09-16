'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

interface CreateProjectInput {
  titlePt: string
  titleEn: string
  descriptionPt: string
  descriptionEn: string
  imageUrl: string
  tier: number
}

export async function createProjectAction(data: CreateProjectInput) {
  try {
    await db.project.create({
      data: {
        image: data.imageUrl,
        tier: data.tier,
        translations: {
          create: [
            {
              locale: 'pt',
              title: data.titlePt,
              description: data.descriptionPt,
            },
            {
              locale: 'en',
              title: data.titleEn,
              description: data.descriptionEn,
            },
          ],
        },
      },
    })

    revalidatePath('/admin')

    return { success: true }
  } catch (error) {
    console.error('Error creating project:', error)
    return {
      success: false,
      error: 'Error saving project to database.',
    }
  }
}
