'use server'

import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

interface CreateLanguageInput {
  code: string
  name: string
  isDefault: boolean
}

export async function createLanguageAction(data: CreateLanguageInput) {
  try {
    // If the new language is the default, we remove the default status from all others.
    if (data.isDefault) {
      await db.language.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      })
    }

    await db.language.create({
      data: {
        code: data.code.toLowerCase(),
        name: data.name,
        isDefault: data.isDefault,
      },
    })

    revalidatePath('/admin/languages')

    return { success: true }
  } catch (error: unknown) {
    console.error('Error creating language: ', error)

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'A language with this code already exists.',
        }
      }
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: `Error saving language: ${error.message}`,
      }
    }

    return {
      success: false,
      error: 'An unexpected error occurred.',
    }
  }
}
