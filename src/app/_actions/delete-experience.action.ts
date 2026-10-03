'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'

export async function deleteExperienceAction(id: string) {
  try {
    const validatedId = z.string().trim().min(1).parse(id)

    await db.experience.delete({
      where: { id: validatedId },
    })

    revalidatePath('/admin/experiences')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error deleting experience: ', error)

    return {
      success: false,
      error: 'Error deleting experience.',
    }
  }
}
