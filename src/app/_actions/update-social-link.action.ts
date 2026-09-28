'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

export type SocialLinkInput = {
  id?: string
  icon: string
  name: string
  url: string
  order: number
}

export async function updateSocialLinkAction(links: SocialLinkInput[]) {
  try {
    await db.$transaction(async (tx) => {
      await tx.socialLink.deleteMany()

      if (links.length > 0) {
        await tx.socialLink.createMany({
          data: links.map((link) => ({
            icon: link.icon,
            name: link.name,
            url: link.url,
            order: link.order,
          })),
        })
      }
    })

    revalidatePath('/', 'layout')

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error updating social links: ', error)

    return {
      success: false,
      error: 'Error updating social links.',
    }
  }
}
