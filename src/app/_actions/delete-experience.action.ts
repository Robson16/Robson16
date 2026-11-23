'use server'

import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { revalidatePortfolioCache } from '@/app/_lib/revalidate-portfolio'

export async function deleteExperienceAction(id: string) {
  try {
    const validatedId = z.string().trim().min(1).parse(id)

    await db.experience.delete({
      where: { id: validatedId },
    })

    revalidatePortfolioCache({ adminSection: 'experiences' })

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
