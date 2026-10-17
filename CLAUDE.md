@AGENTS.md

## Claude Code

- Working directory: repository root (`/Users/anton/Desktop/Transfer/site` when cloned locally).
- After clone: `npm install`, then `npm run dev`.
- Use `/context` to confirm `CLAUDE.md`, `AGENTS.md`, and `.claude/rules/` loaded.
- Optional: run `/init` once to refine memory; it should extend, not replace, `AGENTS.md`.
- Personal overrides (URLs, deploy keys): put in gitignored `CLAUDE.local.md`, not in committed files.
- Do not commit secrets (`.env*`), `node_modules`, or `dist/`.
- When unsure about prior decisions, read `IMPLEMENTATION_STATUS.md` before large refactors.
