'use server'

import { env } from '@/app/env'

export interface GitLabContributionDay {
  date: string
  contributionCount: number
  color: string
}

interface GitLabEvent {
  created_at?: string
  push_data?: {
    commit_count?: number
  }
}

async function fetchGitLabJson(url: string, token?: string) {
  const headers: HeadersInit = token ? { 'PRIVATE-TOKEN': token } : {}

  let res = await fetch(url, {
    headers,
    next: { revalidate: 86400 }, // 24h
  })

  // Se o token expirou ou foi revogado (401), tenta novamente como requisição pública
  if (res.status === 401 && token) {
    res = await fetch(url, {
      next: { revalidate: 86400 },
    })
  }

  return res
}

export async function fetchGitLabContributions(): Promise<
  GitLabContributionDay[]
> {
  const token = env.GITLAB_ACCESS_TOKEN?.trim()
  const username = env.GITLAB_USERNAME?.trim()

  if (!username) {
    console.warn('GitLab username not configured.')
    return []
  }

  try {
    const userRes = await fetchGitLabJson(
      `https://gitlab.com/api/v4/users?username=${encodeURIComponent(username)}`,
      token,
    )

    if (!userRes.ok) {
      console.warn(`GitLab API error (user): ${userRes.status}`)
      return []
    }

    const userData = await userRes.json()

    if (!Array.isArray(userData) || userData.length === 0) {
      console.warn('GitLab user not found.')
      return []
    }
    const userId = userData[0].id

    const eventsRes = await fetchGitLabJson(
      `https://gitlab.com/api/v4/users/${userId}/events?action=pushed&per_page=100`,
      token,
    )

    if (!eventsRes.ok) {
      console.warn(`GitLab API error (events): ${eventsRes.status}`)
      return []
    }

    const events = await eventsRes.json()

    if (!Array.isArray(events)) {
      return []
    }

    const contributionsMap = new Map<string, number>()

    events.forEach((event: GitLabEvent) => {
      if (event.created_at) {
        const dateStr = event.created_at.split('T')[0] // '2026-09-28'
        const commits = event.push_data?.commit_count || 1

        const current = contributionsMap.get(dateStr) || 0
        contributionsMap.set(dateStr, current + commits)
      }
    })

    const days: GitLabContributionDay[] = Array.from(
      contributionsMap.entries(),
    ).map(([date, count]) => ({
      date,
      contributionCount: count,
      color: '',
    }))

    return days
  } catch (error) {
    console.error('Error fetching GitLab contributions:', error)
    return []
  }
}
