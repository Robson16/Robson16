import { Link } from '@heroui/react'

import DynamicIcon from '@/app/_components/DynamicIcon'
import iconsData from '@/app/_data/icons.json'
import { db } from '@/app/_lib/prisma'

type IconKey = keyof typeof iconsData.icons

export default async function SocialButtons() {
  const icons = iconsData.icons

  const socialData = await db.socialLink.findMany({
    orderBy: {
      order: 'asc',
    },
  })

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
