'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

export async function deleteFeatureAction(id: string) {
  try {
    await db.feature.delete({
      where: { id },
    })

    revalidatePath('/admin/features')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error deleting feature: ', error)

    return {
      success: false,
      error: 'Error deleting feature.',
    }
  }
}
