import { getTranslations } from 'next-intl/server'

import DynamicIcon from '@/app/_components/DynamicIcon'
import iconsData from '@/app/_data/icons.json'
import { db } from '@/app/_lib/prisma'

interface ContactSectionProps {
  locale: string
}

type IconKey = keyof typeof iconsData.icons

export default async function ContactSection({ locale }: ContactSectionProps) {
  const icons = iconsData.icons
  const t = await getTranslations('Contact')

  const profileData = await db.profile.findFirstOrThrow({
    include: {
      translations: {
        where: {
          locale,
        },
      },
    },
  })

  const socialData = await db.socialLink.findMany({
    orderBy: {
      order: 'asc',
    },
  })

  return (
    <section
      id="contact"
      className="bg-[url('/images/map.png')] bg-cover bg-center"
      aria-labelledby="contact-title"
    >
      <div className="bg-black/25">
        <div className="container mx-auto max-w-5xl px-4 py-20 md:py-56">
          <h3
            id="contact-title"
            className="mb-16 text-center text-4xl font-medium"
          >
            {t('title')}
          </h3>

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <a
                href={profileData.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex size-full flex-col items-center justify-center gap-8 rounded-lg bg-zinc-800 p-8 shadow-2xl transition-transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center rounded-full border-2 border-solid border-emerald-700 p-10 transition-colors group-hover:border-emerald-600">
                  <DynamicIcon
                    icon="FaMapMarkerAlt"
                    iconFamily="fa"
                    size={40}
                    className="transition-colors group-hover:text-emerald-600"
                  />
                </span>
                <span className="text-center text-lg">
                  {profileData.translations[0].locationName}
                </span>
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="group flex size-full flex-col items-center justify-center gap-8 rounded-lg bg-zinc-800 p-8 shadow-2xl transition-transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center rounded-full border-2 border-solid border-emerald-700 p-10 transition-colors group-hover:border-emerald-600">
                  <DynamicIcon
                    icon="AiOutlineMail"
                    iconFamily="ai"
                    size={40}
                    className="transition-colors group-hover:text-emerald-600"
                  />
                </span>
                <span className="text-center text-lg">{profileData.email}</span>
              </a>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {socialData.map((social) => {
                const iconKey = social.icon as IconKey
                const iconConfig = icons[iconKey]

                if (!iconConfig) {
                  console.warn(`Icon not found in JSON: ${social.icon}`)
                  return null
                }

                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex size-full flex-col items-center justify-center gap-8 rounded-lg bg-zinc-800 p-8 shadow-2xl transition-transform hover:-translate-y-1"
                  >
                    <span className="flex items-center justify-center rounded-full border-2 border-solid border-emerald-700 p-10 transition-colors group-hover:border-emerald-600">
                      <DynamicIcon
                        icon={iconConfig.name}
                        iconFamily={iconConfig.family}
                        size={30}
                        className="transition-colors group-hover:text-emerald-600"
                      />
                    </span>
                    <span className="text-center text-lg">{social.name}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
