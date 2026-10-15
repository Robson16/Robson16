import type { Prisma } from '@prisma/client'

export type ProfileWithTranslations = Prisma.ProfileGetPayload<{
  include: {
    translations: true
  }
}>
