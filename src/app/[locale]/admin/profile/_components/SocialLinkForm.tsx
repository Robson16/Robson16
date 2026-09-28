'use client'

import { SocialLink } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { createSocialLinkAction } from '@/app/_actions/create-social-link.action'
import { deleteSocialLinkAction } from '@/app/_actions/delete-social-link.action'
import { updateSocialLinkAction } from '@/app/_actions/update-social-link.action'

interface SocialLinkFormProps {
  initialSocialLinks: SocialLink[]
}

export default function SocialLinkForm({
  initialSocialLinks,
}: SocialLinkFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const [editingId, setEditingId] = useState<string | null>(null)

  const [newSocialName, setNewSocialName] = useState('')
  const [newSocialUrl, setNewSocialUrl] = useState('')
  const [newSocialIcon, setNewSocialIcon] = useState('')

  const handleEdit = (link: SocialLink) => {
    setEditingId(link.id)
    setNewSocialName(link.name)
    setNewSocialUrl(link.url)
    setNewSocialIcon(link.icon)
    setMessage('')
  }

  const handleCleanForm = () => {
    setEditingId(null)
    setNewSocialName('')
    setNewSocialUrl('')
    setNewSocialIcon('')
    setMessage('')
  }

  async function handleSaveSocial() {
    if (!newSocialName || !newSocialUrl) return

    startTransition(async () => {
      let result

      if (editingId) {
        const updatedLinks = initialSocialLinks.map((link) => {
          if (link.id === editingId) {
            return {
              id: link.id,
              icon: newSocialIcon || 'link',
              name: newSocialName,
              url: newSocialUrl,
              order: link.order,
            }
          }
          return link
        })

        result = await updateSocialLinkAction(updatedLinks)
      } else {
        result = await createSocialLinkAction({
          icon: newSocialIcon,
          name: newSocialName,
          url: newSocialUrl,
        })
      }

      if (result.success) {
        handleCleanForm()
        router.refresh()
      } else {
        setMessage(result.error || 'Error saving social network.')
      }
    })
  }

  async function handleDeleteSocial(id: string) {
    if (!confirm('Are you sure you want to delete this link?')) return

    startTransition(async () => {
      const result = await deleteSocialLinkAction(id)
      if (result.success) {
        if (editingId === id) handleCleanForm()
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

      {message && (
        <p
          className={`text-sm font-medium ${message.includes('Error') ? 'text-red-500' : 'text-emerald-500'}`}
        >
          {message}
        </p>
      )}

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
                <span className="text-sm text-zinc-400">Icon: {link.icon}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(link)}
                  disabled={isPending}
                  className="rounded px-3 py-1 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-900/30 hover:text-blue-300 disabled:opacity-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSocial(link.id)}
                  disabled={isPending}
                  className="rounded px-3 py-1 text-sm font-medium text-red-400 transition-colors hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Formulário (Adicionar / Editar) */}
      <div className="mt-4 flex flex-col gap-4 rounded border border-zinc-700 bg-zinc-900/50 p-4">
        <h3 className="text-lg font-medium text-zinc-300">
          {editingId ? 'Edit Link' : 'Add New Link'}
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-300">Icon</label>
            <input
              type="text"
              placeholder="Icon (Ex: github, linkedin)"
              value={newSocialIcon}
              onChange={(event) => setNewSocialIcon(event.target.value)}
              disabled={isPending}
              className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-300">Name</label>
            <input
              type="text"
              placeholder="Ex: GitHub"
              value={newSocialName}
              onChange={(event) => setNewSocialName(event.target.value)}
              disabled={isPending}
              className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm text-zinc-300">Url</label>
            <input
              type="url"
              placeholder="https://..."
              value={newSocialUrl}
              onChange={(event) => setNewSocialUrl(event.target.value)}
              disabled={isPending}
              className="rounded border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-2 flex gap-2">
          {editingId && (
            <button
              type="button"
              onClick={handleCleanForm}
              disabled={isPending}
              className="w-1/3 rounded border border-zinc-600 bg-transparent py-3 font-medium text-zinc-300 transition-colors hover:bg-zinc-800 disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSaveSocial}
            disabled={isPending || !newSocialName || !newSocialUrl}
            className={`rounded py-3 font-medium text-white transition-colors disabled:opacity-50 ${
              editingId
                ? 'w-2/3 bg-blue-700 hover:bg-blue-600'
                : 'w-full bg-emerald-700 hover:bg-emerald-600'
            }`}
          >
            {editingId ? 'Update Network' : '+ Add Network'}
          </button>
        </div>
      </div>
    </div>
  )
}
