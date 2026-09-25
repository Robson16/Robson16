'use client'

import { SocialLink } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { createSocialLink } from '@/app/_actions/create-social-link.action'
import { deleteSocialLink } from '@/app/_actions/delete-social-link.action'

interface SocialLinkFormProps {
  initialSocialLinks: SocialLink[]
}

export default function SocialLinkForm({
  initialSocialLinks,
}: SocialLinkFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const [newSocialName, setNewSocialName] = useState('')
  const [newSocialUrl, setNewSocialUrl] = useState('')

  async function handleAddSocial() {
    if (!newSocialName || !newSocialUrl) return

    startTransition(async () => {
      const result = await createSocialLink({
        name: newSocialName,
        url: newSocialUrl,
      })

      if (result.success) {
        setNewSocialName('')
        setNewSocialUrl('')
        setMessage('')
        router.refresh()
      } else {
        setMessage(result.error || 'Error adding social network.')
      }
    })
  }

  async function handleDeleteSocial(id: string) {
    if (!confirm('Are you sure you want to delete this link?')) return

    startTransition(async () => {
      const result = await deleteSocialLink(id)
      if (result.success) {
        router.refresh()
      } else {
        setMessage(result.error || 'Error deleting social media account.')
      }
    })
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6 rounded-lg bg-zinc-800 p-8 shadow-2xl">
      <div className="border-b border-zinc-700 pb-4">
        <h2 className="text-2xl font-medium text-zinc-100">Social media</h2>
      </div>

      {message && <p className="text-sm font-medium text-red-500">{message}</p>}

      {/* Lista Existente */}
      <div className="flex flex-col gap-3">
        {initialSocialLinks.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No social networks registered.
          </p>
        ) : (
          initialSocialLinks.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between rounded border border-zinc-700 bg-zinc-900 p-3"
            >
              <div className="flex flex-col">
                <span className="font-medium text-zinc-100">{link.name}</span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-zinc-400 hover:text-emerald-400"
                >
                  {link.url}
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteSocial(link.id)}
                disabled={isPending}
                className="rounded px-3 py-1 text-sm font-medium text-red-400 transition-colors hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Adicionar Nova Rede */}
      <div className="mt-4 flex flex-col gap-4 rounded border border-zinc-700 p-4">
        <h3 className="text-lg font-medium text-zinc-300">Add New Link</h3>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1 flex-col gap-2">
            <input
              type="text"
              placeholder="Ex: GitHub"
              value={newSocialName}
              onChange={(e) => setNewSocialName(e.target.value)}
              disabled={isPending}
              className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-2 flex-col gap-2 md:w-2/3">
            <input
              type="url"
              placeholder="https://..."
              value={newSocialUrl}
              onChange={(e) => setNewSocialUrl(e.target.value)}
              disabled={isPending}
              className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddSocial}
          disabled={isPending || !newSocialName || !newSocialUrl}
          className="w-full rounded bg-zinc-700 py-3 font-medium text-white transition-colors hover:bg-zinc-600 disabled:opacity-50"
        >
          + Add Network
        </button>
      </div>
    </div>
  )
}
