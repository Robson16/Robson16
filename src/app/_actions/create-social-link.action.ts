'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'

const createSocialLinkSchema = z.object({
  icon: z.string(),
  name: z.string().trim().min(1),
  url: z.url(),
})

export type CreateSocialLinkInput = z.infer<typeof createSocialLinkSchema>

export async function createSocialLinkAction(data: CreateSocialLinkInput) {
  try {
    const validatedData = createSocialLinkSchema.parse(data)

    const lastLink = await db.socialLink.findFirst({
      orderBy: { order: 'desc' },
    })

    const nextOrder = lastLink ? lastLink.order + 1 : 1

    await db.socialLink.create({
      data: {
        icon: validatedData.icon || 'link',
        name: validatedData.name,
        url: validatedData.url,
        order: nextOrder,
      },
    })

    revalidatePath('/', 'layout')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error creating social link:', error)

    return {
      success: false,
      error: 'Error saving social link to database.',
    }
  }
}
