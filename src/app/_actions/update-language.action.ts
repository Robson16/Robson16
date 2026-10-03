'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'

const languageCodeSchema = z.string().trim().min(2).max(5)
const updateLanguageSchema = z.object({
  name: z.string().trim().min(1),
  isDefault: z.boolean(),
})

export type UpdateLanguageInput = z.infer<typeof updateLanguageSchema>

export async function updateLanguageAction(
  code: string,
  data: UpdateLanguageInput,
) {
  try {
    const validatedCode = languageCodeSchema.parse(code)
    const validatedData = updateLanguageSchema.parse(data)

    // If the user is marking THIS language as the new default
    if (validatedData.isDefault) {
      // Remove o status de padrão de todos os outros idiomas primeiro
      await db.language.updateMany({
        where: { isDefault: true, code: { not: validatedCode } },
        data: { isDefault: false },
      })
    } else {
      // Security lock: Prevent the user from "unchecking" the single default language.
      const currentLanguage = await db.language.findUnique({
        where: {
          code: validatedCode,
        },
      })

      if (currentLanguage?.isDefault && !validatedData.isDefault) {
        return {
          success: false,
          error:
            'You cannot remove the default status from this language. Set another language as default first.',
        }
      }
    }

    await db.language.update({
      where: { code: validatedCode },
      data: {
        name: validatedData.name,
        isDefault: validatedData.isDefault,
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
