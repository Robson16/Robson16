'use client'

import { useState, useTransition } from 'react'

import { deleteExperienceAction } from '@/app/_actions/delete-experience.action'
import { Link } from '@/app/_i18n/navigation'
import { formatDate } from '@/app/_utils/format-date'

interface ExperienceData {
  id: string
  company: string
  role: string
  startDate: Date
  endDate: Date | null
}

interface ExperiencesTableProps {
  experiences: ExperienceData[]
  currentLocale: string
}

export default function ExperiencesTable({
  experiences,
  currentLocale,
}: ExperiencesTableProps) {
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this experience? This action cannot be undone.',
      )
    ) {
      return
    }

    setDeletingId(id)

    startTransition(async () => {
      const result = await deleteExperienceAction(id)

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
              Company
            </th>
            <th scope="col" className="px-6 py-4">
              Role
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
          {experiences.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                No experiences found. Create your first one!
              </td>
            </tr>
          ) : (
            experiences.map((experience) => {
              const startDate = formatDate(experience.startDate, currentLocale)

              const endDate = experience.endDate
                ? formatDate(experience.endDate, currentLocale)
                : 'Present'

              return (
                <tr
                  key={experience.id}
                  className="transition-colors hover:bg-zinc-800/50"
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-zinc-100">
                    {experience.company}
                  </td>
                  <td className="px-6 py-4">{experience.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-400">
                    {startDate} — {endDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/experiences/${experience.id}/edit`}
                        className={`font-medium transition-colors hover:text-blue-400 ${
                          isPending && deletingId
                            ? 'pointer-events-none opacity-50'
                            : 'text-zinc-400'
                        }`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(experience.id)}
                        disabled={isPending}
                        className={`cursor-pointer font-medium transition-colors ${
                          deletingId === experience.id
                            ? 'cursor-not-allowed text-red-500 opacity-50'
                            : 'text-zinc-400 hover:text-red-400'
                        }`}
                      >
                        {deletingId === experience.id
                          ? 'Deleting...'
                          : 'Delete'}
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
