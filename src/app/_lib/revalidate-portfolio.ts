import { revalidatePath } from 'next/cache'

import { routing } from '@/app/_i18n/routing'

export type AdminRevalidateSection =
  | 'education'
  | 'experiences'
  | 'features'
  | 'languages'
  | 'profile'
  | 'projects'
  | 'skills'

interface RevalidatePortfolioOptions {
  adminSection?: AdminRevalidateSection
  projectSlugs?: Array<string | null | undefined>
}

export function revalidatePortfolioCache(
  options: RevalidatePortfolioOptions = {},
) {
  const { adminSection, projectSlugs = [] } = options

  const uniqueSlugs = Array.from(
    new Set(
      projectSlugs.filter((slug): slug is string =>
        Boolean(slug && slug.trim()),
      ),
    ),
  )

  for (const locale of routing.locales) {
    // Rotas públicas SSG principais
    revalidatePath(`/${locale}`)
    revalidatePath(`/${locale}/curriculum-preview`)

    // Páginas de detalhe de projeto (quando aplicável)
    for (const slug of uniqueSlugs) {
      revalidatePath(`/${locale}/projects/${slug}`)
    }

    // Seção correspondente no Admin (com prefixo de locale correto)
    if (adminSection) {
      revalidatePath(`/${locale}/admin/${adminSection}`)
    }
  }
}
