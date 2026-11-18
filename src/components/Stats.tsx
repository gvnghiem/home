import { motion } from 'framer-motion'
import { stats } from '../data'

export function Stats() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4" aria-label="Career highlights">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          data-accent={(['violet', 'blue', 'cyan', 'green'] as const)[i % 4]}
          className="bento-card !p-4"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 * i, duration: 0.4 }}
        >
          <div className="text-2xl font-extrabold tracking-tight text-[color:var(--a)] sm:text-3xl">{s.value}</div>
          <div className="mt-1 text-xs leading-snug text-muted">{s.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
