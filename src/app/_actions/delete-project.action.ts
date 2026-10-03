'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { StorageService } from '@/app/_lib/storage/r2-storage'

export async function deleteProjectAction(projectId: string) {
  try {
    const validatedProjectId = z.string().trim().min(1).parse(projectId)
    const project = await db.project.findUnique({
      where: {
        id: validatedProjectId,
      },
      include: {
        gallery: true,
      },
    })

    if (!project) {
      return {
        success: false,
        error: 'Project not found.',
      }
    }

    for (const image of project.gallery) {
      await StorageService.delete(image.url)
    }

    await db.project.delete({
      where: {
        id: validatedProjectId,
      },
    })

    revalidatePath('/admin/projects')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error deleting project:', error)

    return {
      success: false,
      error: 'Internal error deleting project.',
    }
  }
}
