'use client'

import { Prisma } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState, useTransition } from 'react'

import { updateProfileAction } from '@/app/_actions/update-profile.action'
import { uploadImageAction } from '@/app/_actions/upload-image.action'

interface Language {
  code: string
  name: string
  isDefault: boolean
}

export type ProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    translations: true
  }
}>

interface ProfileFormProps {
  languages: Language[]
  initialData: ProfileWithRelations | null
}

export default function ProfileForm({
  languages,
  initialData,
}: ProfileFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState(languages[0]?.code || 'pt')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    initialData?.avatarUrl || null,
  )

  const initialTranslations =
    initialData?.translations?.reduce(
      (
        acc: Record<
          string,
          { title: string; locationName: string; bio: string }
        >,
        translation,
      ) => {
        acc[translation.locale] = {
          title: translation.title || '',
          locationName: translation.locationName,
          bio: translation.bio || '',
        }
        return acc
      },
      {},
    ) || {}

  const [translations, setTranslations] =
    useState<
      Record<string, { title: string; locationName: string; bio: string }>
    >(initialTranslations)

  const handleTranslationChange = (
    locale: string,
    field: 'title' | 'locationName' | 'bio',
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

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  async function handleProfileSubmit(formData: FormData) {
    startTransition(async () => {
      setMessage('Saving...')

      const avatarFile = formData.get('avatarFile') as File
      let finalAvatarUrl = initialData?.avatarUrl || ''

      if (avatarFile && avatarFile.size > 0) {
        const uploadData = new FormData()
        uploadData.append('file', avatarFile)

        const uploadResult = await uploadImageAction(uploadData)
        if (uploadResult.success && uploadResult.url) {
          finalAvatarUrl = uploadResult.url
        } else {
          setMessage('Error uploading image.')
          return
        }
      }

      const profileId = initialData?.id || ''

      const formattedTranslations = languages.map((lang) => ({
        locale: lang.code,
        title: translations[lang.code]?.title || '',
        locationName: translations[lang.code]?.locationName || '',
        bio: translations[lang.code]?.bio || '',
      }))

      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        locationUrl: formData.get('locationUrl') as string,
        avatarUrl: finalAvatarUrl,
        translations: formattedTranslations,
      }

      const result = await updateProfileAction(profileId, data)

      if (result.success) {
        setMessage('Profile updated successfully!')
        router.refresh()
      } else {
        setMessage(result.error || 'Error updating profile.')
      }
    })
  }

  return (
    <form
      action={handleProfileSubmit}
      className="flex w-full max-w-2xl flex-col gap-6 rounded-lg bg-zinc-800 p-8 shadow-2xl"
    >
      <div className="border-b border-zinc-700 pb-4">
        <h2 className="text-2xl font-medium text-zinc-100">Global Settings</h2>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Avatar Area */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative size-32 overflow-hidden rounded-full border-4 border-zinc-700 bg-zinc-900">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Avatar"
                fill
                sizes="128px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-zinc-500">
                No Image
              </div>
            )}
          </div>
          <input
            type="file"
            name="avatarFile"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
          <button
            type="button"
            disabled={isPending}
            onClick={() => fileInputRef.current?.click()}
            className="rounded bg-zinc-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-600 disabled:opacity-50"
          >
            Change Photo
          </button>
        </div>

        {/* Dados Básicos */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-zinc-300">Name</label>
            <input
              type="text"
              name="name"
              required
              defaultValue={initialData?.name || ''}
              disabled={isPending}
              className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-zinc-300">Contact Email</label>
            <input
              type="email"
              name="email"
              required
              defaultValue={initialData?.email || ''}
              disabled={isPending}
              className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-zinc-300">Phone</label>
              <input
                type="text"
                name="phone"
                required
                defaultValue={initialData?.phone || ''}
                disabled={isPending}
                className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-zinc-300">Google Maps URL</label>
              <input
                type="url"
                name="locationUrl"
                required
                defaultValue={initialData?.locationUrl || ''}
                disabled={isPending}
                className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Traduções (Title, Localização e Bio) */}
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
                Title ({lang.code.toUpperCase()})
              </label>
              <input
                type="text"
                required={lang.isDefault}
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
              <label className="text-zinc-300">
                Location ({lang.code.toUpperCase()})
              </label>
              <input
                type="text"
                required={lang.isDefault}
                value={translations[lang.code]?.locationName || ''}
                onChange={(event) =>
                  handleTranslationChange(
                    lang.code,
                    'locationName',
                    event.target.value,
                  )
                }
                disabled={isPending}
                className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-zinc-300">
                Bio ({lang.code.toUpperCase()})
              </label>
              <textarea
                rows={4}
                value={translations[lang.code]?.bio || ''}
                onChange={(event) =>
                  handleTranslationChange(lang.code, 'bio', event.target.value)
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
        className="mt-4 w-full rounded bg-emerald-800 py-4 font-bold text-white transition-all hover:bg-emerald-700 disabled:opacity-50"
      >
        {isPending ? 'Saving...' : 'Save Changes'}
      </button>

      {message && (
        <p className="text-center text-sm font-medium text-emerald-500">
          {message}
        </p>
      )}
    </form>
  )
}
