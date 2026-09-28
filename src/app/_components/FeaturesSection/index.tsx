import { getTranslations } from 'next-intl/server'

import DynamicIcon from '@/app/_components/DynamicIcon'
import iconsData from '@/app/_data/icons.json'
import { db } from '@/app/_lib/prisma'

interface FeaturesSectionProps {
  locale: string
}

type IconKey = keyof typeof iconsData.icons

export default async function FeaturesSection({
  locale,
}: FeaturesSectionProps) {
  const icons = iconsData.icons
  const t = await getTranslations('Features')

  const featuresData = await db.feature.findMany({
    include: {
      translations: {
        where: { locale },
      },
    },
    orderBy: {
      order: 'asc',
    },
  })

  return (
    <section id="features" aria-labelledby="features-title">
      <div className="container mx-auto my-28 max-w-screen-sm px-4 xl:max-w-7xl">
        <h3 className="mb-16 text-center text-4xl font-medium">{t('title')}</h3>
        <div className="flex flex-col items-center gap-8 xl:flex-row xl:items-stretch">
          {featuresData.map((feature) => {
            // It performs a safe cast of the database string to a known JSON key.
            const iconKey = feature.icon as IconKey
            const iconConfig = icons[iconKey]

            // Security fallback: if the bank icon does not exist in the JSON, the page will not break.
            if (!iconConfig) {
              console.warn(`Icon not found in JSON: ${feature.icon}`)
              return null
            }

            return (
              <div
                key={feature.id}
                className="flex max-w-lg flex-1 flex-col rounded-lg bg-zinc-800 p-8 shadow-2xl"
              >
                <DynamicIcon
                  icon={iconConfig.name}
                  iconFamily={iconConfig.family}
                  color={iconConfig.color}
                  size={32}
                  className={`mt-4 mb-5`}
                />
                <h4 className="mb-4 min-h-16.25 text-2xl font-medium">
                  {feature.translations[0].title}
                </h4>
                <p>{feature.translations[0].description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
