'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

export async function deleteSocialLink(id: string) {
  try {
    await db.socialLink.delete({
      where: { id },
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
