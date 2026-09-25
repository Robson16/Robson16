'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

export async function deleteSkillAction(id: string) {
  try {
    await db.skill.delete({
      where: { id },
    })

    revalidatePath('/admin/skill')

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
