import projectsData from '@/data/projects.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(projectsData)
}
