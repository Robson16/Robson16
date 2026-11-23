'use server'

import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { revalidatePortfolioCache } from '@/app/_lib/revalidate-portfolio'

export async function deleteFeatureAction(id: string) {
  try {
    const validatedId = z.string().trim().min(1).parse(id)

    await db.feature.delete({
      where: { id: validatedId },
    })

    revalidatePortfolioCache({ adminSection: 'profile' })

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
