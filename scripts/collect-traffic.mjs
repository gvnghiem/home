// Collects GitHub repo traffic (views + clones, which GitHub only keeps for 14 days)
// and merges it into a long-running per-day history at out/traffic.json.
import { mkdirSync, writeFileSync } from 'node:fs'

const token = process.env.TRAFFIC_TOKEN
const slug = process.env.GITHUB_REPOSITORY // owner/repo of this site
if (!token) throw new Error('TRAFFIC_TOKEN secret is missing')
const [owner, siteRepo] = slug.split('/')

const api = async (path) => {
  const r = await fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  if (!r.ok) throw Object.assign(new Error(`${path} -> ${r.status}`), { status: r.status })
  return r.json()
}

let history = { repos: {} }
try {
  const r = await fetch(`https://raw.githubusercontent.com/${slug}/traffic-data/traffic.json?cb=${Date.now()}`)
  if (r.ok) history = await r.json()
} catch {
  /* first run */
}

const repos = (await api('/user/repos?visibility=public&affiliation=owner&per_page=100'))
  .filter((r) => r.owner.login === owner && !r.fork && !r.archived)
  .map((r) => r.name)

let ok = 0
for (const name of repos) {
  try {
    const [views, clones] = await Promise.all([
      api(`/repos/${owner}/${name}/traffic/views`),
      api(`/repos/${owner}/${name}/traffic/clones`),
    ])
    const days = (history.repos[name] ??= {})
    for (const d of views.views) {
      const k = d.timestamp.slice(0, 10)
      days[k] = { ...days[k], v: d.count, u: d.uniques }
    }
    for (const d of clones.clones) {
      const k = d.timestamp.slice(0, 10)
      days[k] = { ...days[k], c: d.count, cu: d.uniques }
    }
    ok++
  } catch (e) {
    console.warn(`skip ${name}: ${e.message}`)
  }
}
if (!ok) throw new Error('No repo traffic could be read. Check that TRAFFIC_TOKEN has read access to repository Administration.')

const cutoff = new Date(Date.now() - 400 * 864e5).toISOString().slice(0, 10)
for (const days of Object.values(history.repos)) for (const k of Object.keys(days)) if (k < cutoff) delete days[k]

mkdirSync('out', { recursive: true })
writeFileSync('out/traffic.json', JSON.stringify({ updated: new Date().toISOString(), site: siteRepo, repos: history.repos }))
console.log(`Collected traffic for ${ok}/${repos.length} repos`)
