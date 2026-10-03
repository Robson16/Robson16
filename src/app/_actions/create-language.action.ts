'use server'

import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'

const createLanguageSchema = z.object({
  code: z.string().trim().min(2).max(5),
  name: z.string().trim().min(1),
  isDefault: z.boolean(),
})

export type CreateLanguageInput = z.infer<typeof createLanguageSchema>

export async function createLanguageAction(data: CreateLanguageInput) {
  try {
    const validatedData = createLanguageSchema.parse(data)

    if (validatedData.isDefault) {
      await db.language.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      })
    }

    await db.language.create({
      data: {
        code: validatedData.code.toLowerCase(),
        name: validatedData.name,
        isDefault: validatedData.isDefault,
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
