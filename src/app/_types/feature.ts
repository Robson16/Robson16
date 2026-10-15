import type { Prisma } from '@prisma/client'

export type FeatureWithTranslations = Prisma.FeatureGetPayload<{
  include: {
    translations: true
  }
}>
