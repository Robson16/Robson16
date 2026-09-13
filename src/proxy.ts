import { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/app/_i18n/routing'

const handleAppRouting = createMiddleware(routing)

export function proxy(request: NextRequest) {
  return handleAppRouting(request)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|pt)/:path*'],
}
