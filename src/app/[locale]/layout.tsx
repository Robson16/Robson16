import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ReactNode } from 'react'

import { routing } from '@/app/_i18n/routing'

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

interface GenerateMetadataProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: GenerateMetadataProps) {
  const { locale } = await params

  const messages = (await getMessages({ locale })) as {
    MetaData?: {
      title?: string
      description?: string
      keywords?: string[] | string
    }
  }

  const meta = messages?.MetaData || {}

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
