'use client'

import { useState, useTransition } from 'react'

import { createProjectAction } from '@/app/_actions/project.actions'
import { uploadImageAction } from '@/app/_actions/upload-image.action'

export default function ProjectForm() {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  async function handleFormSubmit(formData: FormData) {
    startTransition(async () => {
      setMessage('Uploading the image...')

      // 1. Upload the image to MinIO/R2
      const uploadResult = await uploadImageAction(formData)

      if (!uploadResult.success || !uploadResult.url) {
        setMessage(uploadResult.error || 'Upload error')
        return
      }

      setMessage('Saving to the database...')

      // 2. Extract data from the form
      const data = {
        titlePt: formData.get('titlePt') as string,
        titleEn: formData.get('titleEn') as string,
        descriptionPt: formData.get('descriptionPt') as string,
        descriptionEn: formData.get('descriptionEn') as string,
        tier: Number(formData.get('tier')),
        imageUrl: uploadResult.url,
      }

      // 3. Save to PostgreSQL via Server Action
      const dbResult = await createProjectAction(data)

      if (dbResult.success) {
        setMessage('Project successfully created!')
      } else {
        setMessage(dbResult.error || 'Error saving project')
      }
    })
  }

  return (
    <form
      action={handleFormSubmit}
      className="flex w-full max-w-2xl flex-col gap-6 rounded-lg bg-zinc-800 p-8 shadow-2xl"
    >
      <h2 className="mb-2 text-2xl font-medium text-zinc-100">New Project</h2>

      <div className="flex flex-col gap-2">
        <label className="text-zinc-300">Featured Image</label>
        <input
          type="file"
          name="file"
          accept="image/*"
          required
          disabled={isPending}
          className="w-full cursor-pointer rounded border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-300 file:mr-4 file:rounded file:border-0 file:bg-emerald-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-zinc-300">Title (PT)</label>
          <input
            type="text"
            name="titlePt"
            required
            disabled={isPending}
            className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-zinc-300">Title (EN)</label>
          <input
            type="text"
            name="titleEn"
            required
            disabled={isPending}
            className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-zinc-300">Description (PT)</label>
          <textarea
            name="descriptionPt"
            required
            rows={4}
            disabled={isPending}
            className="w-full resize-none rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-zinc-300">Description (EN)</label>
          <textarea
            name="descriptionEn"
            required
            rows={4}
            disabled={isPending}
            className="w-full resize-none rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-zinc-300">Level of Distinction (Tier)</label>
        <select
          name="tier"
          disabled={isPending}
          defaultValue={2}
          className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="1">1 - Top Highlight</option>
          <option value="2">2 - Normal Highlight</option>
          <option value="3">3 - Archive</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 w-full rounded-full bg-emerald-800 py-4 font-bold text-white transition-all hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? 'Processing...' : 'Register Project'}
      </button>

      {message && (
        <p className="mt-2 text-center text-sm font-medium text-emerald-500">
          {message}
        </p>
      )}
    </form>
  )
}
