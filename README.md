# gvnghiem/home

Interactive Bento-box resume for Gau Nghiem — https://gvnghiem.github.io/home/

**Stack:** React 18 · Tailwind CSS v4 · Framer Motion · Three.js · Vite, deployed with GitHub Actions.

## Edit content
Everything on the page (bio, availability, case studies, experience, skills, projects) lives in [`src/data.ts`](src/data.ts).
- `availability.open` toggles the "open to opportunities" badge/card.
- `availability.scheduleUrl` — paste a Calendly/Cal.com link to show a "Book a call" button.
- Replace `public/Gau_Nghiem_Resume.pdf` to update the download.

## Develop
```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
```

## Deploy
Pushes to `main` run `.github/workflows/deploy.yml`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
