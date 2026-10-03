'use server'

import { z } from 'zod'

import { env } from '@/app/env'

export interface CommitData {
  sha: string
  message: string
  date: string
  url: string
}

const GitHubCommitSchema = z.object({
  sha: z.string(),
  commit: z.object({
    message: z.string(),
    author: z.object({
      date: z.iso.datetime(),
    }),
  }),
  html_url: z.url(),
})

const GitLabCommitSchema = z.object({
  short_id: z.string(),
  title: z.string(),
  created_at: z.iso.datetime({ offset: true }),
  web_url: z.url(),
})

export async function fetchRecentCommits(
  repoUrl: string,
): Promise<CommitData[]> {
  try {
    if (repoUrl.includes('github.com')) {
      return await fetchGitHubCommits(repoUrl)
    }

    if (repoUrl.includes('gitlab.com')) {
      return await fetchGitLabCommits(repoUrl)
    }

    return []
  } catch (error) {
    console.error('Error fetching commits for', repoUrl, error)
    return []
  }
}

async function fetchGitHubCommits(url: string): Promise<CommitData[]> {
  const urlParts = new URL(url).pathname.split('/').filter(Boolean)
  const owner = urlParts[0]
  const repo = urlParts[1]

  if (!owner || !repo) return []

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?per_page=10`,
    {
      next: { revalidate: 3600 },
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
      },
    },
  )

  if (!response.ok) return []

  const data: unknown = await response.json()
  const parsed = z.array(GitHubCommitSchema).safeParse(data)

  if (!parsed.success) return []

  return parsed.data.map((commit) => ({
    sha: commit.sha.substring(0, 7),
    message: commit.commit.message.split('\n')[0],
    date: commit.commit.author.date,
    url: commit.html_url,
  }))
}

async function fetchGitLabCommits(url: string): Promise<CommitData[]> {
  const urlParts = new URL(url).pathname.substring(1)
  const encodedPath = encodeURIComponent(urlParts)

  const response = await fetch(
    `https://gitlab.com/api/v4/projects/${encodedPath}/repository/commits?per_page=10`,
    {
      next: { revalidate: 3600 },
    },
  )

  if (!response.ok) return []

  const data: unknown = await response.json()
  const parsed = z.array(GitLabCommitSchema).safeParse(data)

  if (!parsed.success) return []

  return parsed.data.map((commit) => ({
    sha: commit.short_id,
    message: commit.title,
    date: commit.created_at,
    url: commit.web_url,
  }))
}
