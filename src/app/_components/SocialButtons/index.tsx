'use client'

import { Link } from '@heroui/react'
import { sendGTMEvent } from '@next/third-parties/google'

import DynamicIcon from '@/app/_components/DynamicIcon'
import iconsData from '@/app/_data/icons.json'

type IconKey = keyof typeof iconsData.icons

interface SocialButtonData {
  id: string
  name: string
  icon: string
  url: string
}

interface SocialButtonsProps {
  socialData: SocialButtonData[]
}

export default function SocialButtons({ socialData }: SocialButtonsProps) {
  const icons = iconsData.icons

  const handleSocialClick = (name: string, url: string) => {
    sendGTMEvent({
      event: 'click_external_link',
      link_type: name.toLowerCase(),
      url: url,
    })
  }

  return (
    <>
      {socialData.map((social) => {
        // It performs a safe cast of the database string to a known JSON key.
        const iconKey = social.icon as IconKey
        const iconConfig = icons[iconKey]

        // Security fallback: if the bank icon does not exist in the JSON, the page will not break.
        if (!iconConfig) {
          console.warn(`Icon not found in JSON: ${social.icon}`)
          return null
        }

        return (
          <Link
            key={social.id}
            href={social.url}
            aria-label={social.name}
            className="group flex size-auto min-w-0 items-start justify-center bg-transparent p-0"
            onClick={() => handleSocialClick(social.name, social.url)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DynamicIcon
              icon={iconConfig.name}
              iconFamily={iconConfig.family}
              size={30}
              className="transition-colors group-hover:text-emerald-600"
            />
          </Link>
        )
      })}
    </>
  )
}
