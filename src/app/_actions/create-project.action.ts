'use server'

import { ProjectLinkType } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'

const ProjectLinkTypeValues = Object.values(ProjectLinkType) as [
  string,
  ...string[],
]

const createProjectSchema = z.object({
  tier: z.number().int(),
  gallery: z.array(z.string()).optional(),
  translations: z.array(
    z.object({
      locale: z.string(),
      title: z.string().min(1, { message: 'Title is required' }),
      description: z.string(),
      challenge: z.string().optional(),
      solution: z.string().optional(),
      impact: z.string().optional(),
    }),
  ),
  skillIds: z.array(z.string()),
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
