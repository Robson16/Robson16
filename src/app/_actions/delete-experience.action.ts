'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

export async function deleteExperienceAction(id: string) {
  try {
    await db.experience.delete({
      where: { id },
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
