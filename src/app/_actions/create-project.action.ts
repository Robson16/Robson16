'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

interface TranslationInput {
  locale: string
  title: string
  description: string
}

interface CreateProjectInput {
  tier: number
  gallery?: string[]
  translations: TranslationInput[]
  skillIds: string[]
  experienceId?: string
}

export async function createProjectAction(data: CreateProjectInput) {
  try {
    await db.project.create({
      data: {
        tier: data.tier,
        gallery: {
          create: (data.gallery || []).map((url, index) => ({
            url,
            order: index,
          })),
        },
        translations: {
          create: data.translations.map((t) => ({
            locale: t.locale,
            title: t.title,
            description: t.description,
          })),
        },
        skills: {
          create: data.skillIds.map((id) => ({ skillId: id })),
        },
        experiences: data.experienceId
          ? {
              create: [{ experienceId: data.experienceId }],
            }
          : undefined,
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
