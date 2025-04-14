import { professional, technical } from '@/data/skills.json'
import { CircularProgress, Progress } from '@heroui/react'
import { useLocale, useTranslations } from 'next-intl'

export default function SkillsSection() {
  const t = useTranslations('Skills')
  const locale = useLocale()

  return (
    <section
      id="skills"
      className="container mx-auto max-w-screen-sm px-4 py-28 xl:max-w-screen-xl"
    >
      <div className="flex flex-col gap-20 xl:flex-row xl:gap-6">
        {/* Technical Skills Section */}
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="mb-12 text-center text-3xl font-medium">
            {t('technicalTitle')}
          </h3>
          {technical.map((skill) => (
            <Progress
              key={skill.id}
              label={skill.name}
              classNames={{
                base: 'w-full',
                track: 'drop-shadow-md border border-default',
                indicator: 'bg-emerald-400',
                label: 'tracking-wider text-default-600',
                value: 'text-foreground/60',
              }}
              size="md"
              value={skill.value}
            />
          ))}
        </div>

        {/* Professional Skills Section */}
        <div className="flex flex-1 flex-col items-center gap-4">
          <h3 className="mb-12 text-center text-3xl font-medium">
            {t('professionalTitle')}
          </h3>
          <div className="grid grid-cols-2 items-start justify-center gap-8">
            {professional.map((skill) => (
              <CircularProgress
                key={skill.id}
                classNames={{
                  base: 'max-w-full text-center',
                  svg: 'w-36 h-36 drop-shadow-md',
                  indicator: 'stroke-emerald-400',
                  track: 'drop-shadow-md border border-default',
                  value: 'text-3xl font-semibold text-white',
                }}
                formatOptions={{ style: 'unit', unit: 'percent' }}
                label={
                  // Dynamically renders the text based on the current locale, defaulting to Portuguese ('pt') if the locale-specific translation is missing.
                  skill.name[locale as keyof typeof skill.name] || skill.name.pt
                }
                showValueLabel={true}
                strokeWidth={2}
                value={skill.value}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
