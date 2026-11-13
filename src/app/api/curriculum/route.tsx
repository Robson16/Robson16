export const dynamic = 'force-dynamic'

import { DocumentProps, renderToStream } from '@react-pdf/renderer'
import { NextRequest, NextResponse } from 'next/server'
import { getTranslations } from 'next-intl/server'
import { createElement, ReactElement } from 'react'

import { getCurriculumData } from '@/app/_actions/get-curriculum-data.action'
import ResumePDF from '@/app/_components/ResumePDF'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const locale = searchParams.get('locale') || 'pt'

    const data = await getCurriculumData(locale)

    const t = await getTranslations({ locale, namespace: 'Resume' })

    const dictionary = {
      objectiveTitle: t('objectiveTitle'),
      summaryTitle: t('summaryTitle'),
      experienceTitle: t('experienceTitle'),
      educationTitle: t('educationTitle'),
    }

    // Renderiza o componente <ResumePDF /> transformando-o num Stream de dados (Node.js)
    const pdfStream = await renderToStream(
      createElement(ResumePDF, {
        locale,
        data,
        dictionary,
      }) as unknown as ReactElement<DocumentProps>,
    )

    // Converte o Node.js Stream para um Web ReadableStream
    const webStream = new ReadableStream({
      start(controller) {
        pdfStream.on('data', (chunk) => controller.enqueue(chunk))
        pdfStream.on('end', () => controller.close())
        pdfStream.on('error', (err) => controller.error(err))
      },
    })

    // Devolve a resposta usando o Web Stream correto
    return new NextResponse(webStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Robson-H-Rodrigues-CV-${locale.toUpperCase()}.pdf"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    console.error('Erro ao gerar PDF do currículo:', error)
    return NextResponse.json(
      { error: 'Falha interna ao gerar o currículo.' },
      { status: 500 },
    )
  }
}
