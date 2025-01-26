import {
  AiFillGithub,
  AiFillGitlab,
  AiFillLinkedin,
  AiOutlineMail,
} from 'react-icons/ai'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-[url('/images/map.png')] bg-cover bg-center"
      aria-labelledby="contact-title"
    >
      <div className="bg-black bg-opacity-25">
        <div className="container mx-auto max-w-screen-lg px-4 py-20 md:py-56">
          <h3
            id="contact-title"
            className="mb-16 text-center text-4xl font-medium"
          >
            Contato
          </h3>
          <div className="flex flex-col gap-8 md:flex-row">
            <a
              href="https://maps.app.goo.gl/vTWz8snMHN1RdMkK6"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 flex-col items-center justify-center gap-8 rounded-lg bg-zinc-800 p-8 shadow-2xl"
            >
              <span className="flex items-center justify-center rounded-full border-2 border-solid border-emerald-700 p-10 transition-colors group-hover:border-emerald-600">
                <FaMapMarkerAlt
                  size={40}
                  className="transition-colors group-hover:text-emerald-600"
                />
              </span>
              <span className="text-lg">Jundiaí - São Paulo / Brasil</span>
            </a>
            <a
              href="mailto:robhenrod@gmail.com"
              className="group flex flex-1 flex-col items-center justify-center gap-8 rounded-lg bg-zinc-800 p-8 shadow-2xl"
            >
              <span className="flex items-center justify-center rounded-full border-2 border-solid border-emerald-700 p-10 transition-colors group-hover:border-emerald-600">
                <AiOutlineMail
                  size={40}
                  className="transition-colors group-hover:text-emerald-600"
                />
              </span>
              <span className="text-lg">robhenrod@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/robson-h-rodrigues-93341746/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 flex-col items-center justify-center gap-8 rounded-lg bg-zinc-800 p-8 shadow-2xl"
            >
              <span className="flex items-center justify-center rounded-full border-2 border-solid border-emerald-700 p-10 transition-colors group-hover:border-emerald-600">
                <AiFillLinkedin
                  size={40}
                  className="transition-colors group-hover:text-emerald-600"
                />
              </span>
              <span className="text-lg">Linkedin</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
