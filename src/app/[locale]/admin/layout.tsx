import { ReactNode } from 'react'

import AdminSidebar from './_components/AdminSidebar'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-900 text-zinc-100 md:flex-row">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">{children}</main>
    </div>
  )
}
