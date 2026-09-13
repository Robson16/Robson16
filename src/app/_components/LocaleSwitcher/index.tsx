'use client'

import { ListBox, Select } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState, useTransition } from 'react'

import { locales } from '@/app/_i18n/routing'

const { languages } = locales

export default function LocaleSwitcher() {
  const [isMobile, setIsMobile] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const localActive = useLocale()
  const t = useTranslations('Header')

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    checkIsMobile()

    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  const onSelectionChange = (key: React.Key | null) => {
    if (!key) return
    const nextLocale = String(key)
    startTransition(() => {
      router.replace(`/${nextLocale}`)
    })
  }

  return (
    <Select
      className={isMobile ? 'w-auto' : 'w-52 min-w-52'}
      selectedKey={localActive}
      onSelectionChange={onSelectionChange}
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
