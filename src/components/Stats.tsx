import { motion } from 'framer-motion'
import { stats } from '../data'

export function Stats() {
  return (
    <div className="grid gap-4" aria-label="Career highlights">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            data-accent={(['violet', 'cyan'] as const)[i % 2]}
            className="bento-card !p-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
          >
            <div className="text-4xl font-extrabold tracking-tight text-[color:var(--a)]">{s.value}</div>
            <div className="mt-1 text-sm leading-snug text-muted">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
