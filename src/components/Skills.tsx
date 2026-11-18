import { Award, Cpu, GraduationCap } from 'lucide-react'
import { Card } from './Card'
import { credentials, skills } from '../data'

export function Skills() {
  return (
    <Card title="Technical Skills" icon={<Cpu size={18} />} accent="violet" delay={0.1}>
      <div className="space-y-3">
        {skills.map((g) => (
          <div key={g.group}>
            <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted">{g.group}</h3>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export function Credentials() {
  return (
    <Card title="Education & Certifications" icon={<GraduationCap size={18} />} accent="amber" delay={0.15}>
      <ul className="space-y-2.5 text-sm">
        {credentials.education.map((e) => (
          <li key={e.name}>
            <div className="font-medium">{e.name}</div>
            <div className="text-xs text-muted">
              {e.org} · {e.when}
            </div>
          </li>
        ))}
      </ul>
      <h3 className="mb-2 mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
        <Award size={13} /> Certifications & training
      </h3>
      <ul className="space-y-2 text-sm">
        {credentials.certs.map((c) => (
          <li key={c.name}>
            <div className="leading-snug">{c.name}</div>
            <div className="text-xs text-muted">
              {c.org} · {c.when}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
