'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaDownload } from 'react-icons/fa'
import { GoDatabase } from 'react-icons/go'
import { IoCodeSlashOutline } from 'react-icons/io5'
import { PiLightningLight } from 'react-icons/pi'
import Carousel from './Carousel'
import FeaturedProject from './FeaturedProject'

type FeaturedProjects = {
  id: number
  imageSrc: string
  category: string
  heading: string
  subheading: string
  description: string
  url: string
}

async function fetchFeaturedProjects(): Promise<FeaturedProjects[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

  const response = await fetch(`${apiUrl}/api/projects`)

  if (!response.ok) throw new Error('Fetching featured projects')

  return response.json()
}

export default function AboutSection() {
  const skills = [
    'Java',
    'NodeJS',
    'ReactJS',
    'TypeScript',
    'React Native',
    'AWS',
    'PHP',
    'WordPress',
  ]

  const features = [
    {
      icon: (
        <IoCodeSlashOutline size={30} className="mb-5 mt-4 text-emerald-600" />
      ),
      title: 'Desenvolvimento Web e Mobile',
      description:
        'Criação de aplicações web e mobile responsivas e escaláveis, utilizando tecnologias modernas para garantir alta performance, segurança e uma excelente experiência do usuário.',
    },
    {
      icon: <GoDatabase size={30} className="mb-5 mt-4 text-purple-600" />,
      title: 'API e Banco de Dados',
      description:
        'Desenvolvimento de APIs eficientes e bem estruturadas, garantindo integração fluida entre sistemas. Trabalho com bancos de dados relacionais e não relacionais, com foco em otimização e escalabilidade.',
    },
    {
      icon: (
        <PiLightningLight size={30} className="mb-5 mt-4 text-yellow-600" />
      ),
      title: 'Boas Práticas e Performance',
      description:
        'Aplicação de princípios como SOLID, TDD e DDD para garantir código limpo e sustentável. Implementação de estratégias para otimizar a performance das aplicações, seguindo as melhores práticas do mercado.',
    },
  ]

  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProjects[]>(
    [],
  )
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFeaturedProjects()
      .then((data) => {
        setFeaturedProjects(data)
      })
      .catch((err) => {
        console.error(err)
        setError('Erro ao carregar dados. Tente novamente.')
      })
  }, [])

  return (
    <section id="about" aria-labelledby="about-title">
      <div className="container mx-auto my-28 px-4 lg:max-w-screen-lg">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div className="flex flex-1 flex-col">
            <Image
              src="/images/about-image.png"
              alt="About image"
              width={480}
              height={290}
            />
          </div>
          <div className="flex flex-1 flex-col items-center lg:items-start">
            <h2
              id="about-title"
              className="mb-4 text-center text-4xl font-medium lg:text-left"
            >
              Sobre mim
            </h2>
            <p className="mb-8 text-center leading-7 lg:text-left">
              Olá, sou Robson, Desenvolvedor Web de Jundiaí - SP, Brasil. Com
              experiência em desenvolvimento web e mobile, foco em aplicações
              escaláveis e otimizadas. Conhecimentos em
            </p>
            <ul className="mb-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded border border-solid border-teal-600 px-3 py-1"
                >
                  {skill}
                </li>
              ))}
            </ul>
            <a
              className="flex items-center gap-2 rounded-full bg-teal-600 px-8 py-3 font-bold text-white transition-all hover:bg-teal-700"
              href="/documents/robson-h-rodrigues-cv.pdf"
              download="robson-h-rodrigues-cv.pdf"
            >
              Baixar CV
              <FaDownload size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto my-28 max-w-screen-xl px-4">
        <h3 className="mb-16 text-center text-4xl font-medium">O que faço</h3>
        <div className="flex flex-col gap-8 lg:flex-row">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="flex flex-1 flex-col rounded-sm bg-zinc-800 p-8 shadow-2xl"
            >
              {icon}
              <h4 className="mb-4 min-h-[65px] text-2xl font-medium">
                {title}
              </h4>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[url('/images/computer.jpg')] bg-cover bg-center">
        <div className="bg-black bg-opacity-90">
          <div className="container mx-auto max-w-screen-xl px-4 py-28">
            <h3 className="mb-16 text-center text-4xl font-medium">
              Projetos em destaque
            </h3>
            {error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : featuredProjects.length === 0 ? (
              <p className="text-center">Nenhum projeto encontrado</p>
            ) : featuredProjects.length === 1 ? (
              // When having only one project, directly render the Featured Product
              <FeaturedProject
                key={featuredProjects[0].id}
                imageSrc={featuredProjects[0].imageSrc}
                category={featuredProjects[0].category}
                heading={featuredProjects[0].heading}
                subheading={featuredProjects[0].subheading}
                description={featuredProjects[0].description}
                href={featuredProjects[0].url}
              />
            ) : (
              // If has more than one project, use Carousel
              <Carousel>
                {featuredProjects.map((project) => (
                  <FeaturedProject
                    key={project.id}
                    imageSrc={project.imageSrc}
                    category={project.category}
                    heading={project.heading}
                    subheading={project.subheading}
                    description={project.description}
                    href={project.url}
                  />
                ))}
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
