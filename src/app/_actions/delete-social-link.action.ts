'use server'

import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { revalidatePortfolioCache } from '@/app/_lib/revalidate-portfolio'

export async function deleteSocialLinkAction(id: string) {
  try {
    const validatedId = z.string().trim().min(1).parse(id)

    await db.socialLink.delete({
      where: { id: validatedId },
    })

    revalidatePortfolioCache({ adminSection: 'profile' })

    return { success: true }
  } catch (error) {
    console.error('Error deleting social link: ', error)

    return {
      success: false,
      error: 'Error deleting social link.',
    }
  }
}
