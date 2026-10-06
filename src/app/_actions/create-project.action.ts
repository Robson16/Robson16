'use server'

import { ProjectLinkType } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { validateTranslations } from '@/app/_utils/validate-translations'

import { generateSlug } from '../_utils/generate-slug'

const ProjectLinkTypeValues = Object.values(ProjectLinkType) as [
  string,
  ...string[],
]

const createProjectSchema = z.object({
  tier: z.number().int(),
  gallery: z.array(z.string().url()).optional(),
  translations: z.array(
    z.object({
      locale: z.string().trim().min(1),
      title: z.string(),
      description: z.string(),
      challenge: z.string().optional(),
      solution: z.string().optional(),
      impact: z.string().optional(),
    }),
  ),
  skillIds: z.array(z.string().trim().min(1)),
  links: z
    .array(
      z.object({
        type: z.enum(ProjectLinkTypeValues),
        url: z.string().url({ message: 'Invalid URL format' }),
      }),
    )
    .optional(),
  experienceId: z.string().optional(),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>

export async function createProjectAction(inputData: CreateProjectInput) {
  try {
    const data = createProjectSchema.parse(inputData)

    const translationError = await validateTranslations(data.translations, [
      'title',
      'description',
    ])

    if (translationError) {
      return {
        success: false,
        error: translationError,
      }
    }

    const defaultLanguage = await db.language.findFirst({
      where: {
        isDefault: true,
      },
      select: {
        code: true,
      },
    })

    if (!defaultLanguage) {
      return {
        success: false,
        error: 'No default language is configured.',
      }
    }

    const defaultTranslation = data.translations.find(
      (translation) => translation.locale === defaultLanguage.code,
    )

    if (!defaultTranslation) {
      return {
        success: false,
        error: 'A translation for the default language is required.',
      }
    }

    const baseSlug = generateSlug(defaultTranslation.title)
    let finalSlug = baseSlug
    let isUnique = false
    let suffix = 1

    while (!isUnique) {
      const existing = await db.project.findUnique({
        where: {
          slug: finalSlug,
        },
      })

      if (!existing) {
        isUnique = true
      } else {
        finalSlug = `${baseSlug}-${suffix}`
        suffix++
      }
    }

    await db.project.create({
      data: {
        slug: finalSlug,
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
            challenge: t.challenge || undefined,
            solution: t.solution || undefined,
            impact: t.impact || undefined,
          })),
        },
        skills: {
          create: data.skillIds.map((id) => ({ skillId: id })),
        },
        links: {
          create: (data.links || []).map((link) => ({
            type: link.type as ProjectLinkType,
            url: link.url,
          })),
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
