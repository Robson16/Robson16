'use client'

import { Prisma } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { createFeatureAction } from '@/app/_actions/create-feature.action'
import { deleteFeatureAction } from '@/app/_actions/delete-feature.action'
import { updateFeatureAction } from '@/app/_actions/update-feature.action'

interface Language {
  code: string
  name: string
  isDefault: boolean
}

export type FeatureWithTranslations = Prisma.FeatureGetPayload<{
  include: {
    translations: true
  }
}>

interface FeatureFormProps {
  languages: Language[]
  initialFeatures: FeatureWithTranslations[]
}

export default function FeatureForm({
  languages,
  initialFeatures,
}: FeatureFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState(languages[0]?.code || 'pt')

  const [editingId, setEditingId] = useState<string | null>(null)

  const [icon, setIcon] = useState('')
  const [order, setOrder] = useState<number>(0)
  const [translations, setTranslations] = useState<
    Record<string, { title: string; description: string }>
  >({})

  const handleTranslationChange = (
    locale: string,
    field: 'title' | 'description',
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

  const handleEdit = (feature: FeatureWithTranslations) => {
    setEditingId(feature.id)
    setIcon(feature.icon)
    setOrder(feature.order)

    const featureTranslations = feature.translations.reduce(
      (acc, translation) => {
        acc[translation.locale] = {
          title: translation.title,
          description: translation.description,
        }
        return acc
      },
      {} as Record<string, { title: string; description: string }>,
    )

    setTranslations(featureTranslations)
    setMessage('')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setIcon('')
    setOrder(0)
    setTranslations({})
    setMessage('')
  }

  async function handleSave() {
    startTransition(async () => {
      setMessage('Salvando...')

      const formattedTranslations = languages.map((lang) => ({
        locale: lang.code,
        title: translations[lang.code]?.title || '',
        description: translations[lang.code]?.description || '',
      }))

      const data = {
        icon,
        order: Number(order),
        translations: formattedTranslations,
      }

      let result
      if (editingId) {
        result = await updateFeatureAction(editingId, data)
      } else {
        result = await createFeatureAction(data)
      }

      if (result?.success) {
        setMessage(editingId ? 'Feature updated!' : 'Feature created!')
        handleCancelEdit()
        router.refresh()
      } else {
        setMessage(result?.error || 'Error saving feature.')
      }
    })
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this feature?')) return

    startTransition(async () => {
      const result = await deleteFeatureAction(id)
      if (result.success) {
        if (editingId === id) handleCancelEdit()
        router.refresh()
      } else {
        setMessage(result.error || 'Error deleting feature.')
      }
    })
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6 rounded-lg bg-zinc-800 p-8 shadow-2xl">
      <div className="border-b border-zinc-700 pb-4">
        <h2 className="text-2xl font-medium text-zinc-100">
          Features / Services
        </h2>
      </div>

      {message && (
        <p
          className={`text-sm font-medium ${
            message.includes('Erro') ? 'text-red-500' : 'text-emerald-500'
          }`}
        >
          {message}
        </p>
      )}

      {/* Lista Existente */}
      <div className="flex flex-col gap-3">
        {initialFeatures.length === 0 ? (
          <p className="text-sm text-zinc-500">No features registered.</p>
        ) : (
          initialFeatures.map((feature) => {
            const currentTranslation =
              feature.translations.find(
                (translation) => translation.locale === 'pt',
              ) || feature.translations[0]

            return (
              <div
                key={feature.id}
                className="flex items-center justify-between rounded border border-zinc-700 bg-zinc-900 p-3"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-zinc-100">
                    {currentTranslation?.title || 'Untitled'}
                  </span>
                  <span className="text-sm text-zinc-400">
                    Icon: {feature.icon}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(feature)}
                    disabled={isPending}
                    className="rounded px-3 py-1 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-900/30 hover:text-blue-300 disabled:opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(feature.id)}
                    disabled={isPending}
                    className="rounded px-3 py-1 text-sm font-medium text-red-400 transition-colors hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Formulário (Adicionar / Editar) */}
      <div className="mt-4 flex flex-col gap-4 rounded border border-zinc-700 bg-zinc-900/50 p-4">
        <h3 className="text-lg font-medium text-zinc-300">
          {editingId ? 'Edit Feature' : 'Add New Feature'}
        </h3>

        <div className="flex gap-4">
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm text-zinc-300">
              Icon (ex: &apos;code&apos;, &apos;database&apos;)
            </label>
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              disabled={isPending}
              className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div className="flex w-32 flex-col gap-2">
            <label className="text-sm text-zinc-300">Order</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              disabled={isPending}
              className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Abas de Idioma */}
        <div className="mt-2 flex gap-2 border-b border-zinc-700 pb-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setActiveTab(lang.code)}
              className={`rounded px-4 py-2 text-sm transition-colors ${
                activeTab === lang.code
                  ? 'bg-emerald-800 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        {languages.map((lang) => (
          <div
            key={lang.code}
            className={`flex flex-col gap-4 py-2 ${
              activeTab === lang.code ? 'block' : 'hidden'
            }`}
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-300">
                Title ({lang.code.toUpperCase()})
              </label>
              <input
                type="text"
                value={translations[lang.code]?.title || ''}
                onChange={(event) =>
                  handleTranslationChange(
                    lang.code,
                    'title',
                    event.target.value,
                  )
                }
                disabled={isPending}
                className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-300">
                Description ({lang.code.toUpperCase()})
              </label>
              <textarea
                rows={3}
                value={translations[lang.code]?.description || ''}
                onChange={(event) =>
                  handleTranslationChange(
                    lang.code,
                    'description',
                    event.target.value,
                  )
                }
                disabled={isPending}
                className="resize-none rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        ))}

        <div className="mt-2 flex gap-2">
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={isPending}
              className="w-1/3 rounded border border-zinc-600 bg-transparent py-3 font-medium text-zinc-300 transition-colors hover:bg-zinc-800 disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending || !icon}
            className={`rounded py-3 font-medium text-white transition-colors disabled:opacity-50 ${
              editingId
                ? 'w-2/3 bg-blue-700 hover:bg-blue-600'
                : 'w-full bg-emerald-700 hover:bg-emerald-600'
            }`}
          >
            {editingId ? 'Update Feature' : '+ Add Feature'}
          </button>
        </div>
      </div>
    </div>
  )
}
