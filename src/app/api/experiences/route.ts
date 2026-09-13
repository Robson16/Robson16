import { NextResponse } from 'next/server'

import experiencesData from '@/app/_data/experiences.json'

export async function GET() {
  return NextResponse.json(experiencesData)
}
