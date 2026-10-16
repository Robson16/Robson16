'use server'

import { db } from '@/app/_lib/prisma'

export async function getPaginatedProjects(
  locale: string,
  skip: number,
  take: number = 6,
) {
  const projects = await db.project.findMany({
    skip,
    take,
    include: {
      translations: {
        where: {
          locale,
        },
      },
      gallery: {
        orderBy: {
          order: 'asc',
        },
      },
      skills: {
        include: {
          skill: {
            include: {
              translations: {
                where: {
                  locale,
                },
              },
            },
          },
        },
      },
      links: true,
    },
    orderBy: [{ developedAt: 'desc' }, { id: 'asc' }],
  })

  return projects
}
