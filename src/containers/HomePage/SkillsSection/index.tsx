import { Skill } from '@/types/Skill'
import { CircularProgress, Progress } from '@heroui/react'

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="container mx-auto max-w-screen-sm px-4 py-28 xl:max-w-screen-lg"
    >
      <div className="flex columns-2 flex-col gap-20 xl:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="mb-12 text-center text-3xl font-medium">
            Habilidades Técnicas
          </h3>
          {technical.map(
            (skill: { name: string; value: number }, index: number) => (
              <Progress
                key={index}
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
            ),
          )}
        </div>
        <div className="flex flex-1 flex-col items-center gap-4">
          <h3 className="mb-12 text-center text-3xl font-medium">
            Habilidades Profissionais
          </h3>
          <div className="grid grid-cols-2 items-start justify-center gap-8">
            {professional.map(
              (skill: { name: string; value: number }, index: number) => (
                <CircularProgress
                  key={index}
                  classNames={{
                    base: 'max-w-full text-center',
                    svg: 'w-36 h-36 drop-shadow-md',
                    indicator: 'stroke-emerald-400',
                    track: 'drop-shadow-md border border-default',
                    value: 'text-3xl font-semibold text-white',
                  }}
                  formatOptions={{ style: 'unit', unit: 'percent' }}
                  label={skill.name}
                  showValueLabel={true}
                  strokeWidth={2}
                  value={skill.value}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
