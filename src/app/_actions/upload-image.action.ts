'use server'

import { getServerSession } from 'next-auth'

import { StorageService } from '@/app/_lib/storage/r2-storage'
import { authOptions } from '@/auth'

interface UploadResponse {
  success: boolean
  url?: string
  error?: string
}

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadResponse> {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return { success: false, error: 'Unauthorized.' }
    }

    const file = formData.get('file') as File | null

    if (!file) {
      return { success: false, error: 'No files uploaded.' }
    }

    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'The file must be an image.' }
    }

    if (file.size > 5242880) {
      return { success: false, error: 'The image must be a maximum of 5MB.' }
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
