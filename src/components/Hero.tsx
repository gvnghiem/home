import { Download, Mail } from 'lucide-react'
import { Github, Linkedin } from './BrandIcons'
import { Card } from './Card'
import { availability, email, profile } from '../data'

export function Hero() {
  const resumeHref = `${import.meta.env.BASE_URL}${profile.resumePdf}`
  return (
    <Card accent="violet" label="Introduction" className="flex flex-col items-center text-center lg:col-span-4">
      <img
        src={`${import.meta.env.BASE_URL}avatar.jpg`}
        alt="Illustrated portrait of Gau Nghiem"
        width={96}
        height={96}
        className="mb-3 h-24 w-24 rounded-full object-cover"
        style={{ boxShadow: '0 0 0 4px var(--card), 0 0 0 6px color-mix(in srgb, var(--violet) 60%, transparent)' }}
      />
      <h1 className="text-3xl font-extrabold tracking-tight">{profile.name.toUpperCase()}</h1>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5" aria-label="Engineer in">
        <span className="text-xs font-semibold text-muted">Engineer in:</span>
        {profile.engineerIn.map((e) => (
          <span key={e} className="chip" style={{ ['--a' as string]: 'var(--violet)' }}>
            {e}
          </span>
        ))}
      </div>
      {availability.open && (
        <span className="chip mt-3" style={{ ['--a' as string]: 'var(--green)' }}>
          <span className="h-2 w-2 rounded-full bg-green" aria-hidden /> {availability.status}
        </span>
      )}
      <p className="mt-4 text-sm leading-relaxed text-muted">{profile.summary}</p>

      <a className="btn btn-primary mt-5 w-full" href={resumeHref} download>
        <Download size={16} /> Download PDF Resume
      </a>
      <div className="mt-2 grid w-full grid-cols-3 gap-2">
        <a className="btn" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
          <Github size={16} /> <span className="hidden sm:inline">GitHub</span>
        </a>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
          <Linkedin size={16} /> <span className="hidden sm:inline">LinkedIn</span>
        </a>
        <a className="btn" href={`mailto:${email()}`} aria-label="Send email">
          <Mail size={16} /> <span className="hidden sm:inline">Email</span>
        </a>
      </div>
    </Card>
  )
}
