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
    <main>
      <div className="container max-w-screen-xl mx-auto py-28 px-4">
        <div className="columns-2 flex flex-col md:flex-row">
          <div className="flex flex-col justify-center items-center md:items-start flex-1">
            <h1 className="text-5xl font-bold mb-4 text-center md:text-left">
              Robson H. Rodrigues
            </h1>
            <h2 className="text-2xl font-medium">Desenvolvedor Web</h2>
            <ul className="my-10">
              <li className="group flex items-center my-2">
                <AiOutlineMail
                  size={16}
                  className="text-gray-500 group-hover:text-teal-600 mr-2"
                />
                <a href="mailto:robhenrod@gmail.com">robhenrod@gmail.com</a>
              </li>
              <li className="group flex items-center my-2">
                <FaMapMarkerAlt
                  size={16}
                  className="text-gray-500 group-hover:text-teal-600 mr-2"
                />
                <span>Jundiaí - São Paulo / Brasil</span>
              </li>
            </ul>
            <ul className="flex">
              <li className="my-4 mr-4">
                <a
                  href="https://github.com/Robson16"
                  target="_blank"
                  className="text-gray-300 hover:text-teal-600"
                >
                  <AiFillGithub size={24} />
                </a>
              </li>
              <li className="my-4 mr-4">
                <a
                  href="https://gitlab.com/Robson16"
                  target="_blank"
                  className="text-gray-300 hover:text-teal-600"
                >
                  <AiFillGitlab size={24} />
                </a>
              </li>
              <li className="my-4 mr-4">
                <a
                  href="https://www.linkedin.com/in/robson-h-rodrigues-93341746/"
                  target="_blank"
                  className="text-gray-300 hover:text-teal-600"
                >
                  <AiFillLinkedin size={24} />
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center flex-1">
            <figure className="mx-auto rounded-full border-[20px] border-zinc-950">
              <Image
                src="https://github.com/Robson16.png"
                priority={true}
                alt="Picture of the author"
                width={360}
                height={360}
                className="mx-auto rounded-full border-[20px] border-zinc-900"
              />
            </figure>
          </div>
        </div>
      </div>
    </main>
  )
}
