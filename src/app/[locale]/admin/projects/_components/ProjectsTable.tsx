'use client'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'

import { deleteProjectAction } from '@/app/_actions/delete-project.action'
import { Link } from '@/app/_i18n/navigation'
import { formatDate } from '@/app/_utils/format-date'

interface ProjectData {
  id: string
  tier: number
  title: string
  thumbnailUrl?: string
  skillsCount: number
  createdAt: Date
  updatedAt: Date
}

interface ProjectsTableProps {
  projects: ProjectData[]
  currentSort: string
  currentDir: string
  currentLocale: string
}

function SortableHeader({
  label,
  column,
  currentSort,
  currentDir,
  createSortUrl,
}: {
  label: string
  column: string
  currentSort: string
  currentDir: string
  createSortUrl: (column: string) => string
}) {
  const router = useRouter()
  const isActive = currentSort === column

  return (
    <th scope="col" className="px-6 py-4">
      <button
        onClick={() => router.push(createSortUrl(column))}
        className="group flex cursor-pointer items-center gap-2 font-semibold hover:text-white"
      >
        {label}
        <span
          className={`text-xs ${isActive ? 'text-emerald-500' : 'text-zinc-600 group-hover:text-zinc-400'}`}
        >
          {isActive ? (currentDir === 'asc' ? '↑' : '↓') : '↕'}
        </span>
      </button>
    </th>
  )
}

export default function ProjectsTable({
  projects,
  currentSort,
  currentDir,
  currentLocale,
}: ProjectsTableProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const createSortUrl = (columnName: string) => {
    const params = new URLSearchParams(searchParams)

    if (currentSort === columnName && currentDir === 'asc') {
      params.set('dir', 'desc')
    } else {
      params.set('sort', columnName)
      params.set('dir', 'asc')
    }

    return `${pathname}?${params.toString()}`
  }

  const handleDelete = (id: string) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this project? This action cannot be undone.',
      )
    ) {
      return
    }

    setDeletingId(id)

    startTransition(async () => {
      const result = await deleteProjectAction(id)

      if (!result.success) {
        alert(result.error)
      }

      setDeletingId(null)
    })
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 shadow-2xl">
      <table className="w-full text-left text-sm text-zinc-300">
        <thead className="bg-zinc-950 text-xs text-zinc-400 uppercase">
          <tr>
            <SortableHeader
              label="Project"
              column="title"
              currentSort={currentSort}
              currentDir={currentDir}
              createSortUrl={createSortUrl}
            />
            <SortableHeader
              label="Tier"
              column="tier"
              currentSort={currentSort}
              currentDir={currentDir}
              createSortUrl={createSortUrl}
            />
            <th scope="col" className="px-6 py-4">
              Skills
            </th>
            <SortableHeader
              label="Created At"
              column="createdAt"
              currentSort={currentSort}
              currentDir={currentDir}
              createSortUrl={createSortUrl}
            />
            <SortableHeader
              label="Updated At"
              column="updatedAt"
              currentSort={currentSort}
              currentDir={currentDir}
              createSortUrl={createSortUrl}
            />
            <th scope="col" className="px-6 py-4 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {projects.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">
                No projects found.
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr
                key={project.id}
                className="transition-colors hover:bg-zinc-800/50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-16 overflow-hidden rounded bg-zinc-800">
                      {project.thumbnailUrl ? (
                        <Image
                          src={project.thumbnailUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-xs text-zinc-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-zinc-100">
                      {project.title}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      project.tier === 1
                        ? 'border border-emerald-800 bg-emerald-900/50 text-emerald-400'
                        : project.tier === 2
                          ? 'border border-blue-800 bg-blue-900/50 text-blue-400'
                          : 'border border-zinc-700 bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    Tier {project.tier}
                  </span>
                </td>
                <td className="px-6 py-4">{project.skillsCount} tech(s)</td>
                <td className="px-6 py-4 text-zinc-400">
                  {formatDate(project.createdAt, currentLocale)}
                </td>
                <td className="px-6 py-4 text-zinc-400">
                  {formatDate(project.updatedAt, currentLocale)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className={`font-medium transition-colors hover:text-blue-400 ${
                        isPending
                          ? 'pointer-events-none opacity-50'
                          : 'text-zinc-400'
                      }`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={isPending}
                      className={`cursor-pointer font-medium transition-colors ${
                        deletingId === project.id
                          ? 'cursor-not-allowed text-red-500 opacity-50'
                          : 'text-zinc-400 hover:text-red-400'
                      }`}
                    >
                      {deletingId === project.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
