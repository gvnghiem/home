import { Network } from 'lucide-react'
import type { Kind, Topology } from '../topologies'

const fill: Record<Kind, string> = {
  ext: 'color-mix(in srgb, var(--muted) 14%, var(--card))',
  main: 'color-mix(in srgb, var(--cyan) 16%, var(--card))',
  alt: 'color-mix(in srgb, var(--violet) 18%, var(--card))',
}
const stroke: Record<Kind, string> = { ext: 'var(--muted)', main: 'var(--cyan)', alt: 'var(--violet)' }

export function TopologyDiagram({ id, topo }: { id: string; topo: Topology }) {
  const marker = `arrow-${id}`
  return (
    <div className="mt-3 rounded-xl border border-line bg-card2 p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--a)]">
          <Network size={15} /> Topology
        </p>
        <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted">
          {topo.legend.map(([k, label]) => (
            <li key={label} className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 rounded-sm border"
                style={{ background: fill[k], borderColor: stroke[k] }}
              />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="scroll-x overflow-x-auto">
        <svg viewBox={`0 0 680 ${topo.h}`} role="img" aria-label={topo.summary} className="mx-auto block h-auto w-full min-w-[600px] max-w-[760px]">
          <defs>
            <marker id={marker} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M2 1L8 5L2 9" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>

          {topo.container && (
            <g>
              <rect
                x={topo.container.x}
                y={topo.container.y}
                width={topo.container.w}
                height={topo.container.h}
                rx={20}
                fill="none"
                stroke="var(--muted)"
                strokeOpacity={0.6}
                strokeWidth={0.75}
                strokeDasharray="4 4"
              />
              <text
                x={topo.container.lx ?? topo.container.x + 20}
                y={topo.container.y + 24}
                fill="var(--fg)"
                fontSize={14}
                fontWeight={600}
              >
                {topo.container.label}
              </text>
            </g>
          )}

          {topo.lanes?.map((l) => (
            <text key={l.label} x={l.x} y={l.y} fill="var(--muted)" fontSize={12}>
              {l.label}
            </text>
          ))}

          {topo.edges.map((pts, i) => (
            <polyline
              key={i}
              points={pts.map((p) => p.join(',')).join(' ')}
              fill="none"
              stroke="var(--muted)"
              strokeWidth={1.5}
              markerEnd={`url(#${marker})`}
            />
          ))}

          {topo.nodes.map((n) => {
            const subs = n.s ?? []
            const cy = n.y + n.h / 2
            const top = cy - subs.length * 9
            return (
              <g key={`${n.t}-${n.x}-${n.y}`}>
                <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={8} fill={fill[n.k]} stroke={stroke[n.k]} strokeWidth={0.75} />
                <text x={n.x + n.w / 2} y={top} textAnchor="middle" dominantBaseline="central" fill="var(--fg)" fontSize={14} fontWeight={600}>
                  {n.t}
                </text>
                {subs.map((line, i) => (
                  <text
                    key={line}
                    x={n.x + n.w / 2}
                    y={top + 18 * (i + 1)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="var(--muted)"
                    fontSize={12}
                  >
                    {line}
                  </text>
                ))}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
