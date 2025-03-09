import { locales, routing } from '@/i18n/routing'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language')
  let locale = locales.default

  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0].split(';')[0]
    if (routing.locales.includes(preferredLocale)) {
      locale = preferredLocale
    }
  }

  redirect(`/${locale}`)
}
