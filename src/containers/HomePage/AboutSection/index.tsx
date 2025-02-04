import Carousel from '@/components/Carousel'
import DynamicIcon from '@/components/DynamicIcon'
import FeaturedProjectItem from '@/components/FeaturedProjectItem'
import { Feature } from '@/types/About'
import { Project } from '@/types/Project'
import { Skills } from '@/types/Skill'
import { Button, Link } from '@heroui/react'
import clsx from 'clsx'
import Image from 'next/image'
import { FaDownload } from 'react-icons/fa'

type AboutSectionProps = {
  description: string
  features: Feature[]
  skills: Skills | null
  featuredProjects: Project[]
}

export default function AboutSection({
  description,
  features,
  skills,
  featuredProjects,
}: AboutSectionProps) {
  return (
    <section id="about" aria-labelledby="about-title">
      <div className="container mx-auto my-28 max-w-screen-sm px-4 xl:max-w-screen-lg">
        <div className="flex flex-col items-center gap-16 xl:flex-row">
          <div className="flex flex-1 flex-col">
            <Image
              src="/images/about-image.png"
              alt="About image"
              width={480}
              height={290}
            />
          </div>
          <div className="flex flex-1 flex-col items-center xl:items-start">
            <h2
              id="about-title"
              className="mb-4 text-center text-4xl font-medium xl:text-left"
            >
              Sobre mim
            </h2>
            <p className="mb-8 text-center leading-7 xl:text-left">
              {description}
            </p>
            <ul className="mb-8 flex max-w-sm flex-wrap justify-center gap-4 xl:justify-start">
              {skills &&
                skills.technical.slice(0, 8).map((skill) => (
                  <li
                    key={skill.name}
                    className="rounded border border-solid border-teal-600 px-3 py-1"
                  >
                    {skill.name}
                  </li>
                ))}
            </ul>
            <Button
              size="lg"
              radius="full"
              as={Link}
              href="/documents/robson-h-rodrigues-cv.pdf"
              download="robson-h-rodrigues-cv.pdf"
              aria-label="Baixar currículo"
              endContent={<FaDownload size={16} />}
              className={clsx(
                'flex items-center gap-2 px-8 py-3',
                'bg-emerald-800 font-bold text-white transition-all',
                'hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500',
              )}
            >
              Baixar CV
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto my-28 max-w-screen-sm px-4 xl:max-w-screen-xl">
        <h3 className="mb-16 text-center text-4xl font-medium">O que faço</h3>
        <div className="flex flex-col items-center gap-8 xl:flex-row">
          {features.map((feature: Feature) => (
            <div
              key={feature.title}
              className="flex max-w-lg flex-1 flex-col rounded-lg bg-zinc-800 p-8 shadow-2xl"
            >
              <DynamicIcon
                iconFamily={feature.icon.family}
                icon={feature.icon.name}
                size={32}
                color={feature.icon.color}
                className={`mb-5 mt-4`}
              />
              <h4 className="mb-4 min-h-[65px] text-2xl font-medium">
                {feature.title}
              </h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[url('/images/computer.jpg')] bg-cover bg-center">
        <div className="bg-black bg-opacity-90">
          <div className="container mx-auto px-2 py-28 xl:max-w-screen-xl">
            <h3 className="mb-16 text-center text-4xl font-medium">
              Projetos em destaque
            </h3>
            {featuredProjects.length === 0 ? (
              <p className="text-center">Carregando...</p>
            ) : featuredProjects.length === 1 ? (
              // When having only one project, directly render the Featured Product
              <FeaturedProjectItem project={featuredProjects[0]} />
            ) : (
              // If has more than one project, use Carousel
              <Carousel>
                {featuredProjects.map((project) => (
                  <FeaturedProjectItem key={project.id} project={project} />
                ))}
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
