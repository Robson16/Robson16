import { AiFillGithub, AiFillGitlab, AiFillYoutube } from 'react-icons/ai'
import { FaExternalLinkAlt, FaLink } from 'react-icons/fa'
import { LuFigma } from 'react-icons/lu'

interface PlatformIconProps {
  platform: string
  size?: number
  className?: string
}

export function PlatformIcon({
  platform,
  size = 20,
  className,
}: PlatformIconProps) {
  const type = platform.toUpperCase()

  switch (type) {
    case 'GITHUB':
      return <AiFillGithub size={size} className={className} />
    case 'GITLAB':
      return <AiFillGitlab size={size} className={className} />
    case 'FIGMA':
      return <LuFigma size={size} className={className} />
    case 'YOUTUBE':
      return <AiFillYoutube size={size} className={className} />
    case 'WEBSITE':
      return <FaExternalLinkAlt size={size} className={className} />
    default:
      return <FaLink size={size} className={className} />
  }
}
