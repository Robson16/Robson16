import DynamicIcon from '@/components/DynamicIcon'
import SocialButtons from '@/components/SocialButtons'
import contactsData from '@/data/contacts.json'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

export default function HeroSection() {
  const { email, location } = contactsData
  const t = useTranslations('Hero')
  const locale = useLocale()

  return (
    <section
      id="home"
      className="bg-[url('/images/code.jpg')] bg-cover bg-center"
    >
      <div className="bg-black bg-opacity-70">
        <div className="container mx-auto max-w-screen-lg px-4 py-20 md:py-40 xl:py-56">
          <div className="flex flex-col-reverse gap-8 xl:flex-row">
            <div className="flex flex-1 flex-col items-center justify-center xl:items-start">
              <span className="mb-4 rounded-r-[20px] rounded-tl-[20px] bg-emerald-800 px-8 py-2">
                {t('greeting')}
              </span>
              <h1 className="mb-4 text-center text-5xl font-bold xl:text-left">
                {t('title')}
              </h1>
              <h2 className="text-2xl font-medium">{t('subtitle')}</h2>
              <ul className="my-10">
                <li className="group my-2 flex items-center">
                  <DynamicIcon
                    icon="AiOutlineMail"
                    iconFamily="ai"
                    size={22}
                    className="mr-2 text-gray-500 transition-colors group-hover:text-emerald-600"
                  />
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
                <li className="group my-2 flex items-center">
                  <DynamicIcon
                    icon="FaMapMarkerAlt"
                    iconFamily="fa"
                    size={22}
                    className="mr-2 text-gray-500 transition-colors group-hover:text-emerald-600"
                  />
                  <a
                    href={location.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* Dynamically renders the location name based on the current locale,
                    defaulting to Portuguese ('pt') if the locale-specific translation is missing. */}
                    {location.name[locale as keyof typeof location.name] ||
                      location.name.pt}
                  </a>
                </li>
              </ul>
              <div className="flex items-center gap-4">
                <SocialButtons />
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center xl:items-end">
              <figure className="rounded-full border-[20px] border-zinc-950">
                <Image
                  src="/images/profile.jpg"
                  priority={true}
                  alt={t('avatarAlt')}
                  width={360}
                  height={360}
                  className="mx-auto max-w-60 rounded-full border-[20px] border-zinc-900 xl:max-w-none"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
