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
settings > Setup script) clones this repo at session start and copies
`skills/` into `~/.claude/skills/`. It needs a read-only GitHub token for
this one repo in the environment variable `PERSONAL_SKILLS_TOKEN`. It writes
the commit it loaded to `~/.claude/skills/.personal-skills`, and never fails
the setup if the clone fails.

```bash
# Personal skills from mjshuster1/personal. Never fails the setup.
if [ -n "${PERSONAL_SKILLS_TOKEN:-}" ]; then
  mkdir -p "$HOME/.claude/skills"
  d="$(mktemp -d)"
  if git clone -q --depth 1 "https://x-access-token:${PERSONAL_SKILLS_TOKEN}@github.com/mjshuster1/personal" "$d/personal"; then
    cp -r "$d/personal/skills/." "$HOME/.claude/skills/"
    git -C "$d/personal" log -1 --format='%h %cI' > "$HOME/.claude/skills/.personal-skills"
  else
    echo "clone failed" > "$HOME/.claude/skills/.personal-skills"
  fi
  rm -rf "$d"
fi
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
