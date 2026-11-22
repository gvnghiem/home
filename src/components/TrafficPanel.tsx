import { BarChart3 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { profile } from '../data'

type Day = { v?: number; u?: number; c?: number; cu?: number }
type Data = { updated: string; repos: Record<string, Record<string, Day>> }

const URL = `https://raw.githubusercontent.com/${profile.githubUser}/home/traffic-data/traffic.json`
const CACHE_KEY = 'repo-traffic-v1'
const RANGES = [14, 30, 90] as const

const iso = (d: Date) => d.toISOString().slice(0, 10)
const short = (s: string) => new Date(s + 'T00:00:00Z').toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' })

export function TrafficPanel() {
  const [data, setData] = useState<Data | null>(null)
  const [range, setRange] = useState<(typeof RANGES)[number]>(30)
  const [hover, setHover] = useState<number | null>(null)

  useEffect(() => {
    try {
      const c = sessionStorage.getItem(CACHE_KEY)
      if (c) {
        setData(JSON.parse(c))
        return
      }
    } catch {
      /* ignore */
    }
    const ctrl = new AbortController()
    fetch(URL, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: Data) => {
        setData(d)
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(d))
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        /* no data yet: the panel simply stays hidden */
      })
    return () => ctrl.abort()
  }, [])

  const view = useMemo(() => {
    if (!data) return null
    const end = new Date(data.updated)
    const days = Array.from({ length: range }, (_, i) => iso(new Date(end.getTime() - (range - 1 - i) * 864e5)))
    const series = days.map((d) => {
      let v = 0
      let u = 0
      for (const r of Object.values(data.repos)) {
        v += r[d]?.v ?? 0
        u += r[d]?.u ?? 0
      }
      return { d, v, u }
    })
    const rows = Object.entries(data.repos)
      .map(([name, byDay]) => {
        const t = { name, v: 0, u: 0, c: 0 }
        for (const d of days) {
          t.v += byDay[d]?.v ?? 0
          t.u += byDay[d]?.u ?? 0
          t.c += byDay[d]?.c ?? 0
        }
        return t
      })
      .filter((r) => r.v || r.c)
      .sort((a, b) => b.v - a.v || b.c - a.c)
    const total = rows.reduce((a, r) => ({ v: a.v + r.v, u: a.u + r.u, c: a.c + r.c }), { v: 0, u: 0, c: 0 })
    return { series, rows, total }
  }, [data, range])

  if (!view || !data) return null

  const W = 320
  const H = 96
  const pad = { l: 4, r: 4, t: 8, b: 4 }
  const max = Math.max(1, ...view.series.map((s) => s.v))
  const x = (i: number) => pad.l + (i * (W - pad.l - pad.r)) / Math.max(1, view.series.length - 1)
  const y = (n: number) => pad.t + (1 - n / max) * (H - pad.t - pad.b)
  const line = (k: 'v' | 'u') => view.series.map((s, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(s[k]).toFixed(1)}`).join(' ')
  const area = `${line('v')} L${x(view.series.length - 1)},${H - pad.b} L${x(0)},${H - pad.b} Z`
  const h = hover !== null ? view.series[hover] : null

  return (
    <section aria-label="Repository traffic" className="mt-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
          <BarChart3 size={14} /> Repo traffic
        </h3>
        <div role="group" aria-label="Date range" className="flex gap-1">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              aria-pressed={r === range}
              className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted"
              style={r === range ? { color: 'var(--fg)', borderColor: 'var(--a)', background: 'color-mix(in srgb, var(--a) 15%, var(--card-2))' } : undefined}
            >
              {r}d
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          ['Views', view.total.v],
          ['Unique', view.total.u],
          ['Clones', view.total.c],
        ].map(([label, n]) => (
          <div key={label} className="rounded-lg border border-line bg-card2 px-2 py-1.5">
            <div className="text-base font-bold tabular-nums">{n.toLocaleString()}</div>
            <div className="text-[11px] text-muted">{label}</div>
          </div>
        ))}
      </div>

      <div className="relative mt-2 rounded-lg border border-line bg-card2 p-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label={`Daily repository views over the last ${range} days: ${view.total.v} views, ${view.total.u} unique visitors.`}
          onPointerLeave={() => setHover(null)}
          onPointerMove={(e) => {
            const b = e.currentTarget.getBoundingClientRect()
            const rel = ((e.clientX - b.left) / b.width) * W
            setHover(Math.min(view.series.length - 1, Math.max(0, Math.round(((rel - pad.l) / (W - pad.l - pad.r)) * (view.series.length - 1)))))
          }}
        >
          <path d={area} fill="var(--green)" opacity={0.16} />
          <path d={line('v')} fill="none" stroke="var(--green)" strokeWidth={1.75} strokeLinejoin="round" />
          <path d={line('u')} fill="none" stroke="var(--cyan)" strokeWidth={1.5} strokeDasharray="3 3" strokeLinejoin="round" />
          {h && (
            <>
              <line x1={x(hover!)} x2={x(hover!)} y1={pad.t} y2={H - pad.b} stroke="var(--muted)" strokeWidth={0.75} />
              <circle cx={x(hover!)} cy={y(h.v)} r={3} fill="var(--green)" />
            </>
          )}
        </svg>
        <div className="mt-1 flex items-center justify-between text-[11px] text-muted">
          <span>{short(view.series[0].d)}</span>
          <span className="tabular-nums">{h ? `${short(h.d)}: ${h.v} views, ${h.u} unique` : `Peak ${max}/day`}</span>
          <span>{short(view.series[view.series.length - 1].d)}</span>
        </div>
        <div className="mt-1 flex gap-3 text-[11px] text-muted">
          <span className="flex items-center gap-1">
            <i className="inline-block h-0.5 w-3 rounded" style={{ background: 'var(--green)' }} /> Views
          </span>
          <span className="flex items-center gap-1">
            <i className="inline-block h-0.5 w-3 rounded" style={{ borderTop: '2px dashed var(--cyan)' }} /> Unique visitors
          </span>
        </div>
      </div>

      {view.rows.length > 0 && (
        <table className="mt-2 w-full table-fixed text-left text-xs">
          <caption className="sr-only">Views, unique visitors and clones per repository, last {range} days</caption>
          <thead className="text-[11px] uppercase tracking-wider text-muted">
            <tr>
              <th scope="col" className="w-auto py-1 font-semibold">Repo</th>
              <th scope="col" className="w-14 py-1 text-right font-semibold">Views</th>
              <th scope="col" className="w-14 py-1 text-right font-semibold">Unique</th>
              <th scope="col" className="w-14 py-1 text-right font-semibold">Clones</th>
            </tr>
          </thead>
          <tbody>
            {view.rows.slice(0, 6).map((r) => (
              <tr key={r.name} className="border-t border-line">
                <th scope="row" className="truncate py-1.5 pr-2 font-medium">
                  <a href={`https://github.com/${profile.githubUser}/${r.name}`} target="_blank" rel="noreferrer" className="text-fg no-underline hover:underline">
                    {r.name}
                  </a>
                </th>
                <td className="py-1.5 text-right tabular-nums">{r.v}</td>
                <td className="py-1.5 text-right tabular-nums">{r.u}</td>
                <td className="py-1.5 text-right tabular-nums">{r.c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="mt-1.5 text-[11px] text-muted">
        GitHub repo-page views and clones, updated daily. Unique counts are summed per day.
      </p>
    </section>
  )
}
