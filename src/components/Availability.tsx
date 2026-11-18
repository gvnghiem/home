import { CalendarCheck, MapPin, Mail } from 'lucide-react'
import { Linkedin } from './BrandIcons'
import { Card } from './Card'
import { availability, email, profile } from '../data'

export function Availability() {
  return (
    <Card title="Availability" icon={<CalendarCheck size={18} />} accent="violet" delay={0.1}>
      <p className="flex items-center gap-2 text-sm">
        <span
          className={`h-2.5 w-2.5 rounded-full ${availability.open ? 'bg-green' : 'bg-amber'}`}
          style={availability.open ? { boxShadow: '0 0 10px var(--green)' } : undefined}
          aria-hidden
        />
        <span className="font-medium">{availability.open ? availability.status : 'Not currently looking'}</span>
      </p>
      {availability.open && (
        <>
          <p className="mt-2 flex items-start gap-2 text-sm text-muted">
            <MapPin size={15} className="mt-0.5 shrink-0" /> {availability.location}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted">
            {availability.roles.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-[color:var(--a)]">▸</span> {r}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-4 grid gap-2">
        {availability.scheduleUrl && (
          <a className="btn btn-primary" href={availability.scheduleUrl} target="_blank" rel="noreferrer">
            <CalendarCheck size={16} /> Book a call
          </a>
        )}
        <a className={availability.scheduleUrl ? 'btn' : 'btn btn-primary'} href={`mailto:${email()}?subject=Opportunity%20for%20Gau`}>
          <Mail size={16} /> Email me
        </a>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
          <Linkedin size={16} /> Message on LinkedIn
        </a>
      </div>
    </Card>
  )
}
