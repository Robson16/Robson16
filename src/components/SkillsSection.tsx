import { CircularProgress, Progress } from '@nextui-org/progress'

export default function SkillsSections() {
  return (
    <section id="skills">
      <div className="container mx-auto max-w-screen-lg px-4 py-28">
        <div className="flex columns-2 flex-col gap-20 md:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <h3 className="mb-12 text-center text-3xl font-medium">
              Habilidades Técnicas
            </h3>
            <Progress
              label="JavaScript"
              classNames={{
                base: 'w-full',
                track: 'drop-shadow-md border border-default',
                indicator: 'bg-teal-600',
                label: 'tracking-wider text-default-600',
                value: 'text-foreground/60',
              }}
              size="md"
              value={90}
            />
            <Progress
              label="TypeScript"
              classNames={{
                base: 'w-full',
                track: 'drop-shadow-md border border-default',
                indicator: 'bg-teal-600',
                label: 'tracking-wider text-default-600',
                value: 'text-foreground/60',
              }}
              size="md"
              value={80}
            />
            <Progress
              label="ReactJS"
              classNames={{
                base: 'w-full',
                track: 'drop-shadow-md border border-default',
                indicator: 'bg-teal-600',
                label: 'tracking-wider text-default-600',
                value: 'text-foreground/60',
              }}
              size="md"
              value={70}
            />
            <Progress
              label="NodeJS"
              classNames={{
                base: 'w-full',
                track: 'drop-shadow-md border border-default',
                indicator: 'bg-teal-600',
                label: 'tracking-wider text-default-600',
                value: 'text-foreground/60',
              }}
              size="md"
              value={75}
            />
            <Progress
              label="PHP"
              classNames={{
                base: 'w-full',
                track: 'drop-shadow-md border border-default',
                indicator: 'bg-teal-600',
                label: 'tracking-wider text-default-600',
                value: 'text-foreground/60',
              }}
              size="md"
              value={80}
            />
            <Progress
              label="WordPress"
              classNames={{
                base: 'w-full',
                track: 'drop-shadow-md border border-default',
                indicator: 'bg-teal-600',
                label: 'tracking-wider text-default-600',
                value: 'text-foreground/60',
              }}
              size="md"
              value={90}
            />
            <Progress
              label="Java"
              classNames={{
                base: 'w-full',
                track: 'drop-shadow-md border border-default',
                indicator: 'bg-teal-600',
                label: 'tracking-wider text-default-600',
                value: 'text-foreground/60',
              }}
              size="md"
              value={40}
            />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <h3 className="mb-12 text-center text-3xl font-medium">
              Habilidades Profissionais
            </h3>
            <div className="grid grid-cols-2 items-start justify-center gap-8">
              <CircularProgress
                classNames={{
                  base: 'max-w-full text-center',
                  svg: 'w-36 h-36 drop-shadow-md',
                  indicator: 'stroke-teal-600',
                  track: 'drop-shadow-md border border-default',
                  value: 'text-3xl font-semibold text-white',
                }}
                formatOptions={{ style: 'unit', unit: 'percent' }}
                label="Resolução de Problemas"
                showValueLabel={true}
                strokeWidth={2}
                value={90}
              />
              <CircularProgress
                classNames={{
                  base: 'max-w-full text-center',
                  svg: 'w-36 h-36 drop-shadow-md',
                  indicator: 'stroke-teal-600',
                  track: 'drop-shadow-md border border-default',
                  value: 'text-3xl font-semibold text-white',
                }}
                formatOptions={{ style: 'unit', unit: 'percent' }}
                label="Trabalho em Equipe"
                showValueLabel={true}
                strokeWidth={2}
                value={80}
              />
              <CircularProgress
                classNames={{
                  base: 'max-w-full text-center',
                  svg: 'w-36 h-36 drop-shadow-md',
                  indicator: 'stroke-teal-600',
                  track: 'drop-shadow-md border border-default',
                  value: 'text-3xl font-semibold text-white',
                }}
                formatOptions={{ style: 'unit', unit: 'percent' }}
                label="Gerenciamento de Projetos"
                showValueLabel={true}
                strokeWidth={2}
                value={86}
              />
              <CircularProgress
                classNames={{
                  base: 'max-w-full text-center',
                  svg: 'w-36 h-36 drop-shadow-md',
                  indicator: 'stroke-teal-600',
                  track: 'drop-shadow-md border border-default',
                  value: 'text-3xl font-semibold text-white',
                }}
                formatOptions={{ style: 'unit', unit: 'percent' }}
                label="Autodidatismo"
                showValueLabel={true}
                strokeWidth={2}
                value={90}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
