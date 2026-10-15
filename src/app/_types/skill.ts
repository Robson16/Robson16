import type { Prisma } from '@prisma/client'

export type SkillWithTranslations = Prisma.SkillGetPayload<{
  include: {
    translations: true
  }
}>
