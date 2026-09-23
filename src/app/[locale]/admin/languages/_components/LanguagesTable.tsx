'use client'

import { useState, useTransition } from 'react'

import { deleteLanguageAction } from '@/app/_actions/delete-language.action'
import { Link } from '@/app/_i18n/navigation'

interface LanguageData {
  code: string
  name: string
  isDefault: boolean
}

interface LanguagesTableProps {
  languages: LanguageData[]
}

export default function LanguagesTable({ languages }: LanguagesTableProps) {
  const [isPending, startTransition] = useTransition()
  const [deletingCode, setDeletingCode] = useState<string | null>(null)

  const handleDelete = (code: string, isDefault: boolean) => {
    if (isDefault) {
      alert('You cannot delete the default language.')
      return
    }

    if (
      !window.confirm(
        'DANGER: Are you sure you want to delete this language? This will PERMANENTLY DELETE ALL translations (Projects, Experiences, and Skills) associated with it!',
      )
    ) {
      return
    }

    setDeletingCode(code)

    startTransition(async () => {
      const result = await deleteLanguageAction(code)

      if (!result.success) {
        alert(result.error)
      }

      setDeletingCode(null)
    })
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 shadow-2xl">
      <table className="w-full text-left text-sm text-zinc-300">
        <thead className="bg-zinc-950 text-xs text-zinc-400 uppercase">
          <tr>
            <th scope="col" className="px-6 py-4">
              Code
            </th>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {languages.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                No languages found.
              </td>
            </tr>
          ) : (
            languages.map((language) => (
              <tr
                key={language.code}
                className="transition-colors hover:bg-zinc-800/50"
              >
                <td className="px-6 py-4 font-bold whitespace-nowrap text-zinc-100">
                  {language.code.toUpperCase()}
                </td>
                <td className="px-6 py-4 font-medium">{language.name}</td>
                <td className="px-6 py-4">
                  {language.isDefault ? (
                    <span className="inline-flex items-center rounded-full border border-emerald-800 bg-emerald-900/50 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                      Default
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
                      Secondary
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/languages/${language.code}/edit`}
                      className={`font-medium transition-colors hover:text-blue-400 ${
                        isPending && deletingCode
                          ? 'pointer-events-none opacity-50'
                          : 'text-zinc-400'
                      }`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        handleDelete(language.code, language.isDefault)
                      }
                      disabled={isPending || language.isDefault}
                      className={`cursor-pointer font-medium transition-colors ${
                        language.isDefault
                          ? 'cursor-not-allowed opacity-30'
                          : deletingCode === language.code
                            ? 'cursor-not-allowed text-red-500 opacity-50'
                            : 'text-zinc-400 hover:text-red-400'
                      }`}
                    >
                      {deletingCode === language.code
                        ? 'Deleting...'
                        : 'Delete'}
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
