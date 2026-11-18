import { Box, Minus, Pause, Play, Plus, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Card } from './Card'

const SHAPES = ['Icosphere', 'Torus knot', 'Lattice cube'] as const
type Shape = (typeof SHAPES)[number]

function buildGeometry(shape: Shape): THREE.BufferGeometry {
  switch (shape) {
    case 'Icosphere':
      return new THREE.IcosahedronGeometry(1.25, 2)
    case 'Torus knot':
      return new THREE.TorusKnotGeometry(0.85, 0.3, 140, 14)
    default:
      return new THREE.BoxGeometry(1.8, 1.8, 1.8, 6, 6, 6)
  }
}

export function Playground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<{ zoom: (d: number) => void; reset: () => void; setShape: (s: Shape) => void; setAuto: (a: boolean) => void } | null>(null)
  const [shape, setShape] = useState<Shape>('Icosphere')
  const [auto, setAuto] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [unsupported, setUnsupported] = useState(false)
  const autoRef = useRef(auto)
  autoRef.current = auto

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      setUnsupported(true)
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.touchAction = 'pan-y' // vertical swipes still scroll the page
    renderer.domElement.style.cursor = 'grab'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50)
    const DEFAULT_Z = 4.6
    camera.position.z = DEFAULT_Z

    const light = document.documentElement.classList.contains('light')
    const lineColor = new THREE.Color(light ? 0x0891b2 : 0x22d3ee)
    const dotColor = new THREE.Color(light ? 0x7c3aed : 0xa78bfa)

    const group = new THREE.Group()
    scene.add(group)
    const lineMat = new THREE.LineBasicMaterial({ color: lineColor, transparent: true, opacity: 0.75 })
    const dotMat = new THREE.PointsMaterial({ color: dotColor, size: 0.035, sizeAttenuation: true })

    function setShapeInternal(s: Shape) {
      while (group.children.length) {
        const c = group.children.pop() as THREE.Object3D & { geometry?: THREE.BufferGeometry }
        c.geometry?.dispose()
      }
      const geo = buildGeometry(s)
      group.add(new THREE.LineSegments(new THREE.WireframeGeometry(geo), lineMat))
      group.add(new THREE.Points(geo, dotMat))
    }
    setShapeInternal('Icosphere')

    // Drag-to-rotate with a little inertia.
    let dragging = false
    let lastX = 0
    let lastY = 0
    let vx = 0
    let vy = 0
    const dom = renderer.domElement
    const down = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      dom.setPointerCapture(e.pointerId)
      dom.style.cursor = 'grabbing'
    }
    const move = (e: PointerEvent) => {
      if (!dragging) return
      vy = (e.clientX - lastX) * 0.01
      vx = (e.clientY - lastY) * 0.01
      group.rotation.y += vy
      group.rotation.x += vx
      lastX = e.clientX
      lastY = e.clientY
    }
    const up = (e: PointerEvent) => {
      dragging = false
      if (dom.hasPointerCapture(e.pointerId)) dom.releasePointerCapture(e.pointerId)
      dom.style.cursor = 'grab'
    }
    dom.addEventListener('pointerdown', down)
    dom.addEventListener('pointermove', move)
    dom.addEventListener('pointerup', up)
    dom.addEventListener('pointercancel', up)

    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      renderer.setSize(w, h, false)
      dom.style.width = '100%'
      dom.style.height = '100%'
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    // Only render while the card is on screen.
    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(el)

    let targetZ = DEFAULT_Z
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      if (!dragging) {
        group.rotation.y += vy
        group.rotation.x += vx
        vx *= 0.94
        vy *= 0.94
        if (autoRef.current) group.rotation.y += 0.004
      }
      camera.position.z += (targetZ - camera.position.z) * 0.12
      renderer.render(scene, camera)
    }
    tick()

    apiRef.current = {
      zoom: (d) => (targetZ = Math.min(8, Math.max(2.6, targetZ + d))),
      reset: () => {
        targetZ = DEFAULT_Z
        vx = vy = 0
        group.rotation.set(0.3, 0.5, 0)
      },
      setShape: setShapeInternal,
      setAuto: () => {},
    }
    group.rotation.set(0.3, 0.5, 0)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      dom.removeEventListener('pointerdown', down)
      dom.removeEventListener('pointermove', move)
      dom.removeEventListener('pointerup', up)
      dom.removeEventListener('pointercancel', up)
      group.children.forEach((c) => (c as THREE.Mesh).geometry?.dispose())
      lineMat.dispose()
      dotMat.dispose()
      renderer.dispose()
      dom.remove()
      apiRef.current = null
    }
  }, [])

  useEffect(() => {
    apiRef.current?.setShape(shape)
  }, [shape])

  return (
    <Card title="3D Playground" icon={<Box size={18} />} accent="cyan" delay={0.05} className="lg:col-span-4 flex flex-col">
      <div className="relative min-h-[240px] flex-1 overflow-hidden rounded-xl border border-line bg-card2">
        <div ref={mountRef} className="absolute inset-0" role="img" aria-label="Interactive 3D wireframe. Drag to rotate." />
        {unsupported && (
          <div className="absolute inset-0 grid place-items-center p-4 text-center text-sm text-muted">
            WebGL isn’t available in this browser, so the 3D demo is switched off.
          </div>
        )}
        <span className="pointer-events-none absolute bottom-2 left-3 text-[11px] text-muted">drag to rotate</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1" role="group" aria-label="Shape">
          {SHAPES.map((s) => (
            <button
              key={s}
              onClick={() => setShape(s)}
              aria-pressed={shape === s}
              className="btn !rounded-full !px-2.5 !py-1 !text-xs"
              style={shape === s ? { background: 'color-mix(in srgb, var(--a) 18%, var(--card-2))', borderColor: 'var(--a)' } : undefined}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <button className="btn !p-1.5" onClick={() => apiRef.current?.zoom(-0.6)} aria-label="Zoom in">
            <Plus size={15} />
          </button>
          <button className="btn !p-1.5" onClick={() => apiRef.current?.zoom(0.6)} aria-label="Zoom out">
            <Minus size={15} />
          </button>
          <button className="btn !p-1.5" onClick={() => setAuto((a) => !a)} aria-label={auto ? 'Pause auto-rotate' : 'Start auto-rotate'}>
            {auto ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button className="btn !p-1.5" onClick={() => apiRef.current?.reset()} aria-label="Reset view">
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
    </Card>
  )
}
