import '@/styles/globals.css'
import { GoogleTagManager } from '@next/third-parties/google'
import { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'
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

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning>
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
