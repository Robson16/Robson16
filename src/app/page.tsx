import Header from '@/components/Header'
import SocialLink from '@/components/SocialLink'
import Image from 'next/image'
import {
  AiFillGithub,
  AiFillGitlab,
  AiFillLinkedin,
  AiOutlineMail,
} from 'react-icons/ai'
import { FaDownload, FaMapMarkerAlt } from 'react-icons/fa'
import { IoCodeSlashOutline } from 'react-icons/io5'
import { GoDatabase } from 'react-icons/go'
import { PiLightningLight } from 'react-icons/pi'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section
          id="home"
          className="bg-[url('/images/bg-above-the-fold.jpg')] bg-cover bg-center"
        >
          <div className="bg-black bg-opacity-70">
            <div className="container mx-auto max-w-screen-lg px-4 py-20 md:py-56">
              <div className="flex columns-2 flex-col-reverse gap-8 md:flex-row">
                <div className="flex flex-1 flex-col items-center justify-center md:items-start">
                  <span className="mb-4 rounded-r-[20px] rounded-tl-[20px] bg-teal-600 px-8 py-2">
                    Olá, me chamo
                  </span>
                  <h1 className="mb-4 text-center text-5xl font-bold md:text-left">
                    Robson H. Rodrigues
                  </h1>
                  <h2 className="text-2xl font-medium">Desenvolvedor Web</h2>
                  <ul className="my-10">
                    <li className="group my-2 flex items-center">
                      <AiOutlineMail
                        size={16}
                        className="mr-2 text-gray-500 group-hover:text-teal-600"
                      />
                      <a href="mailto:robhenrod@gmail.com">
                        robhenrod@gmail.com
                      </a>
                    </li>
                    <li className="group my-2 flex items-center">
                      <FaMapMarkerAlt
                        size={16}
                        className="mr-2 text-gray-500 group-hover:text-teal-600"
                      />
                      <span>Jundiaí - São Paulo / Brasil</span>
                    </li>
                  </ul>
                  <ul className="flex">
                    <li className="my-4 mr-4">
                      <SocialLink
                        href="https://github.com/Robson16"
                        Icon={AiFillGithub}
                      />
                    </li>
                    <li className="my-4 mr-4">
                      <SocialLink
                        href="https://gitlab.com/Robson16"
                        Icon={AiFillGitlab}
                      />
                    </li>
                    <li className="my-4 mr-4">
                      <SocialLink
                        href="https://www.linkedin.com/in/robson-h-rodrigues-93341746/"
                        Icon={AiFillLinkedin}
                      />
                    </li>
                  </ul>
                </div>
                <div className="flex flex-1 flex-col items-center md:items-end">
                  <figure className="rounded-full border-[20px] border-zinc-950">
                    <Image
                      src="/images/profile.jpg"
                      priority={true}
                      alt="Picture of the author"
                      width={360}
                      height={360}
                      className="mx-auto max-w-[240px] rounded-full border-[20px] border-zinc-900 md:max-w-none"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="container mx-auto mt-28 max-w-screen-lg px-4">
            <div className="flex columns-2 flex-col items-center gap-16 md:flex-row">
              <div className="flex flex-1 flex-col">
                <Image
                  src="/images/about-image.png"
                  alt="About image"
                  width={480}
                  height={290}
                  className=" "
                />
              </div>
              <div className="flex flex-1 flex-col items-center md:items-start">
                <h2 className="mb-4 text-center text-4xl font-medium md:text-left">
                  Sobre mim
                </h2>
                <p className="mb-8 text-center leading-7 md:text-left">
                  Olá, sou Robson, Desenvolvedor Web de Jundiaí - SP, Brasil.
                  Com experiência em desenvolvimento web e mobile, foco em
                  aplicações escaláveis e otimizadas. Conhecimentos em
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

          <div className="container mx-auto mt-40 max-w-screen-lg px-4">
            <h2 className="mb-16 text-center text-4xl font-medium">
              O que faço
            </h2>
            <div className="flex columns-3 flex-col gap-8 md:flex-row">
              <div className="flex flex-1 flex-col rounded-sm bg-zinc-800 p-8 shadow-2xl">
                <IoCodeSlashOutline
                  size={30}
                  className="mb-5 mt-4 text-emerald-600"
                />
                <h3 className="mb-4 min-h-[65px] text-2xl font-medium">
                  Desenvolvimento Web e Mobile
                </h3>
                <p>
                  Criação de aplicações web e mobile responsivas e escaláveis,
                  utilizando tecnologias modernas para garantir alta
                  performance, segurança e uma excelente experiência do usuário.
                </p>
              </div>
              <div className="flex flex-1 flex-col rounded-sm bg-zinc-800 p-8 shadow-2xl">
                <GoDatabase size={30} className="mb-5 mt-4 text-purple-600" />
                <h3 className="mb-4 min-h-[65px] text-2xl font-medium">
                  API e Banco de Dados
                </h3>
                <p>
                  Desenvolvimento de APIs eficientes e bem estruturadas,
                  garantindo integração fluida entre sistemas. Trabalho com
                  bancos de dados relacionais e não relacionais, com foco em
                  otimização e escalabilidade.
                </p>
              </div>
              <div className="flex flex-1 flex-col rounded-sm bg-zinc-800 p-8 shadow-2xl">
                <PiLightningLight
                  size={30}
                  className="mb-5 mt-4 text-yellow-600"
                />
                <h3 className="mb-4 min-h-[65px] text-2xl font-medium">
                  Boas Práticas e Performance
                </h3>
                <p>
                  Aplicação de princípios como SOLID, TDD e DDD para garantir
                  código limpo e sustentável. Implementação de estratégias para
                  otimizar a performance das aplicações, seguindo as melhores
                  práticas do mercado.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="container mx-auto max-w-screen-lg px-4 py-28"></div>
        </section>
      </main>
    </>
  )
}
