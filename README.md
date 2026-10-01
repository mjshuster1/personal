# personal

Matt's working rules that hold in every project and every company: how he
writes, how drafts get cleaned up, how documents get reviewed. Plain
markdown, nothing tied to one model or tool.

## What's here

| skill | what it does |
|---|---|
| `skills/personal-voice/` | Matt's personal voice: stance (matter-of-fact, never from authority), tone, sentence rules, email openers, hard banned words, punctuation |
| `skills/de-slop/` | rewrites a draft to strip AI tells and pull it toward `personal-voice`, plus a company `voice.md` when the repo has one |
| `skills/document-review/` | reviews a document in four passes, always in this order: substance, slop, bloat, clarity |

Company voice stays with the company: Cuepri's `voice.md` and
`voice-samples/` live in `gtm-vault/vault/Cuepri/`, and layer on top of
`personal-voice`. Nothing in this repo may name a company, product,
customer, or industry.

## This repo is the only place to edit

Each skill folder uses the `SKILL.md` format (a markdown file with a short
name/description header). Any model can read it as plain markdown.

**Delivery to Claude:** each folder is zipped and uploaded to the claude.ai
account (Settings > Skills). That uploaded copy is what runs in cloud
sessions, local Claude Code sessions (synced to `~/.claude/skills/synced/`),
and Cowork. The upload is manual, so after any edit here:

1. Zip the changed skill folder.
2. Upload it in claude.ai Settings > Skills, replacing the old one.

A daily check in `master-orchestrator` (being added) compares the synced copies on Matt's
machine against this repo and flags any difference. Cloud sessions can run a
stale copy until that check catches it.

**No other copies.** Don't copy these files into other repos. If a repo needs
the voice, it loads the `personal-voice` skill.

**Delivery to another tool later:** point that tool at these same files
(its equivalent of global instructions or skills). Only the delivery step
changes.
