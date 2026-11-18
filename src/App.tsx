import { Moon, Sun } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Availability } from './components/Availability'
import { Building } from './components/Building'
import { CaseStudies } from './components/CaseStudies'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Playground } from './components/Playground'
import { Projects } from './components/Projects'
import { Credentials, Skills } from './components/Skills'
import { Stats } from './components/Stats'
import { Terminal } from './components/Terminal'
import { profile } from './data'

type Theme = 'dark' | 'light'

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.classList.contains('light') ? 'light' : 'dark'))

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next: Theme = t === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('light', next === 'light')
      try {
        localStorage.setItem('theme', next)
      } catch {
        /* storage unavailable */
      }
      return next
    })
  }, [])

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6">
      <header className="mb-5 flex items-center justify-between">
        <span className="font-mono text-lg font-medium tracking-tight">
          {profile.githubUser}
          <span className="text-muted">/home</span>
        </span>
        <button
          onClick={toggle}
          className="btn !rounded-full !p-2"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      <main className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Hero />
        <div className="grid min-w-0 content-start gap-4 lg:col-span-8">
          <Stats />
          <Projects />
        </div>

        <CaseStudies />
        <div className="grid min-w-0 content-start gap-4 lg:col-span-4">
          <Building />
          <Availability />
        </div>

        <Experience />
        <div className="grid min-w-0 content-start gap-4 lg:col-span-5">
          <Skills />
          <Credentials />
        </div>

        <Playground />
        <Terminal onToggleTheme={toggle} />
      </main>

      <footer className="mt-10 text-center text-xs text-muted">
        © {new Date().getFullYear()} {profile.name} · Built with React, Tailwind, Framer Motion & Three.js
      </footer>
    </div>
  )
}
