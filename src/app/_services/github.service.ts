'use server'

import { env } from '@/app/env'

export interface GitHubContributionDay {
  date: string
  contributionCount: number
  color: string
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[]
}

export async function fetchGitHubContributions(): Promise<
  GitHubContributionDay[]
> {
  const token = env.GITHUB_ACCESS_TOKEN
  const username = env.GITHUB_USERNAME

  if (!token || !username) {
    console.warn('GitHub token or username not configured.')
    return []
  }

  // GitHub's official GraphQL query to retrieve the contribution calendar.
  const query = `
    query($userName: String!) {
      user(login: $userName) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          userName: username,
        },
      }),
      next: {
        revalidate: 86400, // 24 Hours
      },
    })

    const json = await response.json()

    if (json.errors) {
      console.error('GitHub GraphQL Error:', json.errors)
      return []
    }

    const weeks =
      json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ||
      []

    // Flattens the week structure into a flat array of days for easier use in the calendar.
    const days = weeks.flatMap(
      (week: GitHubContributionWeek) => week.contributionDays,
    )

    return days
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    return []
  }
}
