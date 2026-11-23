import { getRequestConfig } from 'next-intl/server'

import { AppLocale, routing } from './routing'

export default getRequestConfig(async ({ locale: explicitLocale }) => {
  let locale = explicitLocale ?? routing.defaultLocale

  if (!locale || !routing.locales.includes(locale as AppLocale)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    timeZone: 'America/Sao_Paulo',
    messages: (await import(`../../../messages/${locale}.json`)).default,
  }
})
