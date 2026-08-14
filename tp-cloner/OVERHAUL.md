# Vivacity site overhaul

Built inside `tp-cloner` (ai-website-cloner-template) with Temporary Perspective layout language + Vivacity infra positioning.

## Run

```bash
cd tp-cloner
npm install
npm run dev
```

Open http://localhost:3000

## Design source
- https://temporaryperspective.com/
- Screenshots in `docs/design-references/` (from `ex of tp`)

## Positioning
See `docs/research/VIVACITY_POSITIONING.md`

## Deploy
Point Vercel at `tp-cloner` (Next.js) or run `npm run build` and deploy `.next` output.
Existing static `signup.html` / `workspace.html` remain on the current Vercel project until migrated.
