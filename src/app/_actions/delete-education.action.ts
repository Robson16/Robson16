'use server'

import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { revalidatePortfolioCache } from '@/app/_lib/revalidate-portfolio'

export async function deleteEducationAction(id: string) {
  try {
    const validatedId = z.string().trim().min(1).parse(id)

    await db.education.delete({
      where: { id: validatedId },
    })

    revalidatePortfolioCache({ adminSection: 'education' })

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error deleting education: ', error)

    return {
      success: false,
      error: 'Error deleting education.',
    }
  }
}
