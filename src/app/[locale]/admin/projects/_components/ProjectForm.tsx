'use client'

import { Prisma, ProjectLinkType } from '@prisma/client'
import Image from 'next/image'
import { useState, useTransition } from 'react'
import { FaStar } from 'react-icons/fa'

import { createProjectAction } from '@/app/_actions/create-project.action'
import { updateProjectAction } from '@/app/_actions/update-project.action'
import { uploadImageAction } from '@/app/_actions/upload-image.action'
import { Link } from '@/app/_i18n/navigation'
import { getProjectLinkLabel } from '@/app/_utils/get-project-link-label'

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

type TranslationData = {
  title: string
  description: string
  challenge?: string
  solution?: string
  impact?: string
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

  const [existingImages, setExistingImages] = useState(
    initialData?.gallery?.sort((a, b) => a.order - b.order) || [],
  )
  const [newFiles, setNewFiles] = useState<
    { file: File; previewUrl: string }[]
  >([])

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }))
      setNewFiles(filesArray)
    }
  }

  const makeExistingFeatured = (index: number) => {
    const updated = [...existingImages]
    const [item] = updated.splice(index, 1)
    updated.unshift(item)
    setExistingImages(updated)
  }

  const makeNewFileFeatured = (index: number) => {
    const updated = [...newFiles]
    const [item] = updated.splice(index, 1)
    updated.unshift(item)
    setNewFiles(updated)
  }

  const initialTranslations =
    initialData?.translations?.reduce(
      (acc: Record<string, TranslationData>, translation) => {
        acc[translation.locale] = {
          title: translation.title,
          description: translation.description,
          challenge: translation.challenge || '',
          solution: translation.solution || '',
          impact: translation.impact || '',
        }
        return acc
      },
      {},
    ) || {}

  const [translations, setTranslations] =
    useState<Record<string, TranslationData>>(initialTranslations)

  const isEditing = !!initialData

  const handleTranslationChange = (
    locale: string,
    field: 'title' | 'description' | 'challenge' | 'solution' | 'impact',
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

      const imageUrls: string[] = []
      const hasNewFiles = newFiles.length > 0

      if (hasNewFiles) {
        for (const item of newFiles) {
          const fileData = new FormData()
          fileData.append('file', item.file)

          const uploadResult = await uploadImageAction(fileData)

          if (uploadResult.success && uploadResult.url) {
            imageUrls.push(uploadResult.url)
          } else {
            setMessage(
              `Error uploading ${item.file.name}: ${uploadResult.error}`,
            )
            return
          }
        }
      }

      setMessage('Saving to the database...')

      const formattedTranslations = languages.map((lang) => ({
        locale: lang.code,
        title: translations[lang.code]?.title || '',
        description: translations[lang.code]?.description || '',
        challenge: translations[lang.code]?.challenge || undefined,
        solution: translations[lang.code]?.solution || undefined,
        impact: translations[lang.code]?.impact || undefined,
      }))

      const data = {
        tier: Number(formData.get('tier')),
        gallery: hasNewFiles ? imageUrls : undefined,
        existingGalleryOrder: !hasNewFiles
          ? existingImages.map((img) => img.id)
          : undefined,
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
      <div className="flex items-center justify-between border-b border-zinc-700 pb-4">
        <h2 className="mb-2 text-2xl font-medium text-zinc-100">
          {isEditing ? 'Edit Project' : 'New Project'}
        </h2>
        <Link
          href="/admin/projects"
          className="rounded-full bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-white"
        >
          ← Back to List
        </Link>
      </div>

      <div className="flex flex-col gap-4 rounded border border-zinc-700/50 bg-zinc-900/50 p-4">
        <label className="font-medium text-zinc-300">
          Gallery Images{' '}
          {isEditing && '(Upload new files to overwrite current)'}
        </label>

        <input
          type="file"
          name="files"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          required={!isEditing && newFiles.length === 0}
          disabled={isPending}
          className="w-full cursor-pointer rounded border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-300 file:mr-4 file:rounded file:border-0 file:bg-emerald-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />

        {/* Previews das NOVAS imagens selecionadas */}
        {newFiles.length > 0 && (
          <div className="mt-2">
            <p className="mb-3 text-sm font-medium text-emerald-400">
              New files (Click ⭐ on an image to set it as Cover):
            </p>
            <div className="flex flex-wrap gap-4">
              {newFiles.map((item, index) => (
                <div
                  key={item.previewUrl}
                  className={`group relative size-24 overflow-hidden rounded-md border-2 transition-colors ${index === 0 ? 'border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]' : 'border-zinc-700 hover:border-emerald-500'}`}
                >
                  <Image
                    src={item.previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => makeNewFileFeatured(index)}
                      className="p-2 text-white transition-colors hover:text-yellow-400"
                      title="Set as Featured"
                    >
                      <FaStar
                        size={20}
                        className={index === 0 ? 'text-yellow-400' : ''}
                      />
                    </button>
                  </div>
                  {index === 0 && (
                    <span className="absolute top-1 left-1 rounded bg-yellow-500 px-1.5 py-0.5 text-[10px] font-bold text-black">
                      COVER
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Previews das IMAGENS EXISTENTES (Exibe apenas se não houver novos uploads) */}
        {isEditing && existingImages.length > 0 && newFiles.length === 0 && (
          <div className="mt-2">
            <p className="mb-3 text-sm text-zinc-400">
              Current Gallery (Click ⭐ to change the Cover):
            </p>
            <div className="flex flex-wrap gap-4">
              {existingImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`group relative size-24 overflow-hidden rounded-md border-2 transition-colors ${index === 0 ? 'border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]' : 'border-zinc-700 hover:border-emerald-500'}`}
                >
                  <Image
                    src={image.url}
                    alt="Gallery image"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => makeExistingFeatured(index)}
                      className="p-2 text-white transition-colors hover:text-yellow-400"
                      title="Set as Featured"
                    >
                      <FaStar
                        size={20}
                        className={index === 0 ? 'text-yellow-400' : ''}
                      />
                    </button>
                  </div>
                  {index === 0 && (
                    <span className="absolute top-1 left-1 rounded bg-yellow-500 px-1.5 py-0.5 text-[10px] font-bold text-black">
                      COVER
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-zinc-500 italic">
              * Uploading new images above will permanently overwrite this
              current gallery.
            </p>
          </div>
        )}
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
            className={`flex flex-col gap-6 ${
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
                Brief Description ({lang.code.toUpperCase()})
              </label>
              <textarea
                required={lang.isDefault}
                rows={3}
                value={translations[lang.code]?.description || ''}
                onChange={(e) =>
                  handleTranslationChange(
                    lang.code,
                    'description',
                    e.target.value,
                  )
                }
                disabled={isPending}
                className="w-full resize-y rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="rounded border border-emerald-900/50 bg-emerald-900/10 p-4">
              <h4 className="mb-4 text-sm font-semibold text-emerald-500 uppercase">
                Case Study Content
              </h4>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300">
                    The Challenge ({lang.code.toUpperCase()})
                  </label>
                  <textarea
                    rows={4}
                    value={translations[lang.code]?.challenge || ''}
                    onChange={(e) =>
                      handleTranslationChange(
                        lang.code,
                        'challenge',
                        e.target.value,
                      )
                    }
                    disabled={isPending}
                    className="w-full resize-y rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300">
                    The Solution ({lang.code.toUpperCase()})
                  </label>
                  <textarea
                    rows={4}
                    value={translations[lang.code]?.solution || ''}
                    onChange={(e) =>
                      handleTranslationChange(
                        lang.code,
                        'solution',
                        e.target.value,
                      )
                    }
                    disabled={isPending}
                    className="w-full resize-y rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-300">
                    Impact / Results ({lang.code.toUpperCase()})
                  </label>
                  <textarea
                    rows={3}
                    value={translations[lang.code]?.impact || ''}
                    onChange={(e) =>
                      handleTranslationChange(
                        lang.code,
                        'impact',
                        e.target.value,
                      )
                    }
                    disabled={isPending}
                    className="w-full resize-y rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
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
              onChange={(event) =>
                handleLinkChange(
                  index,
                  'type',
                  event.target.value as ProjectLinkType,
                )
              }
              disabled={isPending}
              className="w-full rounded border border-zinc-700 bg-zinc-900 p-2 text-sm text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:w-1/3"
            >
              {Object.values(ProjectLinkType).map((type) => (
                <option key={type} value={type}>
                  {getProjectLinkLabel(type)}
                </option>
              ))}
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
        className="mt-8 w-full rounded-full bg-emerald-800 py-4 font-bold text-white transition-all hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
