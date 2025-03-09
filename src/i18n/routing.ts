import { Locale } from '@/types/Locale'
import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const locales: Locale = {
  default: 'pt',
  languages: [
    { key: 'en', label: 'English' },
    { key: 'pt', label: 'Português (Brasil)' },
  ],
}

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: locales.languages.map((language) => language.key),

  // Used when no locale matches
  defaultLocale: locales.default,
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
