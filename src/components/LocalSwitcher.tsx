'use client'

import { locales } from '@/i18n/routing'
import { Select, SelectItem } from '@heroui/select'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState, useTransition } from 'react'

const { languages } = locales

export default function LocalSwitcher() {
  const [isMobile, setIsMobile] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const localActive = useLocale()
  const t = useTranslations('navbar')

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

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value
    startTransition(() => {
      router.replace(`/${nextLocale}`)
    })
  }

  return (
    <Select
      classNames={{
        base: 'w-auto min-w-52 ',
        trigger: 'border-2 border-solid border-white hover:border-emerald-500',
      }}
      label={t('languageSelector')}
      placeholder={t('languageSelector')}
      defaultSelectedKeys={[localActive]}
      onChange={onSelectChange}
      isDisabled={isPending}
      variant="bordered"
      size={isMobile ? 'sm' : 'md'}
      labelPlacement={isMobile ? 'outside-left' : 'inside'}
    >
      {languages.map((language) => (
        <SelectItem key={language.key}>{language.label}</SelectItem>
      ))}
    </Select>
  )
}
