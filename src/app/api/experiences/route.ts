import { experiences } from '@/data/experiences.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(experiences)
}
