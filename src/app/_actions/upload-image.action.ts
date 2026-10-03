'use server'

import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { StorageService } from '@/app/_lib/storage/r2-storage'
import { authOptions } from '@/auth'

interface UploadResponse {
  success: boolean
  url?: string
  error?: string
}

const uploadImageSchema = z.object({
  file: z
    .file()
    .refine((file) => file.type.startsWith('image/'), {
      message: 'The file must be an image.',
    })
    .max(5242880, { message: 'The image must be a maximum of 5MB.' }),
})

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadResponse> {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return { success: false, error: 'Unauthorized.' }
    }

    const parsed = uploadImageSchema.safeParse({
      file: formData.get('file'),
    })

    if (!parsed.success) {
      if (formData.get('file') === null) {
        return { success: false, error: 'No files uploaded.' }
      }

      return { success: false, error: parsed.error.issues[0].message }
    }

    const file = parsed.data.file

    if (!file.name.trim()) {
      return { success: false, error: 'No files uploaded.' }
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const url = await StorageService.upload({
      fileName: file.name,
      fileType: file.type,
      body: buffer,
    })

    return {
      success: true,
      url: url,
    }
  } catch (error) {
    console.error('Error in Upload Action:', error)
    return {
      success: false,
      error: 'Internal error processing image upload.',
    }
  }
}
