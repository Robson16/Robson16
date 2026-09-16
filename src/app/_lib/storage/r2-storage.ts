import { randomUUID } from 'node:crypto'

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

import { env } from '@/app/env'

// S3 Client singleton instance
const s3Client = new S3Client({
  region: 'auto', // R2 requires 'auto', MinIO ignores this.
  endpoint: env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
  // forcePathStyle is REQUIRED for the local MinIO to function correctly.
  forcePathStyle: true,
})

interface UploadParams {
  fileName: string
  fileType: string
  body: Buffer
}

export const StorageService = {
  /**
   * Uploads a file to R2/MinIO and returns the public URL.
   */
  async upload({ fileName, fileType, body }: UploadParams): Promise<string> {
    // Clears the filename and adds a UUID to avoid conflicts.
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '-')
    const uniqueFileName = `${randomUUID()}-${sanitizedName}`

    const command = new PutObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET_NAME,
      Key: uniqueFileName,
      Body: body,
      ContentType: fileType,
    })

    await s3Client.send(command)

    // Returns the public URL ready to be saved in the database.
    return `${env.CLOUDFLARE_PUBLIC_URL}/${uniqueFileName}`
  },

  /**
   * Delete a file from the bucket.
   */
  async delete(fileUrl: string): Promise<void> {
    try {
      const key = fileUrl.replace(`${env.CLOUDFLARE_PUBLIC_URL}/`, '')

      const command = new DeleteObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET_NAME,
        Key: key,
      })

      await s3Client.send(command)
    } catch (error) {
      console.error('Error deleting image from storage:', error)
    }
  },
}
