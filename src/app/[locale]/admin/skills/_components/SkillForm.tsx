'use client'

import { Prisma } from '@prisma/client'
import { useState, useTransition } from 'react'

import { createSkillAction } from '@/app/_actions/create-skill.action'
import { updateSkillAction } from '@/app/_actions/update-skill.action'

interface Language {
  code: string
  name: string
  isDefault: boolean
}

export type SkillWithRelations = Prisma.SkillGetPayload<{
  include: {
    translations: true
  }
}>

interface SkillFormProps {
  languages: Language[]
  initialData?: SkillWithRelations
}

export default function SkillForm({ languages, initialData }: SkillFormProps) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState(languages[0]?.code || 'pt')

  const initialTranslations =
    initialData?.translations?.reduce(
      (acc: Record<string, { name: string }>, translation) => {
        acc[translation.locale] = { name: translation.name }
        return acc
      },
      {},
    ) || {}

  const [translations, setTranslations] =
    useState<Record<string, { name: string }>>(initialTranslations)

  const handleTranslationChange = (locale: string, value: string) => {
    setTranslations((prev) => ({
      ...prev,
      [locale]: { name: value },
    }))
  }

  const isEditing = !!initialData

  async function handleFormSubmit(formData: FormData) {
    startTransition(async () => {
      setMessage(isEditing ? 'Updating skill...' : 'Saving skill...')

      const formattedTranslations = languages.map((lang) => ({
        locale: lang.code,
        name: translations[lang.code]?.name || '',
      }))

      const data = {
        icon: formData.get('icon') as string,
        category: formData.get('category') as string,
        translations: formattedTranslations,
      }

      let result
      if (isEditing) {
        result = await updateSkillAction(initialData.id, data)
      } else {
        result = await createSkillAction(data)
      }

      if (result.success) {
        setMessage(
          isEditing
            ? 'Skill updated successfully!'
            : 'Skill created successfully!',
        )
      } else {
        setMessage(result.error || 'An error occurred.')
      }
    })
  }

  return (
    <form
      action={handleFormSubmit}
      className="flex w-full max-w-2xl flex-col gap-6 rounded-lg bg-zinc-800 p-8 shadow-2xl"
    >
      <h2 className="text-2xl font-medium text-zinc-100">
        {isEditing ? 'Edit Skill' : 'New Skill'}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-zinc-300">Category</label>
          <select
            name="category"
            required
            defaultValue={initialData?.category || ''}
            disabled={isPending}
            className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="tools">Tools & DevOps</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-zinc-300">
            Icon (SVG or React Icons class)
          </label>
          <input
            type="text"
            name="icon"
            required
            defaultValue={initialData?.icon || ''}
            disabled={isPending}
            placeholder="e.g., SiTypescript"
            className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div className="flex gap-2 border-b border-zinc-700 pb-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setActiveTab(lang.code)}
              className={`rounded px-4 py-2 transition-colors ${
                activeTab === lang.code
                  ? 'bg-emerald-800 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        {languages.map((lang) => (
          <div
            key={lang.code}
            className={`flex flex-col gap-2 ${activeTab === lang.code ? 'block' : 'hidden'}`}
          >
            <label className="text-zinc-300">
              Skill Name ({lang.code.toUpperCase()})
            </label>
            <input
              type="text"
              required={lang.isDefault}
              value={translations[lang.code]?.name || ''}
              onChange={(e) =>
                handleTranslationChange(lang.code, e.target.value)
              }
              disabled={isPending}
              placeholder="e.g., TypeScript"
              className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 w-full rounded-full bg-emerald-800 py-4 font-bold text-white transition-all hover:bg-emerald-700 disabled:opacity-50"
      >
        {isPending
          ? 'Processing...'
          : isEditing
            ? 'Save Changes'
            : 'Register Skill'}
      </button>

      {message && (
        <p
          className={`text-center text-sm font-medium ${message.includes('Error') ? 'text-red-500' : 'text-emerald-500'}`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
