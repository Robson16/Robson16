'use client'

import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'

import ResumePDF from './index'

type PreviewProps = ComponentProps<typeof ResumePDF>

const DynamicViewer = dynamic(() => import('./ClientViewer'), {
  ssr: false,
})

export default function ResumePDFPreview(props: PreviewProps) {
  return <DynamicViewer {...props} />
}
