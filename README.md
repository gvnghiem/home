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

## Repo traffic panel (optional)

The "Repo traffic" panel in *Currently Building* shows views, unique visitors and clones from GitHub.
GitHub only keeps 14 days, so `.github/workflows/traffic.yml` runs daily and stores a longer history on the
`traffic-data` branch (`scripts/collect-traffic.mjs`). The panel stays hidden until that file exists.

Setup: create a fine-grained personal access token for your account with read access to **Administration**
on the repos you want counted, save it as the repository secret `TRAFFIC_TOKEN`, then run the
*Collect repo traffic* workflow once from the Actions tab. Numbers cover GitHub repo pages and clones, not visits to the Pages site itself.
