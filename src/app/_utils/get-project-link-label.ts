import { ProjectLinkType } from '@prisma/client'

type LinkTranslationKey =
  | 'links.github'
  | 'links.gitlab'
  | 'links.figma'
  | 'links.youtube'
  | 'links.website'
  | 'links.other'

type LinkTranslator = (key: LinkTranslationKey) => string

const DEFAULT_LINK_LABELS: Record<ProjectLinkType, string> = {
  [ProjectLinkType.GITHUB]: 'GitHub',
  [ProjectLinkType.GITLAB]: 'GitLab',
  [ProjectLinkType.FIGMA]: 'Design',
  [ProjectLinkType.YOUTUBE]: 'Ver Vídeo',
  [ProjectLinkType.WEBSITE]: 'Ver Online',
  [ProjectLinkType.OTHER]: 'Acessar Link',
}

const LINK_TRANSLATION_KEYS: Record<ProjectLinkType, LinkTranslationKey> = {
  [ProjectLinkType.GITHUB]: 'links.github',
  [ProjectLinkType.GITLAB]: 'links.gitlab',
  [ProjectLinkType.FIGMA]: 'links.figma',
  [ProjectLinkType.YOUTUBE]: 'links.youtube',
  [ProjectLinkType.WEBSITE]: 'links.website',
  [ProjectLinkType.OTHER]: 'links.other',
}

export function getProjectLinkLabel(
  type: ProjectLinkType,
  t?: LinkTranslator,
): string {
  return t ? t(LINK_TRANSLATION_KEYS[type]) : DEFAULT_LINK_LABELS[type]
}
