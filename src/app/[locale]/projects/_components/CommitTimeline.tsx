import { getTranslations } from 'next-intl/server'
import { FaCodeCommit } from 'react-icons/fa6'

import { fetchRecentCommits } from '@/app/_services/commits.service'

interface CommitTimelineProps {
  repoUrl: string
}

export default async function CommitTimeline({ repoUrl }: CommitTimelineProps) {
  const t = await getTranslations('ProjectDetails')
  const commits = await fetchRecentCommits(repoUrl)

  if (!commits || commits.length === 0) {
    return null
  }

  const isGitHub = repoUrl.includes('github.com')
  const isGitLab = repoUrl.includes('gitlab.com')
  const repositoryTitle =
    new URL(repoUrl).pathname
      .split('/')
      .filter(Boolean)
      .pop()
      ?.replace(/\.git$/i, '') ?? repoUrl
  let platformName
  if (isGitHub) platformName = 'GitHub'
  if (isGitLab) platformName = 'Gitlab'

  return (
    <div className="mt-12 rounded-xl bg-zinc-900/50 p-6">
      <h2 className="mb-2 text-lg font-semibold text-white">
        {repositoryTitle}
      </h2>
      <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
        <FaCodeCommit className="text-emerald-500" />
        {t('commitTimelineTitle')} {platformName}
      </h3>

      <div className="relative ml-3 space-y-8 border-l-2 border-zinc-800 pb-4">
        {commits.map((commit) => {
          const date = new Date(commit.date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })

          return (
            <div key={commit.sha} className="relative pl-6">
              {/* Ponto na timeline */}
              <div className="absolute top-1.5 -left-2.25 size-4 rounded-full border-2 border-zinc-900 bg-emerald-500 ring-4 ring-zinc-900/50" />

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-emerald-400 hover:underline"
                  >
                    {commit.sha}
                  </a>
                  <span>•</span>
                  <time>{date}</time>
                </div>

                <a
                  href={commit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="line-clamp-2 text-zinc-200 transition-colors hover:text-emerald-400"
                >
                  {commit.message}
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
