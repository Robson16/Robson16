'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/app/_lib/prisma'
import { StorageService } from '@/app/_lib/storage/r2-storage'
import { validateTranslations } from '@/app/_utils/validate-translations'

const updateProfileSchema = z.object({
  name: z.string().trim().min(1),
  email: z.email(),
  phone: z.string().trim().min(1),
  locationUrl: z.url(),
  avatarUrl: z.union([z.url(), z.literal('')]).optional(),
  translations: z.array(
    z.object({
      locale: z.string().trim().min(1),
      title: z.string(),
      locationName: z.string(),
      bio: z.string(),
    }),
  ),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>

export async function updateProfileAction(
  id: string,
  data: UpdateProfileInput,
) {
  try {
    const validatedId = z.string().trim().min(1).parse(id)
    const validatedData = updateProfileSchema.parse(data)
    const translationError = await validateTranslations(
      validatedData.translations,
      ['title', 'locationName'],
    )

    if (translationError) {
      return { success: false, error: translationError }
    }

    const existingProfile = await db.profile.findUnique({
      where: { id: validatedId },
    })

    if (!existingProfile) {
      return {
        success: false,
        error: 'Profile not found.',
      }
    }

    if (
      validatedData.avatarUrl &&
      existingProfile.avatarUrl &&
      validatedData.avatarUrl !== existingProfile.avatarUrl
    ) {
      try {
        await StorageService.delete(existingProfile.avatarUrl)
      } catch (e) {
        console.error('Failed to delete old avatar from storage', e)
      }
    }

    await db.profile.update({
      where: { id: validatedId },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        locationUrl: validatedData.locationUrl,
        ...(validatedData.avatarUrl && {
          avatarUrl: validatedData.avatarUrl,
        }),
        translations: {
          deleteMany: { profileId: validatedId },
          create: validatedData.translations.map((translation) => ({
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
