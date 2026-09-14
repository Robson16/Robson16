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
})
