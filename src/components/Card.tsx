import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export type Accent = 'violet' | 'blue' | 'cyan' | 'green' | 'amber'

type Props = {
  title?: string
  icon?: ReactNode
  accent?: Accent
  className?: string
  delay?: number
  right?: ReactNode
  children: ReactNode
  label?: string
}

export function Card({ title, icon, accent = 'violet', className = '', delay = 0, right, children, label }: Props) {
  return (
    <motion.section
      data-accent={accent}
      aria-label={label ?? title}
      className={`bento-card ${className}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
    >
      {title && (
        <header className="mb-3 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
            {icon && <span className="text-[color:var(--a)]">{icon}</span>}
            {title}
          </h2>
          {right}
        </header>
      )}
      {children}
    </motion.section>
  )
}
