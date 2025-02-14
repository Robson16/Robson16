import '@/styles/globals.css'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import 'resize-observer-polyfill'
import { Providers } from './providers'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <head />
      <body className={roboto.className}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          {children}
        </Providers>
      </body>
      <GoogleTagManager gtmId={process.env.GOOGLE_TAG_ID || ''} />
    </html>
  )
}
