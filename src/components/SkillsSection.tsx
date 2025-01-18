'use client'

import { CircularProgress, Progress } from '@nextui-org/progress'
import { useEffect, useState } from 'react'

export type Skill = {
  name: string
  value: number
}

export type SkillResponse = {
  technical: Skill[]
  professional: Skill[]
}

async function fetchSkills(): Promise<SkillResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

  const response = await fetch(`${apiUrl}/api/skills`)

  if (!response.ok) throw new Error('Error fetching skills')

  return response.json()
}

export default function SkillsSections() {
  const [skills, setSkills] = useState<SkillResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSkills()
      .then(setSkills)
      .catch((error) => {
        console.error('Error fetching skills:', error)
        setError('Error loading data. Please try again.')
      })
  }, [])

  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }

  if (!skills) {
    return <p className="text-center">Carregando...</p>
  }

  return (
    <section
      id="skills"
      className="container mx-auto px-4 py-28 lg:max-w-screen-lg"
    >
      <div className="flex columns-2 flex-col gap-20 lg:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="mb-12 text-center text-3xl font-medium">
            Habilidades Técnicas
          </h3>
          {skills.technical.map(
            (skill: { name: string; value: number }, index: number) => (
              <Progress
                key={index}
                label={skill.name}
                classNames={{
                  base: 'w-full',
                  track: 'drop-shadow-md border border-default',
                  indicator: 'bg-teal-600',
                  label: 'tracking-wider text-default-600',
                  value: 'text-foreground/60',
                }}
                size="md"
                value={skill.value}
              />
            ),
          )}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="mb-12 text-center text-3xl font-medium">
            Habilidades Profissionais
          </h3>
          <div className="grid grid-cols-2 items-start justify-center gap-8">
            {skills.professional.map(
              (skill: { name: string; value: number }, index: number) => (
                <CircularProgress
                  key={index}
                  classNames={{
                    base: 'max-w-full text-center',
                    svg: 'w-36 h-36 drop-shadow-md',
                    indicator: 'stroke-teal-600',
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
