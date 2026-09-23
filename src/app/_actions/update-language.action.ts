'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

interface UpdateLanguageInput {
  name: string
  isDefault: boolean
}

export async function updateLanguageAction(
  code: string,
  data: UpdateLanguageInput,
) {
  try {
    // If the user is marking THIS language as the new default
    if (data.isDefault) {
      // Remove o status de padrão de todos os outros idiomas primeiro
      await db.language.updateMany({
        where: { isDefault: true, code: { not: code } },
        data: { isDefault: false },
      })
    } else {
      // Security lock: Prevent the user from "unchecking" the single default language.
      const currentLanguage = await db.language.findUnique({
        where: {
          code,
        },
      })

      if (currentLanguage?.isDefault && !data.isDefault) {
        return {
          success: false,
          error:
            'You cannot remove the default status from this language. Set another language as default first.',
        }
      }
    }

    await db.language.update({
      where: { code },
      data: {
        name: data.name,
        isDefault: data.isDefault,
      },
    })

    revalidatePath('/admin/languages')

    return { success: true }
  } catch (error: unknown) {
    console.error('Error updating language: ', error)

    if (error instanceof Error) {
      return {
        success: false,
        error: `Error updating language: ${error.message}`,
      }
    }

    return {
      success: false,
      error: 'An unexpected error occurred.',
    }
  }
}
