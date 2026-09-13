import { Link } from '@heroui/react'

import DynamicIcon from '@/app/_components/DynamicIcon'
import iconsData from '@/app/_data/icons.json'
import socialData from '@/app/_data/social.json'

export default function SocialButtons() {
  const icons = iconsData.icons

  return (
    <>
      {Object.entries(socialData).map(([key, value]) => {
        const iconKey = key as keyof typeof icons

        return (
          <Link
            key={key}
            href={value.url}
            aria-label={value.name}
            className="group flex size-auto min-w-0 items-start justify-center bg-transparent p-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DynamicIcon
              icon={icons[iconKey].name}
              iconFamily={icons[iconKey].family}
              size={30}
              className="transition-colors group-hover:text-emerald-600"
            />
          </Link>
        )
      })}
    </>
  )
}
