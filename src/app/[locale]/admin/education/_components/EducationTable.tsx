'use client'

import { useState, useTransition } from 'react'

import { deleteEducationAction } from '@/app/_actions/delete-education.action'
import { Link } from '@/app/_i18n/navigation'
import { formatDate } from '@/app/_utils/format-date'

interface EducationData {
  id: string
  institution: string
  title: string
  startDate: Date
  endDate: Date | null
}

interface EducationTableProps {
  educationList: EducationData[]
  currentLocale: string
}

export default function EducationTable({
  educationList,
  currentLocale,
}: EducationTableProps) {
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this education entry? This action cannot be undone.',
      )
    ) {
      return
    }

    setDeletingId(id)

    startTransition(async () => {
      const result = await deleteEducationAction(id)

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
            <th scope="col" className="px-6 py-4">
              Institution
            </th>
            <th scope="col" className="px-6 py-4">
              Title / Degree
            </th>
            <th scope="col" className="px-6 py-4">
              Period
            </th>
            <th scope="col" className="px-6 py-4 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {educationList.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                No education records found. Create your first one!
              </td>
            </tr>
          ) : (
            educationList.map((edu) => {
              const startDate = formatDate(edu.startDate, currentLocale)

              const endDate = edu.endDate
                ? formatDate(edu.endDate, currentLocale)
                : 'Present'

              return (
                <tr
                  key={edu.id}
                  className="transition-colors hover:bg-zinc-800/50"
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-zinc-100">
                    {edu.institution}
                  </td>
                  <td className="px-6 py-4">{edu.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-400">
                    {startDate} — {endDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/education/${edu.id}/edit`}
                        className={`font-medium transition-colors hover:text-blue-400 ${
                          isPending && deletingId
                            ? 'pointer-events-none opacity-50'
                            : 'text-zinc-400'
                        }`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(edu.id)}
                        disabled={isPending}
                        className={`cursor-pointer font-medium transition-colors ${
                          deletingId === edu.id
                            ? 'cursor-not-allowed text-red-500 opacity-50'
                            : 'text-zinc-400 hover:text-red-400'
                        }`}
                      >
                        {deletingId === edu.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
