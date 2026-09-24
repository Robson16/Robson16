'use client'

import { Prisma } from '@prisma/client'
import { useState, useTransition } from 'react'

import { createProjectAction } from '@/app/_actions/create-project.action'
import { updateProjectAction } from '@/app/_actions/update-project.action'
import { uploadImageAction } from '@/app/_actions/upload-image.action'

interface Language {
  code: string
  name: string
  isDefault: boolean
}

interface Item {
  id: string
  name?: string
  company?: string
}

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    translations: true
    gallery: true
    skills: true
    links: true
    experiences: true
  }
}>

interface ProjectFormProps {
  languages: Language[]
  skills: Item[]
  experiences: Item[]
  initialData?: ProjectWithRelations
}

export default function ProjectForm({
  languages,
  skills,
  experiences,
  initialData,
}: ProjectFormProps) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState(languages[0]?.code || 'pt')
  const [links, setLinks] = useState<{ type: string; url: string }[]>(
    initialData?.links?.map((link) => ({ type: link.type, url: link.url })) ||
      [],
  )

  const handleAddLink = () => {
    setLinks([...links, { type: 'github', url: '' }])
  }

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  const handleLinkChange = (
    index: number,
    field: 'type' | 'url',
    value: string,
  ) => {
    const newLinks = [...links]
    newLinks[index][field] = value
    setLinks(newLinks)
  }

  const initialTranslations =
    initialData?.translations?.reduce(
      (
        acc: Record<string, { title: string; description: string }>,
        translation,
      ) => {
        acc[translation.locale] = {
          title: translation.title,
          description: translation.description,
        }

        return acc
      },
      {},
    ) || {}

  const [translations, setTranslations] =
    useState<Record<string, { title: string; description: string }>>(
      initialTranslations,
    )

  const isEditing = !!initialData

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

  async function handleFormSubmit(formData: FormData) {
    startTransition(async () => {
      setMessage(isEditing ? 'Updating project...' : 'Uploading images...')

      const files = formData.getAll('files') as File[]
      const imageUrls: string[] = []

      const hasNewFiles = files.length > 0 && files[0].size > 0

      if (hasNewFiles) {
        for (const file of files) {
          const fileData = new FormData()

          fileData.append('file', file)

          const uploadResult = await uploadImageAction(fileData)

          if (uploadResult.success && uploadResult.url) {
            imageUrls.push(uploadResult.url)
          } else {
            setMessage(`Error uploading ${file.name}: ${uploadResult.error}`)
            return
          }
        }
      }

      setMessage('Saving to the database...')

      const formattedTranslations = languages.map((lang) => ({
        locale: lang.code,
        title: translations[lang.code]?.title || '',
        description: translations[lang.code]?.description || '',
      }))

      const data = {
        tier: Number(formData.get('tier')),
        gallery: hasNewFiles ? imageUrls : undefined,
        translations: formattedTranslations,
        skillIds: formData.getAll('skills') as string[],
        experienceId: (formData.get('experience') as string) || undefined,
        links,
      }

      let dbResult
      if (isEditing) {
        dbResult = await updateProjectAction(initialData.id, data)
      } else {
        dbResult = await createProjectAction(data)
      }

      if (dbResult.success) {
        setMessage(
          isEditing
            ? 'Project successfully updated!'
            : 'Project successfully created!',
        )
      } else {
        setMessage(dbResult.error || 'Error saving project')
      }
    })
  }

  return (
    <form
      action={handleFormSubmit}
      className="flex w-full max-w-3xl flex-col gap-6 rounded-lg bg-zinc-800 p-8 shadow-2xl"
    >
      <h2 className="mb-2 text-2xl font-medium text-zinc-100">
        {isEditing ? 'Edit Project' : 'New Project'}
      </h2>

      <div className="flex flex-col gap-2">
        <label className="text-zinc-300">
          Images {isEditing && '(Leave empty to keep current images)'}
        </label>
        <input
          type="file"
          name="files"
          accept="image/*"
          multiple
          required={!isEditing}
          disabled={isPending}
          className="w-full cursor-pointer rounded border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-300 file:mr-4 file:rounded file:border-0 file:bg-emerald-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* TABS DE IDIOMAS */}
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
            className={`flex flex-col gap-4 ${
              activeTab === lang.code ? 'block' : 'hidden'
            }`}
          >
            <div className="flex flex-col gap-2">
              <label className="text-zinc-300">
                Title ({lang.code.toUpperCase()})
              </label>
              <input
                type="text"
                required={lang.isDefault}
                value={translations[lang.code]?.title || ''}
                onChange={(e) =>
                  handleTranslationChange(lang.code, 'title', e.target.value)
                }
                disabled={isPending}
                className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-zinc-300">
                Description ({lang.code.toUpperCase()})
              </label>
              <textarea
                required={lang.isDefault}
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
                className="w-full resize-none rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-zinc-300">Related Experience</label>
          <select
            name="experience"
            defaultValue={initialData?.experiences?.[0]?.experienceId || ''}
            disabled={isPending}
            className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Personal / Freelance (None)</option>
            {experiences.map((exp) => (
              <option key={exp.id} value={exp.id}>
                {exp.company}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-zinc-300">Level of Distinction (Tier)</label>
          <select
            name="tier"
            defaultValue={initialData?.tier || '3'}
            disabled={isPending}
            className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="1">1 - Top Highlight</option>
            <option value="2">2 - Normal Highlight</option>
            <option value="3">3 - Archive</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-zinc-300">Skills & Technologies</label>
        <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto rounded border border-zinc-700 bg-zinc-900 p-4 md:grid-cols-3">
          {skills.map((skill) => {
            // Verifica se a skill já estava associada ao projeto
            const isChecked = initialData?.skills?.some(
              (s) => s.skillId === skill.id,
            )
            return (
              <label
                key={skill.id}
                className="flex items-center gap-2 text-sm text-zinc-300"
              >
                <input
                  type="checkbox"
                  name="skills"
                  value={skill.id}
                  defaultChecked={isChecked}
                  disabled={isPending}
                  className="accent-emerald-600"
                />
                {skill.name}
              </label>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-zinc-300">External Links</label>
          <button
            type="button"
            onClick={handleAddLink}
            disabled={isPending}
            className="text-sm font-medium text-emerald-500 hover:text-emerald-400 focus:outline-none"
          >
            + Add Link
          </button>
        </div>

        {links.length === 0 && (
          <p className="text-sm text-zinc-500 italic">
            No external links added.
          </p>
        )}

        {links.map((link, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-2 rounded border border-zinc-700/50 bg-zinc-900/50 p-3 sm:flex-row sm:items-center"
          >
            <select
              value={link.type}
              onChange={(e) => handleLinkChange(index, 'type', e.target.value)}
              disabled={isPending}
              className="w-full rounded border border-zinc-700 bg-zinc-900 p-2 text-sm text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:w-1/3"
            >
              <option value="github">GitHub</option>
              <option value="gitlab">GitLab</option>
              <option value="website">Live Preview</option>
              <option value="figma">Figma</option>
              <option value="youtube">YouTube</option>
              <option value="other">Other</option>
            </select>

            <input
              type="url"
              placeholder="https://..."
              value={link.url}
              onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
              disabled={isPending}
              required
              className="w-full rounded border border-zinc-700 bg-zinc-900 p-2 text-sm text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:w-2/3"
            />

            <button
              type="button"
              onClick={() => handleRemoveLink(index)}
              disabled={isPending}
              className="p-2 text-red-500 hover:text-red-400 focus:outline-none disabled:opacity-50"
              title="Remove link"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 w-full rounded-full bg-emerald-800 py-4 font-bold text-white transition-all hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending
          ? 'Processing...'
          : isEditing
            ? 'Save Changes'
            : 'Register Project'}
      </button>

      {message && (
        <p className="mt-2 text-center text-sm font-medium text-emerald-500">
          {message}
        </p>
      )}
    </form>
  )
}
