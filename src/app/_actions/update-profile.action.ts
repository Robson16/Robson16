'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/app/_lib/prisma'

export async function updateProfile(formData: FormData) {
  try {
    const id = formData.get('id') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const locationUrl = formData.get('locationUrl') as string

    const locationPt = formData.get('locationPt') as string
    const bioPt = formData.get('bioPt') as string

    const locationEn = formData.get('locationEn') as string
    const bioEn = formData.get('bioEn') as string

    const avatarUrl = formData.get('avatarUrl') as string

    const currentProfile = await db.profile.findUnique({
      where: { id },
    })

    if (!currentProfile) throw new Error('Perfil não encontrado')

    await db.profile.update({
      where: { id },
      data: {
        email,
        phone,
        locationUrl,
        avatarUrl,
        translations: {
          deleteMany: {},
          create: [
            { locale: 'pt', locationName: locationPt, bio: bioPt },
            { locale: 'en', locationName: locationEn, bio: bioEn },
          ],
        },
      },
    })

    revalidatePath('/', 'layout')

    return { success: true }
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
    return { success: false, error: 'Falha ao atualizar perfil' }
  }
}
