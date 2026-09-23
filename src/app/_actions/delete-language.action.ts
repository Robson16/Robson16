'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

export async function deleteLanguageAction(code: string) {
  try {
    const language = await db.language.findUnique({ where: { code } })

    if (language?.isDefault) {
      return {
        success: false,
        error:
          'Cannot delete the default language. Change the default language first.',
      }
    }

    await db.language.delete({
      where: {
        code,
      },
    })

    revalidatePath('/admin/languages')

    return {
      success: true,
    }
  } catch (error: unknown) {
    console.error('Error deleting language: ', error)

    return {
      success: false,
      error: 'Error deleting language.',
    }
  }
}
