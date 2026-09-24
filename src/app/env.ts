import { z } from 'zod'

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url({
    message: 'DATABASE_URL deve ser uma URL válida.',
  }),

  // API Routes
  NEXT_PUBLIC_API_URL: z.string().url({
    message: 'NEXT_PUBLIC_API_URL deve ser uma URL válida.',
  }),

  // Google Tag Manager
  GOOGLE_TAG_ID: z.string().min(1, {
    message: 'GOOGLE_TAG_ID não pode estar vazio.',
  }),

  // GitHub Auth
  ALLOWED_EMAIL: z.string().email({
    message: 'ALLOWED_EMAIL não pode estar vazio.',
  }),
  NEXTAUTH_SECRET: z.string().min(1, {
    message: 'NEXTAUTH_SECRET não pode estar vazio.',
  }),
  NEXTAUTH_GITHUB_ID: z.string().min(1, {
    message: 'NEXTAUTH_GITHUB_ID não pode estar vazio.',
  }),
  NEXTAUTH_GITHUB_SECRET: z.string().min(1, {
    message: 'NEXTAUTH_GITHUB_SECRET não pode estar vazio.',
  }),

  // Cloudflare R2 / MinIO
  CLOUDFLARE_ENDPOINT: z.string().url({
    message: 'CLOUDFLARE_ENDPOINT deve ser uma URL válida.',
  }),
  CLOUDFLARE_ACCESS_KEY_ID: z.string().min(1, {
    message: 'CLOUDFLARE_ACCESS_KEY_ID não pode estar vazio.',
  }),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string().min(1, {
    message: 'CLOUDFLARE_SECRET_ACCESS_KEY não pode estar vazio.',
  }),
  CLOUDFLARE_BUCKET_NAME: z.string().min(1, {
    message: 'CLOUDFLARE_BUCKET_NAME não pode estar vazio.',
  }),
  CLOUDFLARE_PUBLIC_URL: z.string().url({
    message: 'CLOUDFLARE_PUBLIC_URL deve ser uma URL válida.',
  }),
})

type Env = z.infer<typeof envSchema>

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  GOOGLE_TAG_ID: process.env.GOOGLE_TAG_ID,
  ALLOWED_EMAIL: process.env.ALLOWED_EMAIL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_GITHUB_ID: process.env.NEXTAUTH_GITHUB_ID,
  NEXTAUTH_GITHUB_SECRET: process.env.NEXTAUTH_GITHUB_SECRET,
  CLOUDFLARE_ENDPOINT: process.env.CLOUDFLARE_ENDPOINT,
  CLOUDFLARE_ACCESS_KEY_ID: process.env.CLOUDFLARE_ACCESS_KEY_ID,
  CLOUDFLARE_SECRET_ACCESS_KEY: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  CLOUDFLARE_BUCKET_NAME: process.env.CLOUDFLARE_BUCKET_NAME,
  CLOUDFLARE_PUBLIC_URL: process.env.CLOUDFLARE_PUBLIC_URL,
})
