import { Briefcase, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Card } from './Card'
import { experience } from '../data'

export function Experience() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Card title="Experience" icon={<Briefcase size={18} />} accent="blue" delay={0.05} className="lg:col-span-7">
      <ol className="relative space-y-2 border-l border-line pl-4">
        {experience.map((e, i) => {
          const isOpen = open === i
          return (
            <li key={e.role + e.when} className="relative">
              <span
                className="absolute -left-[22px] top-4 h-3 w-3 rounded-full border-2 border-card"
                style={{ background: i === 0 ? 'var(--green)' : 'var(--a)' }}
                aria-hidden
              />
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-card2"
              >
                <span>
                  <span className="block text-sm font-semibold">{e.role}</span>
                  <span className="block text-sm text-muted">
                    {e.company} · {e.where}
                  </span>
                  <span className="mt-0.5 block text-xs text-[color:var(--a)]">{e.when}</span>
                </span>
                <ChevronDown size={16} className={`mt-1 shrink-0 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden px-3 text-sm leading-relaxed text-muted"
                  >
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2 pb-2">
                        <span className="text-[color:var(--a)]">▸</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ol>
    </Card>
  )
}
