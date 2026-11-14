# Rules for every Claude Code session

Loaded as the user-level `CLAUDE.md` by `install.js`. Applies in every repo;
a repo's own `AGENTS.md`/`CLAUDE.md` adds to these rules.

## Timestamp every reply

Open every reply with the current time in 12-hour Eastern, followed by the
Eastern date, on its own line, like `11:52 AM ET, Mon Oct 26, 2026`.

- Use the `Current time:` line the `et-time.js` hook adds to each message.
- If there isn't one (for example, a turn started by a background agent
  finishing), run
  `node -e "const o={timeZone:'America/New_York'};const d=new Date();console.log(d.toLocaleTimeString('en-US',{...o,hour:'numeric',minute:'2-digit'})+' ET, '+d.toLocaleDateString('en-US',{...o,weekday:'short',month:'short',day:'numeric',year:'numeric'}).replace(/^(\\w+), /,'\$1 '))"`.
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
- When the time hook reports a large context (about 400k tokens or more),
  write the handoff file now (where: see Handoff files below), tell Matt the
  path in one line, then paste the file's Kickstart prompt in a copy-paste
  block in that same reply (the file keeps a copy; the reply always shows
  it). Don't ask first: the cache is warm now and cold
  tomorrow. The hook repeats its line only after substantial growth;
  overwrite the same file then.
- After 10 PM ET, once per session, at the end of a finished task, paste a
  Kickstart prompt in a copy-paste block so tomorrow starts fresh instead
  of reheating a cold chat; write a handoff file too only if work is left
  unfinished. When Matt has reversed a design twice, say so and offer a
  handoff once.
- Handoff files: they go in the repo the session is in, not in `personal`. Use
  that repo's documented handoff convention if it has one (in its AGENTS.md,
  CLAUDE.md or README), even over the hook's path;
  otherwise use `handoffs/` at the repo root, as the hook says. If that
  folder is new, add one line for it to the repo's README map in the same
  commit.
- A session that starts from a handoff file deletes it once the work is picked
  up, and commits the delete.
- A handoff means a handoff file (goal, done, left, decisions, what failed)
  and a Kickstart prompt that Matt pastes into a new top-level session. A
  session never starts its own successor with `create_session`: each one
  files the new session under the one that started it, and a chain of
  handoffs hit a limit at 8 on Nov 13 (observed, not documented). `create_session` is only for a lead starting its children.
  The Kickstart prompt names the title the new session should get, and
  the new session's first action is to set it on itself with
  `set_session_title` (a session Matt starts gets an auto title from the
  prompt otherwise).
- Work that needs more than one session gets a lead session. The lead keeps
  the plan in `handoffs/lead-<topic>.md` (or in the repo's documented
  handoff folder, if it has one) and does none of the work. For each step it
  posts the brief (goal, steps, what done means), then starts a child with
  that brief, on the model and effort the step needs (Token cost), passing
  the child's title to `create_session` as `title`. Children
  that touch the same logic run one at a time. A child ends by sending the
  lead a report in the handoff fields with `send_message`. The lead updates
  and commits the plan, then starts the next child. Once a child's report
  is in, its work is pushed, and nothing in it waits on Matt, the lead
  archives it with `archive_session`. A child stops before a
  risky change or deploy and asks Matt in its own session; a yes passed
  along by the lead doesn't count. Post timestamped lines when each child
  starts and reports, as for background agents; if a child is quiet well
  past its expected time, tell Matt. When the lead's own context is large,
  it writes its handoff into the plan file, listing each running child's
  session id, and pastes the Kickstart prompt for the next lead. Once the
  successor has taken over, it archives the old lead with
  `archive_session` and messages each running child its own session id so
  reports come to it. Don't use /compact as a cost cut: it adds a full
  read and can drop early instructions.
- Session names, the same in every repo:
  - Lead: `Lead N: <topic>`, where `<topic>` matches the plan file name
    and N counts leads per plan file. The plan file's section for that
    lead is headed `## Lead N`.
  - Child: `Child N.M: <step>`, M counting the children of Lead N. The
    status block row for that child uses `N.M <step>`.
  - Exactly these forms: the label, a space, the numbers, a colon, a
    space, then the name. Not "(lead 2)", "Lead 2 -" or "Buyer sim step
    11:". Child titles leave the topic out because children are filed
    under their lead.
- How a lead works with Matt and its children:
  - Questions to Matt one at a time: recommendation first, plain words,
    lettered options with the recommended one marked. If he answers "A"
    with several open, take it for the latest and ask the next.
  - Before saying a child waits on Matt, check it with `get_session` (and
    `list_events` if its summary looks stale); never infer it from silence.
  - Every brief tells the child to hold its turn with a foreground wait
    loop during long runs (full e2e, deploy gates): a cloud container
    restarts when the turn goes idle and kills detached runs.
  - A handoff file points to these rules instead of restating them, so
    nothing drops between leads; it adds only what is specific to the
    plan.
- Pick the model before the job and keep it. Switching models mid-chat
  re-reads the whole chat at full price.

## Practices page

Whenever you change `research/PRACTICES.md` in any session (a status flip, a
new entry), run `node research/practices-page.js` and publish its output to the
existing page linked in `research/README.md` before you finish. Every `pending` and
`noted` entry needs a `how` field: two to five steps with the exact file, command or
wording, so Matt can follow it without opening the source. The title states the practice; `where` and `how` say where it
applies, so one practice reads the same wherever it is applied.

## Background agents

- When you launch agents in the background, post one timestamped line:
  how many, and what each one is doing.
- As each one finishes, post one timestamped line: which one, how many are
  back out of the total, and what is still running.
- Every reply sent while any background agent or child session is still
  running, for any reason (Matt's message, an agent finishing, a child's
  report, a notification), ends with a status block in exactly this shape,
  in a code block so it lines up. Never end a turn with anything running
  and no status block.

  ```
  Status (11:15 AM ET):
  2.3 Deck pay     ▓░░░░  reading           0 min
  2.2 Growth view  ▓▓▓░░  testing          12 min
  2.1 Merge stage  ▓▓▓▓░  waiting on you   89 min  (approve the copy.js change in its own session)
  ```

  One row each: a short name (`N.M <step>` for a child session), five blocks filled by stage (1 reading,
  2 building, 3 testing, 4 pushing or waiting, 5 done), the stage word,
  minutes running (never a guess at minutes left), and, when it waits on
  Matt, what he needs to do in parentheses.
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

## Email

Write email drafts inline in the chat for Matt to copy into Gmail himself.
Never create a Gmail draft. Send email only when Matt asks for that send in
the current conversation, or when a skill he approved names the recipient
and the send (for example `sick-day`, or the `ai-research-digest` routine's
weekly report to Matt). The Gmail connector is the Cuepri inbox; send
personal and venture mail through Composio (`gmail-personal`,
`gmail-advisory`), per the `composio-google` skill.

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

## Cloud-native by default

Matt wants everything as cloud-native as possible. When you recommend or
design a tool, integration or automation, start from what runs without his
laptop, Mac or phone being on: a hosted service, a cloud routine, a
connector. Don't lead with a Mac-only or local-only option. If one is the
best fit anyway, give the one-line reason and the cloud alternative beside
it. When nothing hosted exists, his fallbacks are an always-on Mac, a
Cloudflare account and Google Workspace. Stated 2026-10-29.

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
