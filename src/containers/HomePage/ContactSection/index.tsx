import { AiFillLinkedin, AiOutlineMail } from 'react-icons/ai'
import { FaMapMarkerAlt } from 'react-icons/fa'

type ContactSectionProps = {
  location: {
    url: string
    name: string
  }
  email: string
  linkedinUrl: string
}

export default function ContactSection({
  location,
  email,
  linkedinUrl,
}: ContactSectionProps) {
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
          <div className="flex flex-col items-center gap-8 lg:flex-row">
            <a
              href={location.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-[300px] max-w-[300px] flex-1 flex-col items-center justify-center gap-8 rounded-lg bg-zinc-800 p-8 shadow-2xl"
            >
              <span className="flex items-center justify-center rounded-full border-2 border-solid border-emerald-700 p-10 transition-colors group-hover:border-emerald-600">
                <FaMapMarkerAlt
                  size={40}
                  className="transition-colors group-hover:text-emerald-600"
                />
              </span>
              <span className="text-lg">{location.name}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="group flex min-w-[300px] max-w-[300px] flex-1 flex-col items-center justify-center gap-8 rounded-lg bg-zinc-800 p-8 shadow-2xl"
            >
              <span className="flex items-center justify-center rounded-full border-2 border-solid border-emerald-700 p-10 transition-colors group-hover:border-emerald-600">
                <AiOutlineMail
                  size={40}
                  className="transition-colors group-hover:text-emerald-600"
                />
              </span>
              <span className="text-lg">{email}</span>
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-[300px] max-w-[300px] flex-1 flex-col items-center justify-center gap-8 rounded-lg bg-zinc-800 p-8 shadow-2xl"
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
