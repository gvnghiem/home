import { motion } from 'framer-motion'
import { clientLogos, industries, stats } from '../data'

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
      <motion.div
        data-accent="blue"
        className="bento-card !p-4"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12, duration: 0.4 }}
      >
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Industries supported</h2>
        <div className="flex flex-wrap gap-1.5">
          {industries.map((i) => (
            <span key={i} className="chip">
              {i}
            </span>
          ))}
        </div>
        {clientLogos.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-3">
            {clientLogos.map((f) => (
              <img key={f} src={`${import.meta.env.BASE_URL}logos/${f}`} alt="Client logo" className="h-7 w-auto opacity-80" />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
