import { db } from '@/app/_lib/prisma'

interface LocaleTranslation {
  locale: string
}

export async function validateTranslations<
  T extends LocaleTranslation,
  K extends string = never,
>(
  translations: T[],
  requiredFields: readonly K[] = [],
): Promise<string | null> {
  const languages = await db.language.findMany({
    select: { code: true, isDefault: true },
  })
  const languageCodes = new Set(languages.map((language) => language.code))
  const defaultLanguage = languages.find((language) => language.isDefault)

  if (!defaultLanguage) {
    return 'No default language is configured.'
  }

  const translationLocales = new Set<string>()

  for (const translation of translations) {
    if (!languageCodes.has(translation.locale)) {
      return `Language "${translation.locale}" is not configured.`
    }

    if (translationLocales.has(translation.locale)) {
      return `Duplicate translation for language "${translation.locale}".`
    }

    translationLocales.add(translation.locale)
  }

  const defaultTranslation = translations.find(
    (translation) => translation.locale === defaultLanguage.code,
  )

  if (!defaultTranslation) {
    return 'A translation for the default language is required.'
  }

  const missingFields = requiredFields.filter((field) => {
    const value = (defaultTranslation as Record<string, unknown>)[field]
    return typeof value !== 'string' || value.trim().length === 0
  })

  if (missingFields.length > 0) {
    return `Required fields for the default language are missing: ${missingFields.join(', ')}.`
  }

  return null
}
