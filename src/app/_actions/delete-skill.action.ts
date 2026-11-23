'use server'

import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { revalidatePortfolioCache } from '@/app/_lib/revalidate-portfolio'

export async function deleteSkillAction(id: string) {
  try {
    const validatedId = z.string().trim().min(1).parse(id)

    await db.skill.delete({
      where: { id: validatedId },
    })

    revalidatePortfolioCache({ adminSection: 'skills' })

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error deleting skill: ', error)

    return {
      success: false,
      error: 'Error deleting skill.',
    }
  }
}
