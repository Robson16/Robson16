'use server'

import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { revalidatePortfolioCache } from '@/app/_lib/revalidate-portfolio'

const languageCodeSchema = z.string().trim().min(2).max(5)

export async function deleteLanguageAction(code: string) {
  try {
    const validatedCode = languageCodeSchema.parse(code)
    const language = await db.language.findUnique({
      where: { code: validatedCode },
    })

    if (language?.isDefault) {
      return {
        success: false,
        error:
          'Cannot delete the default language. Change the default language first.',
      }
    }

    await db.language.delete({
      where: {
        code: validatedCode,
      },
    })

    revalidatePortfolioCache({ adminSection: 'languages' })

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
