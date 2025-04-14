import DynamicIcon from '@/components/DynamicIcon'
import { features } from '@/data/features.json'
import { icons } from '@/data/icons.json'
import { useLocale, useTranslations } from 'next-intl'

export default function FeaturesSection() {
  const t = useTranslations('Features')
  const locale = useLocale()

  return (
    <section id="features" aria-labelledby="features-title">
      <div className="container mx-auto my-28 max-w-screen-sm px-4 xl:max-w-screen-xl">
        <h3 className="mb-16 text-center text-4xl font-medium">{t('title')}</h3>
        <div className="flex flex-col items-center gap-8 xl:flex-row xl:items-stretch">
          {features.map((feature) => {
            // Using the value of feature.icon to access the icon information in icons
            const icon = icons[feature.icon as keyof typeof icons]

            return (
              <div
                key={feature.id}
                className="flex max-w-lg flex-1 flex-col rounded-lg bg-zinc-800 p-8 shadow-2xl"
              >
                <DynamicIcon
                  iconFamily={icon.family}
                  icon={icon.name}
                  size={32}
                  color={icon.color}
                  className={`mb-5 mt-4`}
                />
                <h4 className="mb-4 min-h-[65px] text-2xl font-medium">
                  {feature.title[locale as keyof typeof feature.title] ||
                    feature.title.pt}
                </h4>
                <p>
                  {feature.description[
                    locale as keyof typeof feature.description
                  ] || feature.description.pt}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
