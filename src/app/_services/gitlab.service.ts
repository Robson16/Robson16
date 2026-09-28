'use server'

import { env } from '@/app/env'

export interface GitLabContributionDay {
  date: string
  contributionCount: number
  color: string
}

export async function fetchGitLabContributions(): Promise<
  GitLabContributionDay[]
> {
  const token = env.GITLAB_ACCESS_TOKEN
  const username = env.GITLAB_USERNAME

  if (!token || !username) {
    console.warn('GitLab token or username not configured.')
    return []
  }

  try {
    const userRes = await fetch(
      `https://gitlab.com/api/v4/users?username=${username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: {
          revalidate: 86400, // 24h
        },
      },
    )
    const userData = await userRes.json()

    if (!userData || userData.length === 0) {
      console.warn('GitLab user not found.')
      return []
    }
    const userId = userData[0].id

    const eventsRes = await fetch(
      `https://gitlab.com/api/v4/users/${userId}/events?action=pushed&per_page=100`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 86400 },
      },
    )
    const events = await eventsRes.json()

    if (!Array.isArray(events)) {
      return []
    }

    const contributionsMap = new Map<string, number>()

    events.forEach((event: any) => {
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
