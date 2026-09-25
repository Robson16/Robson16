import { db } from '@/app/_lib/prisma'

import ProfileForm from './_components/ProfileForm'
import SocialLinkForm from './_components/SocialLinkForm'

export default async function AdminProfilePage() {
  const languages = await db.language.findMany({
    orderBy: { isDefault: 'desc' },
  })

  const profile = await db.profile.findFirst({
    include: {
      translations: true,
    },
  })

  const socialLinks = await db.socialLink.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-zinc-100">Profile</h2>
      </div>

      <div className="flex flex-col items-center gap-8">
        <ProfileForm languages={languages} initialData={profile} />
        <SocialLinkForm initialSocialLinks={socialLinks} />
      </div>
    </div>
  )
}
