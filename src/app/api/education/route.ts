import { NextResponse } from 'next/server'
import { education } from '@/lib/data'

export async function GET() {
  return NextResponse.json(education)
}
