import '@/app/globals.css'

import { GoogleTagManager } from '@next/third-parties/google'
import { Viewport } from 'next'
import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'

import { env } from '@/app/env'

import { Providers } from './providers'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning data-scroll-behavior="smooth">
      <GoogleTagManager gtmId={env.GOOGLE_TAG_ID} />
      <body className={roboto.className} suppressHydrationWarning>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
