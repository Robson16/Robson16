import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

import { env } from '@/app/env'

const prismaClientSingleton = () => {
  const connectionUrl = new URL(env.DATABASE_URL)
  const sslMode = connectionUrl.searchParams.get('sslmode')

  if (sslMode && ['prefer', 'require', 'verify-ca'].includes(sslMode)) {
    connectionUrl.searchParams.set('sslmode', 'verify-full')
  }

  const adapter = new PrismaPg({ connectionString: connectionUrl.toString() })

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

export const db = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db
