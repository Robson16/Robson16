'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'
import { StorageService } from '@/app/_lib/storage/r2-storage'

interface ProfileTranslationInput {
  locale: string
  title: string
  locationName: string
  bio: string
}

interface UpdateProfileInput {
  name: string
  email: string
  phone: string
  locationUrl: string
  avatarUrl?: string
  translations: ProfileTranslationInput[]
}

export async function updateProfileAction(
  id: string,
  data: UpdateProfileInput,
) {
  try {
    const existingProfile = await db.profile.findUnique({
      where: { id },
    })

    if (!existingProfile) {
      return {
        success: false,
        error: 'Profile not found.',
      }
    }

    if (
      data.avatarUrl &&
      existingProfile.avatarUrl &&
      data.avatarUrl !== existingProfile.avatarUrl
    ) {
      try {
        await StorageService.delete(existingProfile.avatarUrl)
      } catch (e) {
        console.error('Failed to delete old avatar from storage', e)
      }
    }

    await db.profile.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        locationUrl: data.locationUrl,
        ...(data.avatarUrl && { avatarUrl: data.avatarUrl }),
        translations: {
          deleteMany: { profileId: id },
          create: data.translations.map((translation) => ({
            locale: translation.locale,
            title: translation.title,
            locationName: translation.locationName,
            bio: translation.bio,
          })),
        },
      },
    })

    revalidatePath('/', 'layout')

    return { success: true }
  } catch (error) {
    console.error('Error updating profile:', error)
    return {
      success: false,
      error: 'Internal error updating profile.',
    }
  }
}
