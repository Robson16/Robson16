'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'

export async function deleteEducationAction(id: string) {
  try {
    const validatedId = z.string().trim().min(1).parse(id)

    await db.education.delete({
      where: { id: validatedId },
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
