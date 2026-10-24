# Practices log

Running record of practices from the weekly AI research digest: what is in
force, what was rejected and why, what is still pending. Newest first, one line
each. This is the only place decisions live; the weekly reports do not repeat
them. Never deleted. The routine adds new items as `pending`; Matt changes the
status.

Status: `in force` (applied, with where), `rejected` (with the reason, so it
does not come back), `pending` (waiting on Matt), `noted` (worth remembering,
no change to the setup).

Entry format, one line each under a `## YYYY-MM-DD` heading (the date is when
it was raised): `- status | title | detail | where | source`. No pipes inside
a field. `research/practices-page.js` turns this file into the practices page,
so a line in any other shape stops the build.

## 2026-10-24

- pending | Trim what loads in every chat | Connectors are trimmed. Unused plugin skills (xlsx, pptx, pdf, docx, the browser skills) still load in every session. | Claude settings, not a repo file | Ben AI
- in force | Pick effort by task type | Low for retrieval and quick drafts, medium by default, high for verifying numbers or finished work, xhigh or max only for long unattended jobs. | claude/CLAUDE.md, Token cost | Ben AI
- in force | Hand off with a file; keep one model per chat | A handoff is a reviewed file plus a fresh chat, not /compact. Switching models mid-chat re-reads the whole chat at full price. Claims are from the video and unverified. | claude/CLAUDE.md, Reversals and long sessions | Duncan Rogoff
- noted | "Act like an expert" makes Claude role-play | Ask for the tools and methods a top practitioner in the field would use instead. Easy to try in client prompts. | Client prompts | Silicon Valley Girl
- noted | Single-question sub-agent councils | Each sub-agent asks one question and they debate in rounds. Agent teams cost more for little gain. The expert-panel skill already covers it. | skills/expert-panel | Nate Herk
- noted | Interview with Anthropic's Claude engineering lead | 49 minutes, not read. Watch it before relying on anything from it. | Watch yourself | Silicon Valley Girl
- noted | Adoption practices and a model comparison | Eight practices from Anthropic case studies, and Opus 5.5 vs Fable 5.1 on seven tasks (one tester, not a benchmark). | Client background | Ben AI

## 2026-10-21

- in force | Long-session handoff at about 250k tokens | A hook warns when the context is large and the cache is still warm, and the rule offers a handoff once. Applied Oct 22. | claude/CLAUDE.md, hooks/et-time.js | Ben AI
- in force | Build skills from best and worst real examples | Done as an audit of the voice skill only. Subject lines no longer need to be lowercase. Do not raise this again. | skills/personal-voice | Ben AI
- rejected | Require a concrete cause for review objections | The structural reviewer already requires a real, current cause. | agents/karpathy-structural-review.md | Simon Willison
- rejected | Name the check per risk instead of one human yes | You keep the blanket yes for risky changes. | claude/CLAUDE.md, Risky changes | Simon Willison
