'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

interface CreateSocialLinkInput {
  name: string
  url: string
}

export async function createSocialLink(data: CreateSocialLinkInput) {
  try {
    const lastLink = await db.socialLink.findFirst({
      orderBy: { order: 'desc' },
    })

    const nextOrder = lastLink ? lastLink.order + 1 : 1

    await db.socialLink.create({
      data: {
        name: data.name,
        url: data.url,
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
