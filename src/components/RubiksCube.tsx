import { Box, ExternalLink } from 'lucide-react'
import { Card } from './Card'

const URL = 'https://gvnghiem.github.io/rubiksports/'

export function RubiksCube() {
  return (
    <Card
      title="Rubik’s Cube"
      icon={<Box size={18} />}
      accent="violet"
      delay={0.05}
      className="flex flex-col lg:col-span-8"
      right={
        <a className="btn !px-2.5 !py-1 !text-xs" href={URL} target="_blank" rel="noreferrer">
          Open full size <ExternalLink size={12} />
        </a>
      }
    >
      <p className="mb-3 text-sm text-muted">
        A 2×2, 3×3 and 4×4 cube simulator I built with Three.js: scramble it, time yourself, or watch it solve. Drag a layer to turn it.
      </p>
      <iframe
        src={URL}
        title="Rubiksports, an interactive Rubik's cube"
        loading="lazy"
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin"
        className="min-h-[680px] w-full flex-1 rounded-xl border border-line bg-[#9bd3ff] sm:min-h-[520px]"
      />
    </Card>
  )
}
