import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import DynamicIcon from '@/app/_components/DynamicIcon'
import SocialButtons from '@/app/_components/SocialButtons'
import { db } from '@/app/_lib/prisma'

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

  return (
    <section
      id="home"
      className="bg-[url('/images/code.jpg')] bg-cover bg-center"
    >
      <div className="bg-black/70">
        <div className="container mx-auto max-w-5xl px-4 py-20 md:py-40 xl:py-56">
          <div className="flex flex-col-reverse gap-8 xl:flex-row">
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
                  width={320}
                  height={320}
                  className="mx-auto max-w-60 rounded-full border-20 border-zinc-900 xl:max-w-none"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
