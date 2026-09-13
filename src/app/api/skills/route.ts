import { NextResponse } from 'next/server'

import skillsData from '@/app/_data/skills.json'

export async function GET() {
  return NextResponse.json(skillsData)
}
