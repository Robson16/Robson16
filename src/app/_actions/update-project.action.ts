'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'
import { StorageService } from '@/app/_lib/storage/r2-storage'

interface TranslationInput {
  locale: string
  title: string
  description: string
}

interface LinkInput {
  type: string
  url: string
}

interface UpdateProjectInput {
  tier: number
  gallery?: string[]
  translations: TranslationInput[]
  skillIds: string[]
  links?: LinkInput[]
  experienceId?: string
}

export async function updateProjectAction(
  projectId: string,
  data: UpdateProjectInput,
) {
  try {
    const existingProject = await db.project.findUnique({
      where: {
        id: projectId,
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
        where: { projectId },
      })
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
            projectId,
          },
          create: data.translations.map((translation) => ({
            locale: translation.locale,
            title: translation.title,
            description: translation.description,
          })),
        },
        skills: {
          deleteMany: {
            projectId,
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
            type: link.type,
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
    revalidatePath(`/[locale]/admin/projects/${projectId}/edit`, 'page')

    return { success: true }
  } catch (error) {
    console.error('Error updating project:', error)
    return {
      success: false,
      error: 'Internal error updating project.',
    }
  }
}
