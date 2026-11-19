import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, Lightbulb, Scale, Target } from 'lucide-react'
import { useState } from 'react'
import { Card } from './Card'
import { caseStudies } from '../data'
import { topologies } from '../topologies'
import { TopologyDiagram } from './TopologyDiagram'

export function CaseStudies() {
  const [active, setActive] = useState(caseStudies[0].id)
  const study = caseStudies.find((c) => c.id === active)!

  return (
    <Card
      title="Architecture Case Studies"
      icon={<Scale size={18} />}
      accent="cyan"
      delay={0.05}
      className="lg:col-span-8"
      right={<span className="hidden text-xs text-muted sm:inline">Problem → Trade-offs → Solution → Topology</span>}
    >
      <div role="tablist" aria-label="Case studies" className="scroll-x -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {caseStudies.map((c) => {
          const selected = c.id === active
          return (
            <button
              key={c.id}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={selected}
              aria-controls={`panel-${c.id}`}
              onClick={() => setActive(c.id)}
              className="btn shrink-0 !rounded-full !px-3.5 !py-1.5 !text-[13px]"
              style={
                selected
                  ? { background: 'color-mix(in srgb, var(--a) 18%, var(--card-2))', borderColor: 'var(--a)' }
                  : undefined
              }
            >
              {c.title}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={study.id}
          role="tabpanel"
          id={`panel-${study.id}`}
          aria-labelledby={`tab-${study.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mt-2"
        >
          <p className="mb-3 text-xs uppercase tracking-wider text-muted">{study.context}</p>

          <div className="grid gap-3 md:grid-cols-3">
            <Step icon={<AlertTriangle size={15} />} label="Problem" color="var(--amber)">
              <p>{study.problem}</p>
            </Step>
            <Step icon={<Scale size={15} />} label="Trade-offs" color="var(--violet)">
              <ul className="space-y-2">
                {study.tradeoffs.map((t) => (
                  <li key={t} className="flex gap-2">
                    <ArrowRight size={13} className="mt-1 shrink-0 opacity-60" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Step>
            <Step icon={<Lightbulb size={15} />} label="Solution" color="var(--green)">
              <p>{study.solution}</p>
            </Step>
          </div>

          <div className="mt-3 flex flex-col gap-3 rounded-xl border border-line bg-card2 p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2 text-sm">
              <Target size={16} className="mt-0.5 shrink-0 text-[color:var(--a)]" />
              <span>
                <span className="font-semibold">Outcome: </span>
                <span className="text-muted">{study.impact}</span>
              </span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {study.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {topologies[study.id] && <TopologyDiagram id={study.id} topo={topologies[study.id]} />}
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}

function Step({ icon, label, color, children }: { icon: React.ReactNode; label: string; color: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-card2 p-3 text-sm leading-relaxed text-muted">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color }}>
        {icon} {label}
      </div>
      {children}
    </div>
  )
}
