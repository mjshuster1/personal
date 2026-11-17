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

## Talking to Matt: plain terms

Every reply to Matt is in plain terms (Matt, 2026-11-16). Say what
happened, what it means for him and what he needs to do, not how the code
or tools did it. Use everyday words ("the deploy check", not the script and
file it writes). Name a file, command, commit or setting only when he needs
it to act or asked for it, and give any unavoidable term a short meaning.
Technical detail belongs in files, commits and briefs to agents, not in
chat. When he asks for the technical version, give it.

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
- Every Kickstart prompt and child brief opens with this line, word for
  word: "First, check that ~/.claude/CLAUDE.md contains 'Session names'.
  If it doesn't, Matt's rules aren't installed in this environment: tell
  Matt in one line before any other work." A session in an environment
  without the setup script never sees these rules, so the check has to
  travel in the prompt.
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
  risky change or deploy, commits nothing, and sends the lead its diff as a
  patch (`git diff`, split if over 60 KB) with its questions. The lead shows
  Matt the diff in the lead's chat; on his yes there, the lead applies the
  patch, reruns the child's tests, commits and pushes. Matt answers
  everything in the lead; a yes relayed from the lead to a child still
  doesn't count, because the commit happens where the yes was given
  (Matt, 2026-11-16). Exception: where a repo's own rules let anything
  that passes go out (tutoring-apps' "Ship fast, fix fast"), a deploy whose
  every gate passed needs no yes; the child deploys and the lead lists it
  in its end-of-session block (Matt, 2026-11-16). Post timestamped lines when each child
  starts and reports, as for background agents; if a child is quiet well
  past its expected time, tell Matt. When the lead's own context is large,
  it writes its handoff into the plan file, listing each running child's
  session id, and pastes the Kickstart prompt for the next lead. Once the
  successor has taken over, it archives the old lead with
  `archive_session` and messages each running child its own session id so
  reports come to it. Don't use /compact as a cost cut: it adds a full
  read and can drop early instructions.
- Session names, the same in every repo:
  - Lead: `Lead N: <Main Topic>`, where `<Main Topic>` is the project in
    plain title-case words (for example `Tutoring Apps`, `Buyer
    Simulation`), not a file slug. The plan file states it on its first
    line (`Main topic: Tutoring Apps`) so every successor uses the same
    words. N counts leads per plan file, and the plan file's section for
    that lead is headed `## Lead N`.
  - Child: `Child N.M: <step>`, M counting the children of Lead N. The
    status block row for that child uses `N.M <step>`.
  - Exactly these forms: the label, a space, the numbers, a colon, a
    space, then the name. Not "(lead 2)", "Lead 2 -" or "Buyer sim step
    11:". Child titles leave the topic out because children are filed
    under their lead.
- How a lead works with Matt and its children:
  - Questions to Matt: grouped in one message, as in Decision tiers.
  - Fable advises leads only (Matt, 2026-11-16). A session can't turn on
    its own advisor and the setting doesn't reach a new cloud session, so
    when a lead pastes a Kickstart prompt it adds one line under the block:
    "In the new session, type `/advisor fable` first, then paste this."
    Every lead Kickstart prompt says, after the rules check: "If you have
    no advisor tool, tell Matt in one line to type /advisor fable." No
    child gets an advisor. Until 2026-11-23, each advisor call is one line
    under `### Calls`: `- <time> ET, advisor: <topic>; changed: <what
    changed, or nothing>`. Then the lead tallies them for Matt to keep or
    drop.
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

## Decision tiers

Who decides what, in every repo (Matt, 2026-11-16). A session or lead reads
these tiers and its repo's own section and decides itself. Each repo's
section names its own tier-2 and tier-3 examples, hard lines, gates and
where calls are logged. Call the `matt-proxy` agent only for a conflict with
an earlier decision, or a call the tiers don't plainly cover. The tier-1
classes were backtested in tutoring-apps (2026-11-16).

- **Tier 1: decide, log, keep going.** Sequencing and timing of the
  session's own work (never the order or pace in which users or clients get
  a change: tier 2); naming and wording no one outside the session sees;
  tests and tooling (risky changes still need Matt's yes); deferrals of work
  already queued or planned (when, not whether: deferring or cutting scope
  is tier 2). A precedent is a citation, not a tier-1 class.
- **Tier 2: ask Matt at the end of the session.** Reversing or amending one
  of Matt's calls, unless it blocks; small design calls inside an approved
  design; scope, priority and anything a user, client or reader sees;
  anything the tiers don't plainly cover, with matt-proxy's recommendation.
  Keep working on what doesn't depend on the answer; don't ship what does.
- **Tier 3: stop and ask Matt now.** Only when blocked, or when a call
  touches the repo's hard lines, someone's data or money, or what its
  section says is hard to undo.
- **Citation gate.** A tier-1 call names its class and quotes the repo line
  or dated decision it follows or bends. If it needs judgment no class
  plainly covers, it isn't tier 1.
- **When Matt's own request conflicts** with a decision or goal he already
  stated (in this file, the repo's rules or its decisions log), say so in
  one sentence, quoting the earlier line, before doing it. Then do what he
  asks; if it crosses a hard line, stop and ask first (tier 3).
- **Questions to Matt** go together in one message, not one by one as they
  come up: each with the recommendation first, plain words, lettered
  options with the recommended one marked, numbered so he can answer
  "1A 2B". Keep working on whatever doesn't depend on an answer.
- **Log.** Each tier-1 or matt-proxy call is one line under `### Calls` in
  the plan file (in the end-of-session reply when there is none):
  `- 10:42 AM ET, T1 tests and tooling: <the call>. Cites: "<quote>" (<file>, <section>).`
  The end-of-session report lists them in one block, then the tier-2
  questions.
- **Shadow check** (Matt, 2026-11-16). Each tier-2 answer is one more line
  under `### Calls`: `Shadow: <class>, recommended <X>, Matt <Y>, match`
  (or `miss`), and `blanket` when one "Proceed" or "all A" answered several
  questions. The plan file keeps a running count per class. After 10
  matches in a row answered one by one, with no miss, the lead proposes
  moving that class to tier 1; Matt confirms, and the class is added to the
  repo's section. A miss resets the class; blanket answers are logged but
  don't count. A successor lead carries the counts over.
- **Ratchet check.** A rule's wording may be amended once (to say what it
  already meant, or to cover a case it didn't foresee). A second amend
  since Matt last confirmed it goes to him as tier 2.
- **New decision entries** use the repo's log format if it has one (for
  example a `Revisit if` line); otherwise add `Why:` (in Matt's words when
  he gave one) and `Holds while:`. No backfill; never guess an older
  entry's reason.
- **When writing code:** one way to do each thing; small files a new
  session understands fast; delete freely once work is done; content and
  config as data over code; few dependencies, bent only for dev-only tools.

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
  Matt, what he needs to do in parentheses. Put the current ET time in
  the header, and drop a finished row after the reply that reports it
  done.
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

## Asking for a consumer's attention

Matt sets a high bar for any ask of an end consumer (a parent, a customer,
a user): their attention is scarce, and he finds dense information hard to
take in himself. Stated 2026-11-16.

- Portion it. One ask at a time, in the order they need it; never a long
  email of steps.
- Make each step simple and foolproof: the fewest taps, nothing they must
  remember, a clear "done" at the end.
- Prefer a call or a visual over text for anything with context or
  backstory: a call makes people set aside the time, and a picture or
  short page lands faster than paragraphs.
- Written follow-ups are short and point to one next action.
- Before anything goes to a consumer, check it against this: what is the
  least they must read or do, and is it split into the right moments?

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
- `r.jina.ai` refuses anonymous requests from cloud containers ("bad IP
  reputation", a 401 from Jina itself, seen 2026-11-15). It needs Matt's
  Jina key saved as a network secret on the environment
  (`request_credential` for `r.jina.ai`, bearer); the proxy adds it, so
  plain `curl` works and no script reads a variable. If a session gets
  that 401, ask for the key with `request_credential`; don't report the
  source as unreachable first.
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

A new cloud environment (for example one split off the Default for a
repo's keys) gets two things in the same step, or its sessions run
without these rules: the Default's setup script, which installs this
repo, and a `request_credential` for `api.github.com` with read access to
`mjshuster1/personal`. The tutoring-apps environment, created Nov 13
without either, ran on no rules. It also gets a `request_credential`
for `r.jina.ai` (Matt's Jina key), so web reads work there.

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
