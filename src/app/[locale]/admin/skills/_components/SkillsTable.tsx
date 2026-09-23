'use client'

import { useState, useTransition } from 'react'

import { deleteSkillAction } from '@/app/_actions/delete-skill.action'
import { Link } from '@/app/_i18n/navigation'

interface SkillData {
  id: string
  name: string
  category: string
  icon: string
  projectsCount: number
}

interface SkillsTableProps {
  skills: SkillData[]
}

export default function SkillsTable({ skills }: SkillsTableProps) {
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this skill? This action cannot be undone.',
      )
    ) {
      return
    }

    setDeletingId(id)

    startTransition(async () => {
      const result = await deleteSkillAction(id)

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
              Skill
            </th>
            <th scope="col" className="px-6 py-4">
              Category
            </th>
            <th scope="col" className="px-6 py-4">
              Used In
            </th>
            <th scope="col" className="px-6 py-4 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {skills.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                No skills found. Create your first one!
              </td>
            </tr>
          ) : (
            skills.map((skill) => (
              <tr
                key={skill.id}
                className="transition-colors hover:bg-zinc-800/50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded bg-zinc-800 text-zinc-400">
                      {/* Futuramente podemos renderizar o ícone real aqui, por enquanto mostramos o nome da classe/texto */}
                      {skill.icon.slice(0, 2)}
                    </span>
                    <span className="font-medium text-zinc-100">
                      {skill.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-400 capitalize">
                  {skill.category}
                </td>
                <td className="px-6 py-4 text-zinc-400">
                  {skill.projectsCount} project(s)
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/skills/${skill.id}/edit`}
                      className={`font-medium transition-colors hover:text-blue-400 ${
                        isPending && deletingId
                          ? 'pointer-events-none opacity-50'
                          : 'text-zinc-400'
                      }`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      disabled={isPending}
                      className={`cursor-pointer font-medium transition-colors ${
                        deletingId === skill.id
                          ? 'cursor-not-allowed text-red-500 opacity-50'
                          : 'text-zinc-400 hover:text-red-400'
                      }`}
                    >
                      {deletingId === skill.id ? 'Deleting...' : 'Delete'}
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
