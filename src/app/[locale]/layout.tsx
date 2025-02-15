import { routing } from '@/i18n/routing'
import '@/styles/globals.css'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Roboto } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { Providers } from '../providers'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Robson H. Rodrigues',
  description:
    '33 anos, Jundiaí - SP, Desenvolvedor Web, formado em Gestão da Informação pela FATEC Jundiaí',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

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
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body className={roboto.className}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
      <GoogleTagManager gtmId={process.env.GOOGLE_TAG_ID || ''} />
    </html>
  )
}
