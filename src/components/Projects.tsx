import { ExternalLink, FolderGit2 } from 'lucide-react'
import { useState } from 'react'
import { Card } from './Card'
import { projects } from '../data'

function Thumb({ src, alt, pos }: { src: string; alt: string; pos?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div
        className="grid h-full w-full place-items-center text-xs text-muted"
        style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--violet) 25%, var(--card-2)), var(--card-2))' }}
      >
        {alt}
      </div>
    )
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" style={pos ? { objectPosition: pos } : undefined} />
}

export function Projects() {
  return (
    <Card title="Featured Projects" icon={<FolderGit2 size={18} />} accent="blue" delay={0.1}>
      <div className="scroll-x -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2" tabIndex={0} aria-label="Project list, scrolls horizontally">
        {projects.map((p) => (
          <a
            key={p.url}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="group w-52 shrink-0 snap-start overflow-hidden rounded-xl border border-line bg-card2 no-underline transition-transform hover:-translate-y-1 hover:border-[color:var(--a)]"
          >
            <div className="aspect-[16/10] overflow-hidden bg-black/30">
              <Thumb src={p.img} alt={p.name} pos={'pos' in p ? p.pos : undefined} />
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-sm font-semibold text-fg">{p.name}</h3>
                <ExternalLink size={13} className="shrink-0 text-muted group-hover:text-[color:var(--a)]" />
              </div>
              <p className="mt-1 line-clamp-2 min-h-[2.25rem] text-xs text-muted">{p.desc}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {p.tags.map((t) => (
                  <span key={t} className="chip !px-2 !py-0 !text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </Card>
  )
}
