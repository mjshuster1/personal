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
name/description header). Any model can read it as plain markdown. Don't
copy these files into other repos; if a repo needs the voice, it loads the
`personal-voice` skill.

## How the skills reach sessions

Claude Code loads any skill folder in `~/.claude/skills/`, in cloud and
local sessions alike. Both routes below put this repo's skills there
straight from git, so there is nothing to upload and nothing to drift.

**Cloud sessions.** The cloud environment's setup script (environment
settings > Setup script) downloads this repo through the GitHub API at
session start and copies `skills/` into `~/.claude/skills/`. Auth is an
environment API credential: Bearer, allowed website `api.github.com` only,
holding a fine-grained token with read-only Contents access to this repo.
Sessions never see the token. The script writes what it loaded to
`~/.claude/skills/.personal-skills` and never fails the setup. Verified
2026-10-01: a fresh session in the Default environment loaded all three
skills from commit `ed6f49e`.

Don't widen the credential to `github.com`: that would put this token on
every session's normal git traffic.

```bash
#!/bin/bash
# Personal skills from mjshuster1/personal. Never fails the setup.
# Auth comes from the environment's API credential for api.github.com.
mkdir -p "$HOME/.claude/skills"
d="$(mktemp -d)"
code=$(curl -sL -m 60 -o "$d/p.tgz" -w '%{http_code}' -H 'Accept: application/vnd.github+json' https://api.github.com/repos/mjshuster1/personal/tarball/main)
if [ "$code" = "200" ] && tar -xzf "$d/p.tgz" -C "$d" && cp -r "$d"/mjshuster1-personal-*/skills/. "$HOME/.claude/skills/"; then
  echo "loaded $(cd "$d" && ls -d mjshuster1-personal-*) $(date -u +%FT%TZ)" > "$HOME/.claude/skills/.personal-skills"
else
  echo "failed http=$code $(date -u +%FT%TZ)" > "$HOME/.claude/skills/.personal-skills"
fi
rm -rf "$d"
exit 0
```

**Local sessions (Windows).** Clone this repo to
`C:\Users\mjshu\Dev\AI_OS\personal`, then link each skill into
`~/.claude/skills/` once:

```bat
for %s in (personal-voice de-slop document-review) do mklink /J "%USERPROFILE%\.claude\skills\%s" "C:\Users\mjshu\Dev\AI_OS\personal\skills\%s"
```

A new skill folder needs its own link. A `git pull` in the clone updates
every local session. The pull will be added to the daily scheduled task; until then, pull by hand.

**Cowork and claude.ai chat** only read skills uploaded to the claude.ai
account (Settings > Skills). Upload a zip of a skill folder there only if
it's needed in those two places, and re-upload after edits. Nothing checks
that copy.
