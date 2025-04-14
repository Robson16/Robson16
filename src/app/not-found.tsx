import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <div className="flex min-h-screen items-center justify-center bg-black bg-opacity-70">
      <div className="container mx-auto max-w-screen-md px-4 py-16 text-center text-white">
        <div className="flex flex-col justify-center gap-10">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={150}
            height={81}
            className="self-center"
          />

          <h1 className="text-6xl font-bold tracking-tight">404</h1>
          <h2 className="text-3xl font-semibold">{t('title')}</h2>
          <p className="text-lg text-gray-300">{t('description')}</p>

          <Link
            href="/"
            className="w-fit self-center rounded-md bg-emerald-700 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-emerald-600"
          >
            {t('backHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}
