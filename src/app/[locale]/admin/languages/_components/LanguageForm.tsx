'use client'

import { Prisma } from '@prisma/client'
import { useState, useTransition } from 'react'

import { createLanguageAction } from '@/app/_actions/create-language.action'
import { updateLanguageAction } from '@/app/_actions/update-language.action'

interface LanguageFormProps {
  initialData?: Prisma.LanguageGetPayload<{}>
}

export default function LanguageForm({ initialData }: LanguageFormProps) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const isEditing = !!initialData

  async function handleFormSubmit(formData: FormData) {
    startTransition(async () => {
      setMessage(isEditing ? 'Updating language...' : 'Saving language...')

      const data = {
        code: formData.get('code') as string,
        name: formData.get('name') as string,
        isDefault: formData.get('isDefault') === 'on',
      }

      let result

      if (isEditing) {
        result = await updateLanguageAction(initialData.code, data)
      } else {
        result = await createLanguageAction(data)
      }

      if (result.success) {
        setMessage(
          isEditing
            ? 'Language updated successfully!'
            : 'Language created successfully!',
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
        {isEditing ? 'Edit Language' : 'New Language'}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-zinc-300">Language Code</label>
          <input
            type="text"
            name="code"
            required
            defaultValue={initialData?.code || ''}
            disabled={isPending || isEditing}
            placeholder="e.g., it, es, fr"
            maxLength={5}
            className={`rounded border border-zinc-700 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none ${
              isEditing ? 'cursor-not-allowed bg-zinc-900/50' : 'bg-zinc-900'
            }`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-zinc-300">Display Name</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={initialData?.name || ''}
            disabled={isPending}
            placeholder="e.g., Italiano"
            className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 rounded border border-zinc-700 bg-zinc-900/50 p-4">
        <input
          type="checkbox"
          id="isDefault"
          name="isDefault"
          disabled={isPending}
          defaultChecked={initialData?.isDefault}
          className="size-5 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-800"
        />
        <div className="flex flex-col">
          <label htmlFor="isDefault" className="font-medium text-zinc-100">
            Set as default language
          </label>
          <span className="text-sm text-zinc-400">
            This will remove the default status from the current primary
            language.
          </span>
        </div>
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
            : 'Register Language'}
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
