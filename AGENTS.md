# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single static **Next.js 15 / React 19** personal portfolio site (package `sofiane-azogagh-portfolio`). There is no backend, database, or auxiliary service — the dev server is the only process needed to work end to end.

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Next.js dev server | `npm run dev` | 3000 | Only service; serves the whole site with hot reload. |

Standard scripts live in `package.json` (`dev`, `build`, `start`, `lint`).

### Non-obvious notes

- **Node 22** is expected (matches CI in `.github/workflows/deploy.yml`); the pinned `package-lock.json` uses `npm`.
- **`npm run lint` is not usable non-interactively.** No ESLint config is committed, so `next lint` drops into an interactive setup prompt and hangs. CI does not run lint (only `npm run build`), so treat lint as unconfigured rather than failing.
- `next build` performs a **static export** (`output: "export"` in `next.config.ts`) into `out/`; there is no server-side runtime.
- Content is **file-based**: `content/*.json` (profile, publications, teaching, talks) and `content/blog/*.md` (front-matter via `gray-matter`, rendered with `marked`). Adding a `content/blog/<slug>.md` file creates a new post at `/blog/<slug>/`.
- `content/blog/hello-world.md` is **gitignored** (see `.gitignore`), so it is safe to create locally as a smoke test without committing it.
