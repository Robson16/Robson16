import { getTranslations } from 'next-intl/server'

import { getCurriculumData } from '@/app/_actions/get-curriculum-data.action'
import ResumePDFPreview from '@/app/_components/ResumePDF/Preview'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function CVPreviewPage({ params }: PageProps) {
  const { locale } = await params

  const data = await getCurriculumData(locale)

  const t = await getTranslations('Resume')

  const dictionary = {
    objectiveTitle: t('objectiveTitle'),
    summaryTitle: t('summaryTitle'),
    experienceTitle: t('experienceTitle'),
    educationTitle: t('educationTitle'),
  }

  return (
    <ResumePDFPreview locale={locale} data={data} dictionary={dictionary} />
  )
}
