'use client'

import { Label, ProgressBar, ProgressCircle } from '@heroui/react'
import { useLocale, useTranslations } from 'next-intl'

import skillsData from '@/app/_data/skills.json'

export default function SkillsSection() {
  const { technical, professional } = skillsData
  const t = useTranslations('Skills')
  const locale = useLocale()

  return (
    <section
      id="skills"
      className="container mx-auto max-w-screen-sm px-4 py-28 xl:max-w-7xl"
    >
      <div className="flex flex-col gap-20 xl:flex-row xl:gap-6">
        {/* Technical Skills Section */}
        <div className="flex flex-1 flex-col gap-6">
          <h3 className="mb-6 text-center text-3xl font-medium">
            {t('technicalTitle')}
          </h3>
          {technical.map((skill) => (
            <ProgressBar
              key={skill.id}
              value={skill.value}
              aria-label={skill.name}
              className="w-full"
            >
              <div className="mb-2 flex justify-between text-sm">
                <Label className="font-medium tracking-wider text-zinc-400">
                  {skill.name}
                </Label>
                <ProgressBar.Output className="text-white/60" />
              </div>
              <ProgressBar.Track className="h-3 w-full overflow-hidden rounded-full border border-zinc-800 bg-zinc-800 drop-shadow-md">
                <ProgressBar.Fill className="h-full bg-emerald-400 transition-all duration-500" />
              </ProgressBar.Track>
            </ProgressBar>
          ))}
        </div>

        {/* Professional Skills Section */}
        <div className="flex flex-1 flex-col items-center gap-4">
          <h3 className="mb-6 text-center text-3xl font-medium">
            {t('professionalTitle')}
          </h3>
          <div className="grid grid-cols-2 items-start justify-center gap-12">
            {professional.map((skill) => {
              const skillName =
                skill.name[locale as keyof typeof skill.name] || skill.name.pt

              return (
                <div
                  key={skill.id}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <ProgressCircle
                    aria-label={skillName}
                    value={skill.value}
                    className="size-36 drop-shadow-md"
                  >
                    <ProgressCircle.Track className="size-full">
                      <ProgressCircle.TrackCircle className="stroke-zinc-800" />
                      <ProgressCircle.FillCircle className="stroke-emerald-400" />
                    </ProgressCircle.Track>
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-semibold text-white">
                      {skill.value}%
                    </div>
                  </ProgressCircle>
                  <span className="text-sm font-medium tracking-wide text-zinc-300">
                    {skillName}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
