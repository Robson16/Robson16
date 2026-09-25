'use client'

import { ListBox, Select } from '@heroui/react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState, useTransition } from 'react'

import { usePathname, useRouter } from '@/app/_i18n/routing'

const languages = [
  { key: 'pt', label: 'Português (Brasil)' },
  { key: 'en', label: 'English' },
]

export default function LocaleSwitcher() {
  const [isMobile, setIsMobile] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const localActive = useLocale()
  const t = useTranslations('Header')

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 1024)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const handleLocaleChange = (value: React.Key | null) => {
    if (!value) return
    const nextLocale = String(value) as 'pt' | 'en'

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <Select
      className={isMobile ? 'w-auto' : 'w-52 min-w-52'}
      value={localActive}
      onChange={handleLocaleChange}
      isDisabled={isPending}
      aria-label={t('languageSelector')}
    >
      <Select.Trigger className="border-2 border-solid border-white hover:border-emerald-500">
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {languages.map((language) => (
            <ListBox.Item
              key={language.key}
              id={language.key}
              textValue={language.label}
            >
              {language.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
