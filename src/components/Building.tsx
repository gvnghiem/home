import { GitCommitHorizontal, Hammer } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Card } from './Card'
import { TrafficPanel } from './TrafficPanel'
import { learning, profile } from '../data'

type Repo = { name: string; html_url: string; description: string | null; pushed_at: string; language: string | null }

function ago(iso: string) {
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  if (mins < 60) return `${mins}m ago`
  const h = Math.round(mins / 60)
  if (h < 48) return `${h}h ago`
  const d = Math.round(h / 24)
  if (d < 60) return `${d}d ago`
  return `${Math.round(d / 30)}mo ago`
}

const CACHE_KEY = 'recent-repos-v1'

export function Building() {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    // Reuse a recent response within the session so we stay well under GitHub's unauthenticated rate limit.
    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        setRepos(JSON.parse(cached))
        return
      }
    } catch {
      /* storage unavailable */
    }
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=pushed&per_page=4`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: Repo[]) => {
        const list = data.filter((r) => r.name !== 'home' || data.length < 2).slice(0, 4)
        setRepos(list)
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(list))
        } catch {
          /* ignore */
        }
      })
      .catch((e) => {
        if (e.name !== 'AbortError') setFailed(true)
      })
    return () => ctrl.abort()
  }, [])

  return (
    <Card
      title="Currently Building"
      icon={<Hammer size={18} />}
      accent="green"
      delay={0.05}
      right={
        <span className="chip" style={{ ['--a' as string]: 'var(--green)' }}>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" aria-hidden /> live
        </span>
      }
    >
      <ul className="space-y-2" aria-live="polite">
        {repos === null && !failed && [0, 1, 2].map((i) => <li key={i} className="h-9 animate-pulse rounded-lg bg-card2" />)}
        {failed && (
          <li className="text-sm text-muted">
            Couldn’t reach GitHub just now. See{' '}
            <a className="underline" href={profile.github} target="_blank" rel="noreferrer">
              github.com/{profile.githubUser}
            </a>
            .
          </li>
        )}
        {repos?.map((r) => (
          <li key={r.name}>
            <a
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-2 rounded-lg border border-line bg-card2 px-3 py-2 text-sm no-underline transition-colors hover:border-[color:var(--a)]"
            >
              <GitCommitHorizontal size={15} className="mt-0.5 shrink-0 text-[color:var(--a)]" />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-fg">{r.name}</span>
                <span className="block truncate text-xs text-muted">{r.description ?? r.language ?? 'Recent push'}</span>
              </span>
              <span className="shrink-0 text-xs text-muted">{ago(r.pushed_at)}</span>
            </a>
          </li>
        ))}
      </ul>

      <TrafficPanel />

      <h3 className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-muted">Learning</h3>
      <div className="flex flex-wrap gap-1.5">
        {learning.map((l) => (
          <span key={l} className="chip">
            {l}
          </span>
        ))}
      </div>
    </Card>
  )
}
