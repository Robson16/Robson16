import DynamicIcon from '@/components/DynamicIcon'
import iconsData from '@/data/icons.json'
import social from '@/data/social.json'
import { Button } from '@heroui/button'
import { Link } from '@heroui/link'

export default function SocialButtons() {
  const icons = iconsData.icons

  return (
    <>
      {Object.entries(social).map(([key, value]) => {
        const iconKey = key as keyof typeof icons

        return (
          <Button
            key={key}
            isIconOnly
            as={Link}
            href={value.url}
            aria-label={value.name}
            className="group flex h-auto w-auto min-w-0 items-start justify-center bg-transparent p-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DynamicIcon
              icon={icons[iconKey].name}
              iconFamily={icons[iconKey].family}
              size={30}
              className="transition-colors group-hover:text-emerald-600"
            />
          </Button>
        )
      })}
    </>
  )
}
