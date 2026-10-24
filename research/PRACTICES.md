# Practices log

Running record of practices from the weekly AI research digest: what is in
force, what was rejected and why, what is still pending. Newest first, one line
each. This is the only place decisions live; the weekly reports do not repeat
them. Never deleted. The routine adds new items as `pending`; Matt changes the
status.

Status: `in force` (applied, with where), `rejected` (with the reason, so it
does not come back), `pending` (waiting on Matt), `noted` (worth remembering,
no change to the setup).

## 2026-10-24

- in force: Pick effort by task type (low retrieval and drafts, medium default, high for verification, xhigh or max only for long unattended jobs). `claude/CLAUDE.md` Token cost. Source: 2026-10-24, Ben AI.
- in force: A handoff is a reviewed handoff file plus a fresh chat, not /compact; pick the model before the job and keep it (switching re-reads the chat at full price). `claude/CLAUDE.md` Reversals and long sessions. Source: 2026-10-24, Duncan Rogoff. Claims unverified.
- pending: Trim what loads in every chat. Connectors are trimmed; unused plugin skills (xlsx, pptx, pdf, docx, browser skills) still load. Setup change, not a repo file. Source: 2026-10-24, Ben AI.
- noted: "Act like an expert" prompts make Claude role-play; ask for the tools and methods a top practitioner uses. Use in client prompts. Source: 2026-10-24, Silicon Valley Girl.
- noted: Single-question sub-agent councils; agent teams cost more for little gain. `skills/expert-panel` already covers it. Source: 2026-10-24, Nate Herk.
- noted: Interview with Anthropic's Claude engineering lead (49 min), not read; watch before relying on it. Source: 2026-10-24, Silicon Valley Girl.
- noted: Eight adoption practices from Anthropic case studies; Opus 5.5 vs Fable 5.1 on seven tasks (one tester, not a benchmark). Source: 2026-10-24, Ben AI.

## 2026-10-21

- in force: Long-session handoff trigger at about 250k tokens, plus a hook warning when context is large and the cache is warm. `claude/CLAUDE.md`, `hooks/et-time.js`, applied 2026-10-22. Source: 2026-10-21, Ben AI.
- in force: Build skills from best and worst real examples, tagged seen/inferred/unknown. Done as an audit of `skills/personal-voice` only; subject lines no longer need lowercase. Do not resurface. Source: 2026-10-21, Ben AI.
- rejected: Require a concrete cause for review objections. `agents/karpathy-structural-review.md` already requires a real, current cause. Source: 2026-10-21, Simon Willison.
- rejected: Name the check per risk instead of one human yes for risky changes. Matt keeps the blanket yes. Source: 2026-10-21, Simon Willison.
