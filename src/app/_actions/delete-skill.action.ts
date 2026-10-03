'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'

export async function deleteSkillAction(id: string) {
  try {
    const validatedId = z.string().trim().min(1).parse(id)

    await db.skill.delete({
      where: { id: validatedId },
    })

    revalidatePath('/admin/skills')

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
