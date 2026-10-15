import type { Prisma } from '@prisma/client'

export type SkillsWithTranslations = Prisma.SkillGetPayload<{
  include: {
    translations: true
  }
}>[]
