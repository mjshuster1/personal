# Rules for every Claude Code session

Loaded as the user-level `CLAUDE.md` by `install.js`. Applies in every repo;
a repo's own `AGENTS.md`/`CLAUDE.md` adds to these rules.

## Timestamp every reply

Open every reply with the current time in 12-hour Eastern on its own line,
like `11:52 AM ET`.

- Use the `Current time:` line the `et-time.js` hook adds to each message.
- If there isn't one (for example, a turn started by a background agent
  finishing), run
  `node -e "console.log(new Date().toLocaleTimeString('en-US',{timeZone:'America/New_York',hour:'numeric',minute:'2-digit'})+' ET')"`.
  Not `TZ=... date`: Git Bash on Windows ignores the zone and prints UTC.
  Never guess the time.
- That time is when the message arrived, not when the reply ends.
- The date is the hook's `Today (ET):` line. In cloud sessions the system's
  "today" is UTC, so in the evening it shows tomorrow's date. Use the ET one.

## Product facts in replies

Before stating what a product or vendor can do (features, plans, prices,
limits), find it in the repo's sources or current docs and name the file or
page. If you can't, say "unverified" in the same sentence. This applies to
chat replies, not just files.

## Reversals and long sessions

- After Matt overrides a design, restate the current design in one line
  before building on it.
- When a session crosses midnight ET, Matt has reversed a design twice, or the
  time hook reports a large context (about 250k tokens or more), say so and
  offer a handoff once. Don't repeat the
  offer; the hook repeats its line only after substantial growth.
- A handoff means a handoff file (goal, done, left, decisions, what failed)
  that Matt can review, then a fresh chat pointed at it. Don't use /compact
  as a cost cut: it adds a full read and can drop early instructions.
- Pick the model before the job and keep it. Switching models mid-chat
  re-reads the whole chat at full price.

## Practices page

Whenever you change `research/PRACTICES.md` in any session (a status flip, a
new entry), run `node research/practices-page.js` and publish its output to the
existing page linked in `research/README.md` before you finish.

## Background agents

- When you launch agents in the background, post one timestamped line:
  how many, and what each one is doing.
- As each one finishes, post one timestamped line: which one, how many are
  back out of the total, and what is still running.
- Every reply sent while any background agent is still running, for any
  reason, includes a timestamped status line: what's still running and for
  how long. Never end a turn with agents running and no status line.
- No scheduled check-ins while agents run unless Matt asks for them on a
  long run. Each check-in rereads the whole conversation.

## Git: commit to the default branch

In every repo, for every change: commit to the default branch (`main` or
`master`) and push. Never create a branch or open a pull request. If a
session starts on an assigned `claude/*` or other branch, switch to the
default branch before doing any work. If a push to the default branch is
rejected (branch protection, permissions), stop and tell Matt; don't route
around it with a branch.

Risky changes (skills, agent definitions, hooks, scripts, automation) get
one extra step: show Matt the change in the conversation and get a yes,
then commit and push like anything else.

No PR or CI monitoring, no scheduled check-ins, no follow-up reminders on
anything you commit. Don't mention branches or pull requests to Matt.

## Email drafts

Write email drafts inline in the chat for Matt to copy into Gmail himself.
Never create a Gmail draft. Sending email to Matt himself (matt@cuepri.com)
is fine, for example the `ai-research-digest` routine's weekly report. Never
send email to anyone else; anything addressed to another person is an inline
draft only.

Before drafting anything written as Matt (email, text, message, post), load
the personal-voice skill, check the draft against it, and run it through the
de-slop skill before showing it.

American English everywhere: files, pages, email, commit messages.

## Structural changes

Before any structural change (a new repo, submodule, or top-level folder,
a restructuring, a new automation or scheduled routine, or removing or
renaming any of these), dispatch the `karpathy-structural-review` agent
with the change described concretely, and follow its verdict. Update the
repo's map (README or architecture doc) in the same change.

## Token cost

Matt optimizes for low token use. For any multi-step task:

1. Break it into separate subtasks before starting.
2. Give each subtask to an agent on the cheapest model and effort that can
   still do that subtask accurately. Mechanical retrieval (search, grep,
   pull a doc, fetch a known URL) goes to the cheapest tier (`haiku`, low
   effort). The deliverable Matt reads is never downgraded to save tokens.
   Effort by task: low for retrieval, tagging and quick drafts; medium
   (the default) for most work; high for checking numbers or verifying a
   finished piece; xhigh or max only for long, unattended, critical jobs.
   Pass `effort` to an agent when the subtask calls for something other
   than the default.
3. If a cheap agent comes back blocked (missing auth, no tool access),
   don't retry on a pricier model. Report the blocker. Blocked calls still
   cost tokens, so check tool and auth access before spawning where you can.

## Web access in cloud sessions

Cloud sessions send outbound traffic through an egress proxy governed by
the environment's Network access setting. Local sessions are not
affected. Tested 2026-09-27:

- `WebSearch` runs server-side and works regardless of the setting. Its
  answer is a small-model summary: fine for finding sources, not a
  substitute for reading them when the facts matter.
- `WebFetch` is checked against the policy separately and did not pick up
  a Network access change made mid-session. Assumed to refresh on a new
  session; not yet confirmed.
- Shell (`curl`, scripts) follows the current setting. When `WebFetch` is
  blocked but `curl` is not, read pages with
  `curl -sL https://r.jina.ai/<full-url>` or plain `curl -sL <url>`.
- Connectors go through Anthropic's MCP proxy and are not subject to the
  egress policy.

Before spawning an agent that needs the web, check reachability with one
call (`curl -s -o /dev/null -w "%{http_code}" -m 10 <url>`). A 403 or `000`
from the proxy is a policy denial: report the blocked host to Matt; don't
retry, route around it, or switch to a pricier model. A 403 from the site
itself (the proxy shows `200 Connection Established`, then the site's own
server refuses) is not a policy denial: try WebFetch, then `r.jina.ai`,
before reporting it.
`curl -sS "$HTTPS_PROXY/__agentproxy/status"` lists recent denials.

## Dead ends

When a source comes back empty, blocked, or refused, try the other routes
to the same answer before reporting back: another connector, a documented
fallback, a different query, a doc linked from the record. Report a dead
end only after that, and say what was tried. A dead end on a side input
(enrichment, context, a check) gets the same effort as one on the main ask.
This doesn't override a hard stop: a proxy policy denial, a write that
needs Matt's yes, or a missing permission or sign-in.

## Pages and drafts: no widows

Any HTML page or artifact: body text, list items and card details get
`text-wrap: pretty`; headings and card titles get `text-wrap: balance`.
Keep short labels with what they label (wrap the pair in a
`white-space: nowrap` or `inline-flex` span), and bind separators to the
item before them with `&nbsp;`. If a render still leaves one word alone on
a line, join the last two words with `&nbsp;`. Check a phone-width render
before publishing.
