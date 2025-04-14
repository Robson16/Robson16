import { technical } from '@/data/skills.json'
import { Button, Link } from '@heroui/react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { FaDownload } from 'react-icons/fa'

export default function AboutSection() {
  const t = useTranslations('About')

  return (
    <section id="about" aria-labelledby="about-title">
      <div className="container mx-auto my-28 max-w-screen-sm px-4 xl:max-w-screen-lg">
        <div className="flex flex-col items-center gap-16 xl:flex-row">
          <div className="flex flex-1 flex-col">
            <Image
              src="/images/about-image.png"
              alt={t('imageAlt')}
              width={480}
              height={290}
            />
          </div>
          <div className="flex flex-1 flex-col items-center xl:items-start">
            <h2
              id="about-title"
              className="mb-4 text-center text-4xl font-medium xl:text-left"
            >
              {t('title')}
            </h2>
            <p className="mb-8 text-center leading-7 xl:text-left">
              {t('description')}
            </p>
            <ul className="mb-8 flex max-w-sm flex-wrap justify-center gap-4 xl:justify-start">
              {technical.slice(0, 8).map((skill) => (
                <li
                  key={skill.id}
                  className="rounded border border-solid border-teal-600 px-3 py-1"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              radius="full"
              as={Link}
              href="/documents/robson-h-rodrigues-cv.pdf"
              download="robson-h-rodrigues-cv.pdf"
              aria-label="Baixar currículo"
              endContent={<FaDownload size={16} />}
              className={clsx(
                'flex items-center gap-2 px-8 py-3',
                'bg-emerald-800 font-bold text-white transition-all',
                'hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500',
              )}
            >
              {t('downloadResumeButton')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
