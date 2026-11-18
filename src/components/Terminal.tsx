import { TerminalSquare } from 'lucide-react'
import { useRef, useState } from 'react'
import { Card } from './Card'
import { availability, credentials, email, experience, profile, projects, skills } from '../data'

type Line = { kind: 'in' | 'out'; text: string }

const HELP = [
  'about        who I am',
  'skills       technical skills',
  'experience   where I’ve worked',
  'projects     things I’ve built',
  'education    degrees & certifications',
  'contact      how to reach me',
  'resume       download the PDF',
  'theme        toggle light/dark',
  'clear        clear the screen',
].join('\n')

export function Terminal({ onToggleTheme }: { onToggleTheme: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: 'Welcome. Type `help` to see commands.' },
  ])
  const [value, setValue] = useState('')
  const history = useRef<string[]>([])
  const hIndex = useRef(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  function run(raw: string): string | null {
    const cmd = raw.trim().toLowerCase()
    switch (cmd) {
      case '':
        return ''
      case 'help':
        return HELP
      case 'about':
      case 'whoami':
        return `${profile.name} — ${profile.title}\n${profile.summary}`
      case 'skills':
        return skills.map((g) => `${g.group}: ${g.items.join(', ')}`).join('\n')
      case 'experience':
        return experience.map((e) => `${e.when.padEnd(22)} ${e.role} @ ${e.company}`).join('\n')
      case 'projects':
        return projects.map((p) => `${p.name} — ${p.url}`).join('\n')
      case 'education':
        return [...credentials.education, ...credentials.certs].map((c) => `${c.when.padEnd(14)} ${c.name} (${c.org})`).join('\n')
      case 'contact':
        return `email:    ${email()}\ngithub:   ${profile.github}\nlinkedin: ${profile.linkedin}\nlocation: ${availability.location}`
      case 'resume': {
        const a = document.createElement('a')
        a.href = `${import.meta.env.BASE_URL}${profile.resumePdf}`
        a.download = profile.resumePdf
        a.click()
        return 'Downloading resume…'
      }
      case 'theme':
        onToggleTheme()
        return 'Theme toggled.'
      case 'sudo hire gau':
        return 'Permission granted. Offer letter pending… (email me!)'
      default:
        return `command not found: ${cmd}. Try \`help\`.`
    }
  }

  function submit() {
    const raw = value
    setValue('')
    hIndex.current = -1
    if (raw.trim().toLowerCase() === 'clear') {
      setLines([])
      return
    }
    if (raw.trim()) history.current.unshift(raw)
    const out = run(raw)
    setLines((l) => [...l, { kind: 'in', text: raw }, ...(out ? [{ kind: 'out' as const, text: out }] : [])])
    requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight }))
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submit()
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      hIndex.current = Math.min(hIndex.current + 1, history.current.length - 1)
      setValue(history.current[hIndex.current] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      hIndex.current = Math.max(hIndex.current - 1, -1)
      setValue(hIndex.current === -1 ? '' : history.current[hIndex.current])
    }
  }

  return (
    <Card title="Live CLI" icon={<TerminalSquare size={18} />} accent="green" delay={0.1} className="flex flex-col lg:col-span-12">
      <div
        className="flex flex-1 flex-col rounded-xl border border-line bg-[#070910] p-3 font-mono text-[13px] leading-relaxed text-[#d7dcea]"
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
      >
        <div ref={scrollRef} className="min-h-40 flex-1 overflow-y-auto" aria-live="polite">
          {lines.map((l, i) =>
            l.kind === 'in' ? (
              <div key={i}>
                <span className="text-[#34d399]">$</span> {l.text}
              </div>
            ) : (
              <pre key={i} className="m-0 whitespace-pre-wrap break-words font-[inherit] text-[#aeb6cc]">
                {l.text}
              </pre>
            ),
          )}
        </div>
        <label className="mt-1 flex items-center gap-2">
          <span className="text-[#34d399]">$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Terminal command"
            placeholder="try: help, about, skills, contact"
            className="min-w-0 flex-1 bg-transparent text-[#d7dcea] outline-none placeholder:text-[#5b6480]"
          />
        </label>
      </div>
    </Card>
  )
}
