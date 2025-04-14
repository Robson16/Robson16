import { routing } from '@/i18n/routing'
import '@/styles/globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

interface LocaleLayoutProps {
  children: ReactNode
  params: { locale: string }
}

interface GenerateMetadataProps {
  params: { locale: string }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: GenerateMetadataProps) {
  const { locale } = params
  // TODO: Fix this any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages: any = await getMessages({ locale })

  const { title, description, keywords } = messages.MetaData

  return {
    title,
    description,
    keywords,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Ensure that the incoming `locale` is valid
  const { locale } = params

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
