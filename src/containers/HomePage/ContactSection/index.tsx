import DynamicIcon from '@/components/DynamicIcon'
import { email, location } from '@/data/contact.json'
import { linkedin } from '@/data/social.json'
import { useTranslations } from 'next-intl'

export default function ContactSection() {
  const t = useTranslations()

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
            {t('contact.title')}
          </h3>
          <div className="flex flex-col items-center gap-8 xl:flex-row">
            <a
              href={location.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-80 max-w-80 flex-1 flex-col items-center justify-center gap-8 rounded-lg bg-zinc-800 p-8 shadow-2xl"
            >
              <span className="flex items-center justify-center rounded-full border-2 border-solid border-emerald-700 p-10 transition-colors group-hover:border-emerald-600">
                <DynamicIcon
                  icon="FaMapMarkerAlt"
                  iconFamily="fa"
                  size={40}
                  className="transition-colors group-hover:text-emerald-600"
                />
              </span>
              <span className="text-lg">
                {t('about.location.name', {
                  defaultMessage: location.name,
                })}
              </span>
            </a>
            <a
              href={`mailto:${email}`}
              className="group flex min-w-80 max-w-80 flex-1 flex-col items-center justify-center gap-8 rounded-lg bg-zinc-800 p-8 shadow-2xl"
            >
              <span className="flex items-center justify-center rounded-full border-2 border-solid border-emerald-700 p-10 transition-colors group-hover:border-emerald-600">
                <DynamicIcon
                  icon="AiOutlineMail"
                  iconFamily="ai"
                  size={40}
                  className="transition-colors group-hover:text-emerald-600"
                />
              </span>
              <span className="text-lg">{email}</span>
            </a>
            <a
              href={linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-80 max-w-80 flex-1 flex-col items-center justify-center gap-8 rounded-lg bg-zinc-800 p-8 shadow-2xl"
            >
              <span className="flex items-center justify-center rounded-full border-2 border-solid border-emerald-700 p-10 transition-colors group-hover:border-emerald-600">
                <DynamicIcon
                  icon="AiFillLinkedin"
                  iconFamily="ai"
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
