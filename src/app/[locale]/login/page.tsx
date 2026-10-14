import { redirect } from 'next/navigation' // Se quiser, use o redirect do next-intl aqui também!
import { getTranslations } from 'next-intl/server'
import { LuHouse } from 'react-icons/lu'

import { Link } from '@/app/_i18n/navigation'
import { env } from '@/app/env'
import { getAuthSession } from '@/auth'

import { LoginButton } from './_components/LoginButton'

export default async function LoginPage() {
  const session = await getAuthSession()

  if (session?.user?.email === env.ALLOWED_EMAIL) {
    redirect('/admin')
  }

  const t = await getTranslations('Login')

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <LoginButton text={t('buttonText')} />
        <Link
          href="/"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <LuHouse size={18} />
          {t('backHome')}
        </Link>

        <div className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-600">
          {t('warning')}
        </div>
      </div>
    </main>
  )
}
