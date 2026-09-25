'use client'

import { useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
// Importando os ícones do react-icons
import {
  LuBriefcase,
  LuChevronDown,
  LuCode,
  LuFolderGit2,
  LuLanguages,
  LuLayoutDashboard,
  LuMenu,
  LuX,
} from 'react-icons/lu'

import { Link } from '@/app/_i18n/navigation'

export default function AdminSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    projects: false,
    experiences: false,
    skills: false,
    languages: false,
  })

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const closeMobileMenu = () => setIsMobileOpen(false)

  const menuGroups = [
    {
      id: 'projects',
      label: 'Projects',
      basePath: '/admin/projects',
      icon: <LuFolderGit2 className="text-emerald-500" size={18} />,
    },
    {
      id: 'experiences',
      label: 'Experiences',
      basePath: '/admin/experiences',
      icon: <LuBriefcase className="text-emerald-500" size={18} />,
    },
    {
      id: 'skills',
      label: 'Skills',
      basePath: '/admin/skills',
      icon: <LuCode className="text-emerald-500" size={18} />,
    },
    {
      id: 'languages',
      label: 'Languages',
      basePath: '/admin/languages',
      icon: <LuLanguages className="text-emerald-500" size={18} />,
    },
  ]

  return (
    <>
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 p-4 md:hidden">
        <h1 className="text-xl font-bold text-emerald-500">Admin Panel</h1>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="text-zinc-300 transition-colors hover:text-white"
        >
          <LuMenu size={24} />
        </button>
      </div>

      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform flex-col overflow-y-auto border-r border-zinc-800 bg-zinc-950 p-6 transition-transform duration-300 ease-in-out md:static md:flex md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-emerald-500">Admin Panel</h1>
          <button
            onClick={closeMobileMenu}
            className="text-zinc-400 transition-colors hover:text-white md:hidden"
          >
            <LuX size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 rounded p-2 font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <AiOutlineHome className="text-emerald-500" size={18} />
            To site
          </Link>
          <Link
            href="/admin"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 rounded p-2 font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <LuLayoutDashboard className="text-emerald-500" size={18} />
            Dashboard
          </Link>
          <div className="my-2 h-px w-full bg-zinc-800" />{' '}
          {menuGroups.map((group) => (
            <div key={group.id} className="flex flex-col gap-1">
              <button
                onClick={() => toggleDropdown(group.id)}
                className="flex items-center justify-between rounded p-2 text-sm font-semibold text-zinc-400 uppercase transition-colors hover:bg-zinc-800 hover:text-zinc-200"
              >
                <div className="flex items-center gap-3">
                  {group.icon}
                  {group.label}
                </div>
                <LuChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${openDropdowns[group.id] ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  openDropdowns[group.id]
                    ? 'max-h-40 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <Link
                  href={group.basePath}
                  onClick={closeMobileMenu}
                  className="ml-9 rounded p-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                  List All
                </Link>
                <Link
                  href={`${group.basePath}/new`}
                  onClick={closeMobileMenu}
                  className="ml-9 rounded p-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                  Add New
                </Link>
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
