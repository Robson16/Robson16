'use client'

import { PDFViewer } from '@react-pdf/renderer'
import { ComponentProps } from 'react'

import ResumePDF from './index'

type PreviewProps = ComponentProps<typeof ResumePDF>

export default function ClientViewer({
  locale,
  data,
  dictionary,
}: PreviewProps) {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <PDFViewer style={{ width: '100%', height: '100%', border: 'none' }}>
        <ResumePDF locale={locale} data={data} dictionary={dictionary} />
      </PDFViewer>
    </div>
  )
}
