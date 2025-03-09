import { routing } from '@/i18n/routing'
import '@/styles/globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <div lang={locale}>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  )
}
