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

## Background agents

- When you launch agents in the background, post one timestamped line:
  how many, and what each one is doing.
- As each one finishes, post one timestamped line: which one, how many are
  back out of the total, and what is still running.
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

## Token cost

Matt optimizes for low token use. For any multi-step task:

1. Break it into separate subtasks before starting.
2. Give each subtask to an agent on the cheapest model and effort that can
   still do that subtask accurately. Mechanical retrieval (search, grep,
   pull a doc, fetch a known URL) goes to the cheapest tier (`haiku`, low
   effort). The deliverable Matt reads is never downgraded to save tokens.
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
is a policy denial: report the blocked host to Matt; don't retry, route
around it, or switch to a pricier model.
`curl -sS "$HTTPS_PROXY/__agentproxy/status"` lists recent denials.
