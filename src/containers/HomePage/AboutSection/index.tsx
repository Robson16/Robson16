import Carousel from '@/components/Carousel'
import DynamicIcon from '@/components/DynamicIcon'
import FeaturedProjectItem from '@/components/FeaturedProjectItem'
import { Feature } from '@/types/About'
import { Project } from '@/types/Project'
import { Skills } from '@/types/Skill'
import Image from 'next/image'
import { FaDownload } from 'react-icons/fa'

type AboutSectionProps = {
  features: Feature[]
  skills: Skills | null
  featuredProjects: Project[]
}

export default function AboutSection({
  features,
  skills,
  featuredProjects,
}: AboutSectionProps) {
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
              {!skills ? (
                <p className="text-center">Carregando...</p>
              ) : (
                skills.technical.slice(0, 8).map((skill) => (
                  <li
                    key={skill.name}
                    className="rounded border border-solid border-teal-600 px-3 py-1"
                  >
                    {skill.name}
                  </li>
                ))
              )}
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
          {features.map((feature: Feature) => (
            <div
              key={feature.title}
              className="flex flex-1 flex-col rounded-sm bg-zinc-800 p-8 shadow-2xl"
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
          <div className="container mx-auto max-w-screen-xl px-4 py-28">
            <h3 className="mb-16 text-center text-4xl font-medium">
              Projetos em destaque
            </h3>
            {featuredProjects.length === 0 ? (
              <p className="text-center">Carregando...</p>
            ) : featuredProjects.length === 1 ? (
              // When having only one project, directly render the Featured Product
              <FeaturedProjectItem
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
                  <FeaturedProjectItem
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
