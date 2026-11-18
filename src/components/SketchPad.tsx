import { ExternalLink, Pencil } from 'lucide-react'
import { Card } from './Card'

const URL = 'https://gvnghiem.github.io/sketch-pad/'

export function SketchPad() {
  return (
    <Card
      title="Sketch Pad"
      icon={<Pencil size={18} />}
      accent="amber"
      delay={0.05}
      className="flex flex-col lg:col-span-8"
      right={
        <a className="btn !px-2.5 !py-1 !text-xs" href={URL} target="_blank" rel="noreferrer">
          Open full size <ExternalLink size={12} />
        </a>
      }
    >
      <p className="mb-3 text-sm text-muted">A drawing app I built in plain JavaScript. Try it right here.</p>
      <iframe
        src={URL}
        title="Sketch Pad, an interactive drawing app"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        className="min-h-[460px] w-full flex-1 rounded-xl border border-line bg-white"
      />
    </Card>
  )
}
