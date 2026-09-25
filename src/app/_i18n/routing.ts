import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
})

export type AppLocale = (typeof routing.locales)[number]

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
