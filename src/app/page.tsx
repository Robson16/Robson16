import { locales, routing } from '@/i18n/routing'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  // Retrieves all the headers from the incoming HTTP request. 'await' is used because 'headers()' returns a Promise.
  const headersList = await headers()

  // Gets the value of the 'accept-language' header from the request. This header indicates the user's preferred languages as set in their browser.
  const acceptLanguage = headersList.get('accept-language')

  // Initializes a 'locale' variable with the default locale specified in the 'locales' object (imported from '@/i18n/routing').
  // This will be the fallback language if no preferred language is detected or supported.
  let locale = locales.default

  // Checks if the 'accept-language' header exists in the request.
  if (acceptLanguage) {
    // If the 'accept-language' header exists, this line attempts to extract the most preferred language:
    // 1. 'acceptLanguage.split(',')': Splits the header string into an array of language tags (e.g., 'en-US,en;q=0.9,fr;q=0.8').
    // 2. '[0]': Takes the first element of the array, which is the most preferred language tag (e.g., 'en-US').
    // 3. '.split(';')': Splits this language tag further by a semicolon, as it might contain quality values (e.g., 'en-US;q=0.9').
    // 4. '[0]': Takes the first part, which is the language code itself (e.g., 'en-US').
    const preferredLocale = acceptLanguage.split(',')[0].split(';')[0]

    // Checks if the extracted 'preferredLocale' is included in the list of supported locales defined in 'routing.locales' (imported from '@/i18n/routing').
    if (routing.locales.includes(preferredLocale)) {
      // If the preferred locale is supported, the 'locale' variable is updated to this preferred value.
      locale = preferredLocale
    }
  }

  // Performs a server-side redirect to the root path followed by the determined 'locale' (e.g., '/en', '/pt-BR').
  // This ensures that the user is navigated to the homepage corresponding to their preferred language (if supported) or the default language.
  redirect(`/${locale}`)
}
