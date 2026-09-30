import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { ActivityCalendar } from 'react-activity-calendar'

import DynamicIcon from '@/app/_components/DynamicIcon'
import SocialButtons from '@/app/_components/SocialButtons'
import { db } from '@/app/_lib/prisma'
import { fetchGitHubContributions } from '@/app/_services/github.service'
import { fetchGitLabContributions } from '@/app/_services/gitlab.service'

interface HeroSectionProps {
  locale: string
}

export default async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations('Hero')

  const profileData = await db.profile.findFirstOrThrow({
    include: {
      translations: {
        where: {
          locale,
        },
      },
    },
  })

  const [githubDays, gitlabDays] = await Promise.all([
    fetchGitHubContributions(),
    fetchGitLabContributions(),
  ])

  const contributionsMap = new Map<string, number>()

  githubDays.forEach((day) => {
    const dateStr = day.date.split('T')[0]
    contributionsMap.set(dateStr, day.contributionCount)
  })

  gitlabDays.forEach((day) => {
    const dateStr = day.date.split('T')[0]
    const current = contributionsMap.get(dateStr) || 0
    contributionsMap.set(dateStr, current + day.contributionCount)
  })

  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  oneYearAgo.setHours(0, 0, 0, 0)

  //   Map the data to the ActivityCalendar format.
  const calendarData = Array.from(contributionsMap.entries())
    .map(([date, count]) => {
      let level = 0
      if (count > 0) level = 1
      if (count >= 3) level = 2
      if (count >= 6) level = 3
      if (count >= 10) level = 4

      return {
        date,
        count,
        level: level as 0 | 1 | 2 | 3 | 4,
      }
    })
    .filter((item) => {
      const itemDate = new Date(`${item.date}T00:00:00`)
      return itemDate >= oneYearAgo
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <section
      id="home"
      className="bg-[url('/images/code.jpg')] bg-cover bg-center"
    >
      <div className="bg-black/70">
        <div className="container mx-auto max-w-5xl px-4 py-20 md:py-40 xl:pt-50 xl:pb-32">
          <div className="mb-16 flex flex-col-reverse gap-8 xl:flex-row">
            <div className="flex flex-1 flex-col items-center justify-center xl:items-start">
              <span className="mb-4 rounded-tl-[20px] rounded-r-[20px] bg-emerald-800 px-8 py-2">
                {t('greeting')}
              </span>
              <h1 className="mb-4 text-center text-5xl font-bold xl:text-left">
                {profileData.name}
              </h1>
              <h2 className="text-2xl font-medium">
                {profileData.translations[0].title}
              </h2>
              <ul className="my-10">
                <li className="group my-2 flex items-center">
                  <DynamicIcon
                    icon="AiOutlineMail"
                    iconFamily="ai"
                    size={22}
                    className="mr-2 text-gray-500 transition-colors group-hover:text-emerald-600"
                  />
                  <a href={`mailto:${profileData.email}`}>
                    {profileData.email}
                  </a>
                </li>
                <li className="group my-2 flex items-center">
                  <DynamicIcon
                    icon="FaMapMarkerAlt"
                    iconFamily="fa"
                    size={22}
                    className="mr-2 text-gray-500 transition-colors group-hover:text-emerald-600"
                  />
                  <a
                    href={profileData.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profileData.translations[0].locationName}
                  </a>
                </li>
              </ul>
              <div className="flex items-center gap-4">
                <SocialButtons />
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center xl:items-end">
              <figure className="rounded-full border-20 border-zinc-950">
                <Image
                  src={profileData.avatarUrl ?? '/images/default-avatar.jpg'} // Fallback se for null
                  priority={true}
                  alt={`Photo of ${profileData.name}`}
                  width={240}
                  height={240}
                  className="mx-auto max-w-60 rounded-full border-20 border-zinc-900 xl:max-w-none"
                />
              </figure>
            </div>
          </div>

          {calendarData.length > 0 && (
            <div className="flex w-full flex-col items-center justify-center overflow-x-auto rounded-lg bg-zinc-900/5 p-2 shadow-xl backdrop-blur-sm">
              <ActivityCalendar
                data={calendarData}
                colorScheme="dark"
                theme={{
                  dark: ['#27272a', '#064e3b', '#059669', '#10b981', '#34d399'],
                }}
                labels={{
                  totalCount: t('contributionsTotal', { count: '{{count}}' }),
                  legend: {
                    less: t('legendLess'),
                    more: t('legendMore'),
                  },
                  months: t.raw('months'),
                  weekdays: t.raw('weekdays'),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
