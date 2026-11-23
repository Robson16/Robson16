'use server'

import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { revalidatePortfolioCache } from '@/app/_lib/revalidate-portfolio'

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

    const socialLink = await db.socialLink.create({
      data: {
        icon: validatedData.icon || 'link',
        name: validatedData.name,
        url: validatedData.url,
        order: nextOrder,
      },
    })

    revalidatePortfolioCache({ adminSection: 'profile' })

    return {
      success: true,
      socialLinkId: socialLink.id,
      order: socialLink.order,
    }
  } catch (error) {
    console.error('Error creating social link:', error)

    return {
      success: false,
      error: 'Error saving social link to database.',
    }
  }
}
