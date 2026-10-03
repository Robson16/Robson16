'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'

export async function deleteFeatureAction(id: string) {
  try {
    const validatedId = z.string().trim().min(1).parse(id)

    await db.feature.delete({
      where: { id: validatedId },
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
