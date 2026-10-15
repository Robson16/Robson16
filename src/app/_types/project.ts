import type { Prisma } from '@prisma/client'

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    translations: true
    gallery: true
    skills: {
      include: {
        skill: {
          include: {
            translations: true
          }
        }
      }
    }
    links: true
  }
}>
