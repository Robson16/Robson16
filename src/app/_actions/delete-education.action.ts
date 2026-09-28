'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

export async function deleteEducationAction(id: string) {
  try {
    await db.education.delete({
      where: { id },
    })

    revalidatePath('/admin/educations')

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
