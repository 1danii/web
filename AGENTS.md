## Cursor Cloud specific instructions

This is a single-service Astro static portfolio site (dani.pw). No databases, backend APIs, or Docker required.

**Runtime:** Bun (matches `bun.lock`). Installed to `~/.bun/bin/bun` via `curl -fsSL https://bun.sh/install | bash`.

**Dev server:** `bun run dev` starts Astro at `localhost:4321`.

**Commands** (see `package.json` scripts and `README.md` for full list):
- Lint/type-check: `bun run astro check`
- Build: `bun run astro build` (the `build` script runs `astro check && astro build`, which currently fails due to a pre-existing unused `@ts-expect-error` in `astro.config.mjs`)
- Dev: `bun run dev`
- Preview: `bun run preview`

**Known issue:** `astro check` reports 1 error (`ts(2578)` — unused `@ts-expect-error` directive in `astro.config.mjs`) and 3 warnings (unused imports in `fade-in.tsx` and `accordions.tsx`). These are pre-existing and do not affect the dev server or static build.

**Bun PATH:** After the update script installs Bun, its binary is at `~/.bun/bin/bun`. The install script adds it to `~/.bashrc`. If `bun` is not on PATH in a new shell, run `export PATH="$HOME/.bun/bin:$PATH"`.
