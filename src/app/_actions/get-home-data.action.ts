'use server'

import { db } from '@/app/_lib/prisma'

export async function getHomeData(locale: string) {
  const projectIncludeParams = {
    translations: {
      where: {
        locale,
      },
    },
    gallery: {
      orderBy: {
        order: 'asc' as const,
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
  }

  const [
    profileData,
    socialData,
    skillsData,
    featuresData,
    featuredProjects,
    initialPortfolioProjects,
  ] = await Promise.all([
    db.profile.findFirstOrThrow({
      include: {
        translations: {
          where: {
            locale,
          },
        },
      },
    }),
    db.socialLink.findMany({
      orderBy: {
        order: 'asc',
      },
    }),
    db.skill.findMany({
      take: 7,
      include: {
        translations: {
          where: {
            locale,
          },
        },
        _count: {
          select: {
            projects: true,
          },
        },
      },
      orderBy: {
        projects: {
          _count: 'desc',
        },
      },
    }),
    db.feature.findMany({
      include: {
        translations: {
          where: {
            locale,
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    }),
    db.project.findMany({
      where: {
        tier: 1,
      },
      include: projectIncludeParams,
      orderBy: [
        {
          developedAt: 'desc',
        },
        {
          id: 'asc',
        },
      ],
    }),
    db.project.findMany({
      take: 6,
      include: projectIncludeParams,
      orderBy: [
        {
          developedAt: 'desc',
        },
        {
          id: 'asc',
        },
      ],
    }),
  ])

  return {
    profileData,
    socialData,
    skillsData,
    featuresData,
    featuredProjects,
    initialPortfolioProjects,
  }
}
