'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'

export async function deleteSocialLinkAction(id: string) {
  try {
    const validatedId = z.string().trim().min(1).parse(id)

    await db.socialLink.delete({
      where: { id: validatedId },
    })

    revalidatePath('/', 'layout')

    return { success: true }
  } catch (error) {
    console.error('Error deleting social link: ', error)

    return {
      success: false,
      error: 'Error deleting social link.',
    }
  }
}
