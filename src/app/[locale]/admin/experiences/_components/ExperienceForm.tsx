'use client'

import { Prisma } from '@prisma/client'
import { useState, useTransition } from 'react'

import { createExperienceAction } from '@/app/_actions/create-experience.action'
import { updateExperienceAction } from '@/app/_actions/update-experience.action'
import { Link } from '@/app/_i18n/navigation'

interface Language {
  code: string
  name: string
  isDefault: boolean
}

export type ExperienceWithRelations = Prisma.ExperienceGetPayload<{
  include: {
    translations: true
  }
}>

interface ExperienceFormProps {
  languages: Language[]
  initialData?: ExperienceWithRelations
}

export default function ExperienceForm({
  languages,
  initialData,
}: ExperienceFormProps) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState(languages[0]?.code || 'pt')

  const initialTranslations =
    initialData?.translations?.reduce(
      (
        acc: Record<string, { role: string; description: string }>,
        translation,
      ) => {
        acc[translation.locale] = {
          role: translation.role,
          description: translation.description,
        }
        return acc
      },
      {},
    ) || {}

  const [translations, setTranslations] =
    useState<Record<string, { role: string; description: string }>>(
      initialTranslations,
    )

  const handleTranslationChange = (
    locale: string,
    field: 'role' | 'description',
    value: string,
  ) => {
    setTranslations((prev) => ({
      ...prev,
      [locale]: {
        ...prev[locale],
        [field]: value,
      },
    }))
  }

  const isEditing = !!initialData

  async function handleFormSubmit(formData: FormData) {
    startTransition(async () => {
      setMessage(isEditing ? 'Updating experience...' : 'Saving experience...')

      const formattedTranslations = languages.map((lang) => ({
        locale: lang.code,
        role: translations[lang.code]?.role || '',
        description: translations[lang.code]?.description || '',
      }))

      const data = {
        company: formData.get('company') as string,
        startDate: formData.get('startDate') as string,
        endDate: (formData.get('endDate') as string) || null,
        translations: formattedTranslations,
      }

      let result

      if (isEditing) {
        result = await updateExperienceAction(initialData.id, data)
      } else {
        result = await createExperienceAction(data)
      }

      if (result.success) {
        setMessage(
          isEditing
            ? 'Experience updated successfully!'
            : 'Experience created successfully!',
        )
      } else {
        setMessage(result.error || 'An error occurred.')
      }
    })
  }

  return (
    <form
      action={handleFormSubmit}
      className="flex w-full max-w-3xl flex-col gap-6 rounded-lg bg-zinc-800 p-8 shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-zinc-700 pb-4">
        <h2 className="text-2xl font-medium text-zinc-100">
          {isEditing ? 'Edit Experience' : 'New Experience'}
        </h2>
        <Link
          href="/admin/experiences"
          className="rounded-full bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-white"
        >
          ← Back to List
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-zinc-300">Company Name</label>
        <input
          type="text"
          name="company"
          required
          defaultValue={initialData?.company || ''}
          disabled={isPending}
          className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-zinc-300">Start Date</label>
          <input
            type="date"
            name="startDate"
            required
            defaultValue={
              initialData?.startDate
                ? new Date(initialData.startDate).toISOString().split('T')[0]
                : ''
            }
            disabled={isPending}
            className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-zinc-300">
            End Date (Leave blank if current)
          </label>
          <input
            type="date"
            name="endDate"
            defaultValue={
              initialData?.endDate
                ? new Date(initialData.endDate).toISOString().split('T')[0]
                : ''
            }
            disabled={isPending}
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
            className={`flex flex-col gap-4 ${activeTab === lang.code ? 'block' : 'hidden'}`}
          >
            <div className="flex flex-col gap-2">
              <label className="text-zinc-300">
                Role / Job Title ({lang.code.toUpperCase()})
              </label>
              <input
                type="text"
                required={lang.isDefault}
                value={translations[lang.code]?.role || ''}
                onChange={(e) =>
                  handleTranslationChange(lang.code, 'role', e.target.value)
                }
                disabled={isPending}
                className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-zinc-300">
                Description & Responsibilities ({lang.code.toUpperCase()})
              </label>
              <textarea
                rows={4}
                value={translations[lang.code]?.description || ''}
                onChange={(e) =>
                  handleTranslationChange(
                    lang.code,
                    'description',
                    e.target.value,
                  )
                }
                disabled={isPending}
                className="resize-none rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
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
            : 'Register Experience'}
      </button>

      {message && (
        <p className="text-center text-sm font-medium text-emerald-500">
          {message}
        </p>
      )}
    </form>
  )
}
