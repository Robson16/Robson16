type DateInput = Date | string | number | null | undefined

/**
 * Formats a date to the local standard (Day, Abbreviated Month, Year).
 * @param date - Date object, ISO String, or Timestamp.
 * @param locale - Language code (e.g. 'pt', 'en-US').
 * @returns Formatted string or a hyphen '-' in case of an invalid date.
 */
export function formatDate(date: DateInput, locale: string): string {
  if (!date) return '-'

  try {
    const dateObject = new Date(date)

    if (isNaN(dateObject.getTime())) {
      return '-'
    }

    const rawMonth = new Intl.DateTimeFormat(locale, { month: 'short' }).format(
      dateObject,
    )

    const capitalizedMonth =
      rawMonth.charAt(0).toUpperCase() + rawMonth.slice(1)

    const fullFormat = new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(dateObject)

    return fullFormat.replace(rawMonth, capitalizedMonth)
  } catch (error) {
    console.error('Error formatting date:', error)
    return '-'
  }
}
