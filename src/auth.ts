import { PrismaAdapter } from '@auth/prisma-adapter'
import { getServerSession, NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { db } from '@/app/_lib/prisma'
import { env } from '@/app/env'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: env.NEXTAUTH_GITHUB_ID,
      clientSecret: env.NEXTAUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user }) {
      const allowedEmail = env.ALLOWED_EMAIL

      if (user.email === allowedEmail) {
        return true
      }
      return false
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)
