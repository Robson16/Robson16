'use client'

import { useEffect, useState } from 'react'
import { FaCircle } from 'react-icons/fa'

type Experience = {
  title: string
  company: string
  location?: string
  period: {
    start: string
    end: string
  }
  responsibilities: string[]
}

type Education = {
  title: string
  institution: string
  period: {
    start: string
    end: string
  }
  description: string
}

async function fetchData<T>(endpoint: string): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
  const response = await fetch(`${apiUrl}/api/${endpoint}`)

  if (!response.ok) {
    throw new Error(`Fetching data from ${endpoint}: ${response.statusText}`)
  }

  return response.json()
}

export default function ExperienceSection() {
  const [education, setEducation] = useState<Education[] | null>(null)
  const [experiences, setExperiences] = useState<Experience[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      fetchData<Education[]>('education').then(setEducation),
      fetchData<Experience[]>('experiences').then(setExperiences),
    ]).catch((err) => {
      console.error(err)
      setError('Error loading data. Please try again.')
    })
  }, [])

  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }

  if (!education || !experiences) {
    return <p className="text-center">Carregando...</p>
  }

  return (
    <section
      id="experience"
      className="bg-[url('/images/study.jpg')] bg-cover bg-center"
    >
      <div className="bg-black bg-opacity-90">
        <div className="container mx-auto px-4 py-28 lg:max-w-screen-xl">
          <div className="flex columns-2 flex-col gap-20 lg:flex-row">
            {/* Seção Educação */}
            <div className="flex flex-1 flex-col gap-7">
              <h3 className="mb-12 text-center text-3xl font-medium">
                Formação
              </h3>
              {education.map((edu) => (
                <div
                  key={edu.title}
                  className="flex flex-1 flex-col gap-2 rounded-sm bg-zinc-800 p-8 shadow-2xl"
                >
                  <h4 className="text-xl font-semibold">
                    {edu.title} em{' '}
                    <span className="italic text-teal-600">
                      {edu.institution}
                    </span>
                  </h4>
                  <span className="text-teal-600">{`${edu.period.start} - ${edu.period.end}`}</span>
                  <p className="text-sm">{edu.description}</p>
                </div>
              ))}
            </div>

            {/* Seção Experiência */}
            <div className="flex flex-1 flex-col gap-7">
              <h3 className="mb-12 text-center text-3xl font-medium">
                Experiência de Trabalho
              </h3>
              {experiences.slice(0, 3).map((exp) => (
                <div
                  key={`${exp.title} - ${exp.company}`}
                  className="flex flex-1 flex-col gap-2 rounded-sm bg-zinc-800 p-8 shadow-2xl"
                >
                  <h4 className="text-xl font-semibold">
                    {exp.title} em{' '}
                    <span className="italic text-teal-600">{exp.company}</span>
                  </h4>
                  <span className="text-teal-600">{`${exp.period.start} - ${exp.period.end}`}</span>
                  {exp.location && (
                    <span className="text-sm text-gray-400">
                      {exp.location}
                    </span>
                  )}
                  <ul className="list-inside text-sm">
                    {exp.responsibilities.map((resp, index) => (
                      <li key={index} className="mb-1">
                        <FaCircle className="mr-2 inline-block" size={10} />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
