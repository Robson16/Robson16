import Image from 'next/image'
import { FaDownload } from 'react-icons/fa'
import { GoDatabase } from 'react-icons/go'
import { IoCodeSlashOutline } from 'react-icons/io5'
import { PiLightningLight } from 'react-icons/pi'
import Carousel from './Carousel'
import FeaturedProject from './FeaturedProject'

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title">
      <div className="container mx-auto my-28 max-w-screen-lg px-4">
        <div className="flex columns-2 flex-col items-center gap-16 md:flex-row">
          <div className="flex flex-1 flex-col">
            <Image
              src="/images/about-image.png"
              alt="About image"
              width={480}
              height={290}
            />
          </div>
          <div className="flex flex-1 flex-col items-center md:items-start">
            <h2
              id="about-title"
              className="mb-4 text-center text-4xl font-medium md:text-left"
            >
              Sobre mim
            </h2>
            <p className="mb-8 text-center leading-7 md:text-left">
              Olá, sou Robson, Desenvolvedor Web de Jundiaí - SP, Brasil. Com
              experiência em desenvolvimento web e mobile, foco em aplicações
              escaláveis e otimizadas. Conhecimentos em
            </p>
            <ul className="mb-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <li className="rounded border border-solid border-teal-600 px-3 py-1">
                Java
              </li>
              <li className="rounded border border-solid border-teal-600 px-3 py-1">
                NodeJS
              </li>
              <li className="rounded border border-solid border-teal-600 px-3 py-1">
                ReactJS
              </li>
              <li className="rounded border border-solid border-teal-600 px-3 py-1">
                TypeScript
              </li>
              <li className="rounded border border-solid border-teal-600 px-3 py-1">
                React Native
              </li>
              <li className="rounded border border-solid border-teal-600 px-3 py-1">
                AWS
              </li>
              <li className="rounded border border-solid border-teal-600 px-3 py-1">
                PHP
              </li>
              <li className="rounded border border-solid border-teal-600 px-3 py-1">
                WordPress
              </li>
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
        <div className="flex columns-3 flex-col gap-8 md:flex-row">
          <div className="flex flex-1 flex-col rounded-sm bg-zinc-800 p-8 shadow-2xl">
            <IoCodeSlashOutline
              size={30}
              className="mb-5 mt-4 text-emerald-600"
            />
            <h4 className="mb-4 min-h-[65px] text-2xl font-medium">
              Desenvolvimento Web e Mobile
            </h4>
            <p>
              Criação de aplicações web e mobile responsivas e escaláveis,
              utilizando tecnologias modernas para garantir alta performance,
              segurança e uma excelente experiência do usuário.
            </p>
          </div>
          <div className="flex flex-1 flex-col rounded-sm bg-zinc-800 p-8 shadow-2xl">
            <GoDatabase size={30} className="mb-5 mt-4 text-purple-600" />
            <h4 className="mb-4 min-h-[65px] text-2xl font-medium">
              API e Banco de Dados
            </h4>
            <p>
              Desenvolvimento de APIs eficientes e bem estruturadas, garantindo
              integração fluida entre sistemas. Trabalho com bancos de dados
              relacionais e não relacionais, com foco em otimização e
              escalabilidade.
            </p>
          </div>
          <div className="flex flex-1 flex-col rounded-sm bg-zinc-800 p-8 shadow-2xl">
            <PiLightningLight size={30} className="mb-5 mt-4 text-yellow-600" />
            <h4 className="mb-4 min-h-[65px] text-2xl font-medium">
              Boas Práticas e Performance
            </h4>
            <p>
              Aplicação de princípios como SOLID, TDD e DDD para garantir código
              limpo e sustentável. Implementação de estratégias para otimizar a
              performance das aplicações, seguindo as melhores práticas do
              mercado.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[url('/images/computer.jpg')] bg-cover bg-center">
        <div className="bg-black bg-opacity-90">
          <div className="container mx-auto max-w-screen-xl px-4 py-28">
            <h3 className="mb-16 text-center text-4xl font-medium">
              Projetos em destaque
            </h3>
            <Carousel
              navigation
              loop
              slides={[
                {
                  id: 1,
                  content: (
                    <FeaturedProject
                      imageSrc="/images/projects/castelloruspoli.png"
                      category="WordPress"
                      heading="Castello Ruspoli"
                      subheading="Elegante e otimizado"
                      description="Um tema personalizado para WordPress, desenvolvido para o site do histórico Castello Ruspoli, um castelo com origens que remontam a 847. Utiliza tecnologias como WordPress, SASS para estilização, Node.js para a automação de tarefas, Webpack para empacotamento de módulos e Babel para a transpilação de JavaScript, visando garantir um código otimizado e eficiente tanto para a parte visual quanto para a funcionalidade."
                      href="https://castelloruspoli.com/"
                    />
                  ),
                },
                {
                  id: 2,
                  content: (
                    <FeaturedProject
                      imageSrc="/images/projects/castelloruspoli.png"
                      category="WordPress"
                      heading="Castello Ruspoli"
                      subheading="Elegante e otimizado"
                      description="Um tema personalizado para WordPress, desenvolvido para o site do histórico Castello Ruspoli, um castelo com origens que remontam a 847. Utiliza tecnologias como WordPress, SASS para estilização, Node.js para a automação de tarefas, Webpack para empacotamento de módulos e Babel para a transpilação de JavaScript, visando garantir um código otimizado e eficiente tanto para a parte visual quanto para a funcionalidade."
                      href="https://castelloruspoli.com/"
                    />
                  ),
                },
                {
                  id: 3,
                  content: (
                    <FeaturedProject
                      imageSrc="/images/projects/castelloruspoli.png"
                      category="WordPress"
                      heading="Castello Ruspoli"
                      subheading="Elegante e otimizado"
                      description="Um tema personalizado para WordPress, desenvolvido para o site do histórico Castello Ruspoli, um castelo com origens que remontam a 847. Utiliza tecnologias como WordPress, SASS para estilização, Node.js para a automação de tarefas, Webpack para empacotamento de módulos e Babel para a transpilação de JavaScript, visando garantir um código otimizado e eficiente tanto para a parte visual quanto para a funcionalidade."
                      href="https://castelloruspoli.com/"
                    />
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
