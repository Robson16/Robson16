'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'

const updateSocialLinksSchema = z.array(
  z.object({
    id: z.string().trim().min(1).optional(),
    icon: z.string(),
    name: z.string().trim().min(1),
    url: z.url(),
    order: z.number().int(),
  }),
)

export type SocialLinkInput = z.infer<typeof updateSocialLinksSchema>[number]

export async function updateSocialLinkAction(links: SocialLinkInput[]) {
  try {
    const validatedLinks = updateSocialLinksSchema.parse(links)

    await db.$transaction(async (tx) => {
      await tx.socialLink.deleteMany()

      if (validatedLinks.length > 0) {
        await tx.socialLink.createMany({
          data: validatedLinks.map((link) => ({
            icon: link.icon,
            name: link.name,
            url: link.url,
            order: link.order,
          })),
        })
      }
    })

    const socialLinks = await db.socialLink.findMany({
      orderBy: { order: 'asc' },
    })

    revalidatePath('/', 'layout')

    return {
      success: true,
      socialLinks,
    }
  } catch (error) {
    console.error('Error updating social links: ', error)

    return {
      success: false,
      error: 'Error updating social links.',
    }
  }
}
