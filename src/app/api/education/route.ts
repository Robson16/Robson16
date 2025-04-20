import educationData from '@/data/education.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(educationData)
}
