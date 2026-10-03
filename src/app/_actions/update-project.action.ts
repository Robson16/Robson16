'use server'

import { ProjectLinkType } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { StorageService } from '@/app/_lib/storage/r2-storage'
import { validateTranslations } from '@/app/_utils/validate-translations'

const ProjectLinkTypeValues = Object.values(ProjectLinkType) as [
  string,
  ...string[],
]

const updateProjectSchema = z.object({
  tier: z.number().int(),
  gallery: z.array(z.string().url()).optional(),
  existingGalleryOrder: z.array(z.string().trim().min(1)).optional(),
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

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>

export async function updateProjectAction(
  projectId: string,
  inputData: UpdateProjectInput,
) {
  try {
    const validatedProjectId = z.string().trim().min(1).parse(projectId)
    const data = updateProjectSchema.parse(inputData)
    const translationError = await validateTranslations(data.translations, [
      'title',
      'description',
    ])

    if (translationError) {
      return { success: false, error: translationError }
    }

    const existingProject = await db.project.findUnique({
      where: {
        id: validatedProjectId,
      },
      include: {
        gallery: true,
      },
    })

    if (!existingProject) {
      return {
        success: false,
        error: 'Project not found.',
      }
    }

    // If the user uploaded new images, we deleted the old ones.
    if (data.gallery && data.gallery.length > 0) {
      for (const oldImage of existingProject.gallery) {
        await StorageService.delete(oldImage.url)
      }

      await db.projectImage.deleteMany({
        where: { projectId: validatedProjectId },
      })
    } else if (
      data.existingGalleryOrder &&
      data.existingGalleryOrder.length > 0
    ) {
      for (let i = 0; i < data.existingGalleryOrder.length; i++) {
        const imageId = data.existingGalleryOrder[i]

        await db.projectImage.update({
          where: { id: imageId },
          data: { order: i },
        })
      }
    }

    await db.project.update({
      where: {
        id: projectId,
      },
      data: {
        tier: data.tier,
        ...(data.gallery &&
          data.gallery.length > 0 && {
            gallery: {
              create: data.gallery.map((url, index) => ({
                url,
                order: index,
              })),
            },
          }),
        translations: {
          deleteMany: {
            projectId: validatedProjectId,
          },
          create: data.translations.map((translation) => ({
            locale: translation.locale,
            title: translation.title,
            description: translation.description,
            challenge: translation.challenge || undefined,
            solution: translation.solution || undefined,
            impact: translation.impact || undefined,
          })),
        },
        skills: {
          deleteMany: {
            projectId: validatedProjectId,
          },
          create: data.skillIds.map((skillId) => ({
            skillId,
          })),
        },
        links: {
          deleteMany: {
            projectId,
          },
          create: (data.links || []).map((link) => ({
            type: link.type as ProjectLinkType,
            url: link.url,
          })),
        },
        experiences: {
          deleteMany: {
            projectId,
          },
          ...(data.experienceId && {
            create: [{ experienceId: data.experienceId }],
          }),
        },
      },
    })

    revalidatePath('/admin/projects')
    revalidatePath(
      `/[locale]/admin/projects/${validatedProjectId}/edit`,
      'page',
    )

    return { success: true }
  } catch (error) {
    console.error('Error updating project:', error)
    return {
      success: false,
      error: 'Internal error updating project.',
    }
  }
}
