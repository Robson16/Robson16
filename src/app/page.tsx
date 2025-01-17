import AboutSection from '@/components/AboutSection'
import ExperienceSection from '@/components/ExperienceSection'
import Header from '@/components/Header'
import SkillsSections from '@/components/SkillsSection'
import SocialLink from '@/components/SocialLink'
import Image from 'next/image'
import {
  AiFillGithub,
  AiFillGitlab,
  AiFillLinkedin,
  AiOutlineMail,
} from 'react-icons/ai'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section
          id="home"
          className="bg-[url('/images/code.jpg')] bg-cover bg-center"
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
        <AboutSection />
        <SkillsSections />
        <ExperienceSection />
      </main>
    </>
  )
}
