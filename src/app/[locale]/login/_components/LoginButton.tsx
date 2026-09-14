'use client'

import { signIn } from 'next-auth/react'
import { useLocale } from 'next-intl'
import { FaGithub } from 'react-icons/fa'

interface LoginButtonProps {
  text: string
}

export function LoginButton({ text }: LoginButtonProps) {
  const locale = useLocale()

  return (
    <button
      onClick={() => signIn('github', { callbackUrl: `/${locale}/admin` })}
      className="flex w-full items-center justify-center gap-3 rounded-xl bg-zinc-900 px-4 py-3 text-base font-semibold text-white transition-all hover:bg-zinc-800 hover:shadow-lg dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      <FaGithub className="text-xl" />
      {text}
    </button>
  )
}
