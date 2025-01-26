import { Button, Link } from '@heroui/react'
import Image from 'next/image'
import {
  AiFillGithub,
  AiFillGitlab,
  AiFillLinkedin,
  AiOutlineMail,
} from 'react-icons/ai'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function HeroSection() {
  return (
    <section
      id="home"
      className="bg-[url('/images/code.jpg')] bg-cover bg-center"
    >
      <div className="bg-black bg-opacity-70">
        <div className="container mx-auto max-w-screen-lg px-4 py-20 md:py-56">
          <div className="flex flex-col-reverse gap-8 md:flex-row">
            <div className="flex flex-1 flex-col items-center justify-center md:items-start">
              <span className="mb-4 rounded-r-[20px] rounded-tl-[20px] bg-emerald-800 px-8 py-2">
                Olá, me chamo
              </span>
              <h1 className="mb-4 text-center text-5xl font-bold md:text-left">
                Robson H. Rodrigues
              </h1>
              <h2 className="text-2xl font-medium">Desenvolvedor Web</h2>
              <ul className="my-10">
                <li className="group my-2 flex items-center">
                  <AiOutlineMail
                    size={22}
                    className="mr-2 text-gray-500 transition-colors group-hover:text-emerald-600"
                  />
                  <a href="mailto:robhenrod@gmail.com">robhenrod@gmail.com</a>
                </li>
                <li className="group my-2 flex items-center">
                  <FaMapMarkerAlt
                    size={22}
                    className="mr-2 text-gray-500 transition-colors group-hover:text-emerald-600"
                  />
                  <a
                    href="https://maps.app.goo.gl/vTWz8snMHN1RdMkK6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Jundiaí - São Paulo / Brasil
                  </a>
                </li>
              </ul>
              <div className="flex items-center gap-4">
                <Button
                  isIconOnly
                  as={Link}
                  href="https://github.com/Robson16"
                  aria-label="Meu GitHub"
                  className="group flex h-auto w-auto min-w-0 items-start justify-center bg-transparent p-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillGithub
                    className="transition-colors group-hover:text-emerald-600"
                    size={30}
                  />
                </Button>
                <Button
                  isIconOnly
                  as={Link}
                  href="https://gitlab.com/Robson16"
                  aria-label="Meu GitLab"
                  className="group flex h-auto w-auto min-w-0 items-start justify-center bg-transparent p-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillGitlab
                    className="transition-colors group-hover:text-emerald-600"
                    size={30}
                  />
                </Button>
                <Button
                  isIconOnly
                  as={Link}
                  href="https://www.linkedin.com/in/robson-h-rodrigues-93341746/"
                  aria-label="Meu LinkedIn"
                  className="group flex h-auto w-auto min-w-0 items-start justify-center bg-transparent p-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillLinkedin
                    className="transition-colors group-hover:text-emerald-600"
                    size={30}
                  />
                </Button>
              </div>
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
  )
}
