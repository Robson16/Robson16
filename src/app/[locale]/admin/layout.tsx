import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6">
        <h1 className="mb-10 text-2xl font-bold text-emerald-500">
          Admin Panel
        </h1>
        <nav className="flex flex-col gap-4">
          <Link
            href="/admin"
            className="rounded p-2 transition-colors hover:bg-zinc-800"
          >
            Dashboard
          </Link>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-zinc-500 uppercase">
              Projects
            </span>
            <Link
              href="/admin/projects"
              className="ml-4 rounded p-2 text-sm transition-colors hover:bg-zinc-800"
            >
              List All
            </Link>
            <Link
              href="/admin/projects/new"
              className="ml-4 rounded p-2 text-sm transition-colors hover:bg-zinc-800"
            >
              Add New
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-zinc-500 uppercase">
              Experiences
            </span>
            <Link
              href="/admin/experiences"
              className="ml-4 rounded p-2 text-sm transition-colors hover:bg-zinc-800"
            >
              List All
            </Link>
            <Link
              href="/admin/experiences/new"
              className="ml-4 rounded p-2 text-sm transition-colors hover:bg-zinc-800"
            >
              Add New
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-zinc-500 uppercase">
              Skills
            </span>
            <Link
              href="/admin/skills"
              className="ml-4 rounded p-2 text-sm transition-colors hover:bg-zinc-800"
            >
              List All
            </Link>
            <Link
              href="/admin/skills/new"
              className="ml-4 rounded p-2 text-sm transition-colors hover:bg-zinc-800"
            >
              Add New
            </Link>
          </div>
          {/* Futuros links: Experiences, Skills, etc */}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-10">{children}</main>
    </div>
  )
}
