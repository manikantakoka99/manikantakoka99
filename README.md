# Manikanta — Cybersecurity Portfolio

Personal cybersecurity workstation portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide**.

Identity: `root@manikanta:~$`

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GITHUB_USERNAME` | Public GitHub username for live repo/activity fetch |
| `NEXT_PUBLIC_LINKEDIN_URL` | Optional LinkedIn URL override |
| `NEXT_PUBLIC_EMAIL` | Optional email override |

## Assets

Place source files under `public/assets/`:

- `sc-200-certificate.png`
- `attack-surface-enumeration.pdf`
- `irctc-gap-assessment.pdf`
- `resume.pdf` (optional)

The UI degrades gracefully when assets are missing.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm start
```

## Notes

- Terminal and `ssh github` are **website abstractions** — no real shell execution.
- SOC simulation and attack-path animations are labeled **PORTFOLIO SIMULATION** / **SIMULATED VISUALIZATION**.
- Attack Surface is framed as **public reconnaissance / security research**.
