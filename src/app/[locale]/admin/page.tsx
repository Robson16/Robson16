import { redirect } from 'next/navigation'

import { env } from '@/app/env'
import { getAuthSession } from '@/auth'

interface AdminPageProps {
  params: Promise<{ locale: string }>
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale } = await params
  const session = await getAuthSession()

  if (!session || session.user?.email !== env.ALLOWED_EMAIL) {
    redirect(`/${locale}/login`)
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Painel Administrativo do Portfólio</h1>
      <p>Bem-vindo, {session.user?.name}!</p>
    </main>
  )
}
