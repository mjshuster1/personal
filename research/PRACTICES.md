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
it was raised): `- status | title | detail | where | source | more | link` (the last two are optional: a few sentences shown on expand, and the source URL). No pipes inside
a field. `research/practices-page.js` turns this file into the practices page,
so a line in any other shape stops the build.

## 2026-10-24

- in force | Stop offering /compact when a chat gets long | The rule and the hook's warning now offer a handoff only, matching the handoff-file entry. | claude/CLAUDE.md, Reversals and long sessions; hooks/et-time.js | Practices audit | Found in the Oct 24 audit of your rules against this log: CLAUDE.md said not to use /compact as a cost cut while another line and the hook still offered it. Both fixed Oct 24.
- pending | Set an effort level on each review agent | The six consultant-workspace agents pick a model but no effort, so they run at the session default. Agent frontmatter takes an effort value. | consultant-workspace/.claude/agents | Practices audit | Your own effort rule came after the agents were written. A possible split, untested: low for the lookup agents (ledger-audit, question-audit), default for the rest.
- in force | Tell clients to match the model and effort to the task | The coaching guide now tells clients to set effort with /effort in Claude Code, leave it for everyday work and turn it up to check finished work. The setup prompt keeps its Sonnet rule. | consultant-workspace/guides/ai-level-up-coaching.md section 5 | Practices audit | Client version of the effort entry. Shipped Oct 24 in the coaching guide rather than the setup prompt, so no update prompt was needed. You confirmed /effort works in the Code tab. A low-effort first pass was cut from the client text because the client rules say never to trade accuracy for savings.
- in force | Have clients check work in a fresh chat, not the one that wrote it | The coaching guide now tells clients to copy anything that matters into a new session and ask for a skeptical review, matching your own separate-reviewer habit. | consultant-workspace/guides/ai-level-up-coaching.md section 4 | Practices audit | Section 7 of the same guide already recommends a second opinion from something that did not write the draft, so section 4 conflicted with it; fixed Oct 24, with paste instead of pointing at a file because a draft can sit on another session's branch. The setup prompt's check of numbers against sources is a different thing and stays. Anthropic's Claude engineering lead said the same in the Oct 24 report (opening lines only, unverified past that).
- pending | Keep the client instruction file a short index | The setup prompt writes a client CLAUDE.md of about 295 lines. Duncan Rogoff's advice is a short index that points to detail files. | consultant-workspace/guides/setup-prompt-owner-operator | Practices audit | Every line of that file loads in every chat. Moving reference material into files the index points to cuts the per-chat cost without losing the rules. Needs a test on a throwaway brain before it goes to clients.
- pending | Try a methods-first opener on two review agents | consulting-expert and implementation-architect open with a persona ("twenty years of selling"). Test asking for the methods that kind of expert uses instead. | consultant-workspace/.claude/agents | Practices audit | Follows the noted entry on methods versus personas. prospect-voice stays a role-play on purpose.
- pending | Turn off connectors and plugins you don't use | Every connector and skill adds tokens to each new chat before you type. Your connectors are done; unused plugin skills still load. | Claude settings, not a repo file | Ben AI | A fresh chat spends tokens before you type anything, because every connector, plugin and skill description is loaded. Ben AI showed 84,000 tokens used up front. Run /context to see the breakdown, then turn off what you do not use. Disabling a plugin also turns off its inner skills. Your connectors are done; the plugin skills are the open part. As of Oct 24, sessions still load the sales, legal and Slack plugin skills plus about 20 plugin servers waiting on sign-in. Claude Code docs (code.claude.com/docs/en/mcp, Scale with MCP tool search) say tool search loads only tool names at the start, so connectors cost little there; plugin skill descriptions are the part that still loads. The client guide got a matching line on Oct 24 (drop a source from the daily update, then disconnect it); your own plugins are what is still open. | https://www.youtube.com/watch?v=Jr-jyTL2MYI
- in force | Match the effort level to the task | Low for quick or mechanical work, medium by default, high for checking finished work, and the top levels only for long unattended jobs. | claude/CLAUDE.md, Token cost | Ben AI | Anthropic's guidance as relayed by Ben AI: the same simple redesign took 1 minute on low and 28 minutes on max with a similar result. Higher effort adds cost for small gains on easy work and can lead to overthinking. Switching effort mid-chat was claimed not to re-read the chat at full price on the newest models; that claim is unverified. Your rule now authorizes passing an effort value to agents. You also ask before heavy research whether to switch to Opus; for search and comparison the answer has been no. | https://www.youtube.com/watch?v=Q876SRB_-1M
- in force | Start a fresh chat from a handoff file instead of using /compact | Have Claude write a short file of goal, progress and decisions, review it, then open a new chat from it. Also stay on one model per chat. | claude/CLAUDE.md, Reversals and long sessions | Duncan Rogoff | Duncan Rogoff's four hidden costs: using /compact as a cost cut, letting the prompt cache expire (about an hour on a subscription, 5 minutes on pay per use), big always-loaded files, and defaults like Opus with thinking on. /compact needs an extra full read to write the summary and can drop small early instructions. A handoff file lets you review what survives. The cache belongs to one model, so switching models starts it over. For clients: one fresh chat per job, and keep the instruction file a short index. | https://www.youtube.com/watch?v=peZyP4UC88U
- noted | Ask for an expert's methods, not an expert persona | Instead of "act like an accountant", ask what tools and methods a top accountant uses, then have Claude use them. Worth trying in client prompts. | Client prompts | Silicon Valley Girl | From an Anthropic interview clip. Telling a model it is an excellent accountant can produce vocabulary without technique. The speaker asks which tools a top person in the field would use, then asks Claude to use those, even while asking for plain language. Try it in client prompts that currently open with a persona. | https://www.youtube.com/watch?v=yZbOqzXAOKw
- noted | Use several sub-agents that each ask one question | For a decision, give each sub-agent a single question and let them debate. Agent teams cost more for little gain. Your expert-panel skill already works this way. | skills/expert-panel | Nate Herk | Nate Herk's roast room: each council member is a markdown file with one question it asks, plus a folder of that person's sources. Members debate in rounds, and if all agree the chair forces one to argue the other side. He tested agent teams first and found them more expensive for minimal added value. This matches your expert-panel skill, so no change was suggested. | https://www.youtube.com/watch?v=DSS1Yqb6-qE
- noted | Share skills across your team and put AI in tools people already use | Anthropic's customer case studies point to managers adopting first, letting power users emerge, and sharing skills as a team asset. Useful as a checklist for client rollouts. | Client background | Ben AI | Ben AI's summary of Anthropic customer case studies: managers adopt first, let power users emerge, put AI in the tools people already use, share skills as a team asset. The figures are his reading and not checked against the originals. The Opus 5.5 vs Fable 5.1 test was one person's runs: Opus was cheaper for decks, design and copy, Fable went deeper on data-heavy work at higher cost. | https://www.youtube.com/watch?v=-jl4-8nHdH4

## 2026-10-21

- in force | Name the source for any product fact or say unverified | Before stating what a product or vendor can do, find it in the repo or current docs and name the file or page. | claude/CLAUDE.md, Product facts in replies | Your setup | Applies to chat replies, not just files. In the venture repo, a vendor capability is a no only when a primary source says so, quoted.
- in force | Drop an option only on a documented fail or cost, never on an unknown | Unknowns rank options; they do not remove them. Vendor research reads the leading option's docs pages before anything is left unknown. | consultant-workspace/AGENTS.md, Review panel and Vendor research | Your setup | Added after Codex was dropped on unknowns. Research an option rests on runs on Sonnet at default effort, not low.
- in force | Offer a handoff when a chat gets long (about 250k tokens) | Long chats get slow and costly. A hook warns when the context is large and the cache is warm, and the rule offers a handoff once. | claude/CLAUDE.md, hooks/et-time.js | Ben AI | Ben AI's mods video showed a countdown for when a chat's prompt cache goes cold and a handoff that writes a fresh-chat prompt at 250k tokens. His cost figures (about $1.6 cold vs 4 cents warm) are unverified. Your rule offers a handoff once, and the et-time hook warns when context is large and the cache is warm. | https://www.youtube.com/watch?v=bTqizdva04g
- noted | Build a skill from your best and worst real examples | Show Claude real good and bad outputs and have it find what separates them, instead of describing the process. Done once as an audit of the voice skill. | skills/personal-voice | Ben AI | Ben AI's method: gather best and worst real outputs, have Claude find what separates them, then build the skill from those patterns, tagging each finding as seen, inferred or unknown. You ran it as an audit of about 50 sent emails against the voice skill. Only the subject-line rule changed. A one-time audit, not a standing rule, so noted rather than in force (corrected Oct 24). Do not raise this again. | https://www.youtube.com/watch?v=57FpQnLTEBY
- rejected | Make reviewers cite a real cause for each objection | Keeps a reviewing agent from raising imaginary risks. Your structural reviewer already requires this. | agents/karpathy-structural-review.md | Simon Willison | Anthropic's source-control post says adversarial review is effective but can be myopic, and engineers had to steer Claude away from over-engineering for hypothetical concerns. The idea was to add a real-cause requirement to your reviewer. It already has one. | https://simonwillison.net/2026/Oct/13/redesigning-source-control-at-anthropic/
- rejected | Pick a different check for each kind of risk | Instead of one human approval for every risky change, match the check to what could go wrong. Rejected: you keep the single approval. | claude/CLAUDE.md, Risky changes | Simon Willison | The Claude Code team's approach: ask what could go wrong and which check, automated or human, catches it, instead of asking whether a human read it. Applying that would have loosened your blanket yes for risky changes. You chose to keep the blanket yes. | https://simonwillison.net/2026/Oct/16/code-review/

## 2026-10-23

- in force | Try the other routes before calling a source blocked | A site's own 403 is not a policy denial. Try WebFetch, then r.jina.ai, before reporting a block. | claude/CLAUDE.md, Web access and Dead ends | Your setup | Added after agents reported sites as blocked that a second route could read. A 403 from the proxy is the real denial and gets reported, not routed around.
- in force | Run de-slop on any draft written as you before showing it | Load personal-voice, draft, run de-slop, then show it. The banned words apply to Claude's writing, not yours. | claude/CLAUDE.md, Email drafts; skills/personal-voice; skills/de-slop | Your setup | Set in the Oct 23 voice audit, which found mistakes came from rules not reaching the session (an empty gtm-vault folder in cloud sessions), not from rules in the wrong place. Cuepri sessions now attach gtm-vault or stop.

## 2026-10-22

- rejected | Send consulting clients a weekly feed of setup updates | A weekly note clients paste into their brains. The structural review said no new file, log or routine. | Not built | Structural review | Supply is thin (4 suggestions, 1 adopted at the time) and the versioned update prompt already diffs and dedupes. Reopen at about 5 clients or about 10 adopted changes a year.
- in force | Keep the expert panel cheap | One brainstorm agent covers every angle, the fact check runs on the cheapest model, and the editor only cuts. | skills/expert-panel | Your setup | The skill notes that each agent carries a large fixed startup cost. Round 1.5 was simplified on Oct 7 after you said you did not want to over-engineer it.

## 2026-10-19

- in force | Check what is already known before asking anyone a question | The question-audit agent runs on every question before it goes to a client or into a file. | consultant-workspace/AGENTS.md, Questions; .claude/agents/question-audit.md | Your setup | Every question costs the client time and signals whether you did your homework. A safe inference stays an inference instead of becoming a question.

## 2026-10-18

- in force | Build estimates from a task list and re-cost any spike with a fresh agent | Low, likely and high from a task list; a number that decides an option or jumps gets a skeptical second estimate. | consultant-workspace/AGENTS.md, Estimates | Your setup | Came from your pushback that 35 hours was not realistic. The skeptical re-cost cut most figures 1.5 to 3 times. Since Oct 21, hours count your hands-on time with Claude Code.

## 2026-10-14

- in force | Run one lint routine over many repos, with each repo owning its checks | One routine with a repo list in its prompt; each repo keeps its own lint file. | consultant-workspace/ops/lint.md; cuepri-workspace/docs/architecture.md | Your setup | You asked whether a lint per repo was necessary. Never one per repo; the tutoring apps later got a separate one.

## 2026-10-12

- in force | Keep a word from sitting alone on the last line of a page | Body text gets text-wrap pretty, headings get balance, short labels stay with what they label, and a phone-width render is checked before publishing. | claude/CLAUDE.md, Pages and drafts | Your setup | Moved from the venture repo to the user level the same day so it applies everywhere.

## 2026-10-08

- in force | Test a changed skill in a fresh session and check which copy loaded | Run the skill in a new session and read the load log before trusting a change. | skills (load log at ~/.claude/skills/.personal-skills) | Your setup | Cloud sessions once loaded a 25-hour-old copy. The fix was in the environment setup script, verified from three kinds of session: one a tool created, one attached to a repo, and one you started from the app.
- noted | Take a read-only inventory before any cleanup | Change nothing, list what exists and where copies drift, then decide. | Habit, not in a file | Your setup | Used for the Oct 4 to 14 Claude inventory audit before the master-orchestrator repo was retired.

## 2026-10-04

- in force | Give each subtask the cheapest model that does it accurately | Break the work into subtasks; retrieval goes to Haiku at low effort, and the deliverable you read is never downgraded. | claude/CLAUDE.md, Token cost | Your setup | A cheap agent that comes back blocked is reported, not retried on a pricier model. Tool and web access are checked before spawning.
- in force | Post status lines for background agents instead of scheduled check-ins | Timestamped lines when agents start, finish and are still running. | claude/CLAUDE.md, Background agents | Your setup | No check-ins while agents run unless you ask, because each check-in rereads the whole conversation.
- in force | Send structural changes past a skeptical reviewer first | A new repo, folder, routine or restructuring goes to the structural reviewer, which can recommend removal, and the repo's map is updated in the same change. | agents/karpathy-structural-review.md; claude/CLAUDE.md, Structural changes | Your setup | A review that always says it looks fine has failed. It turned down the weekly client feed on Oct 22.

## 2026-10-02

- in force | Have agents that did not write a draft review it before it goes out | consulting-expert and prospect-voice since Oct 2; matt-proxy, implementation-architect and ledger-audit since Oct 9. Each reads the real file, not a summary. | consultant-workspace/AGENTS.md, Review panel | Your setup | A simulated prospect's reaction is opinion, never evidence. Panel wording never goes into the finished piece. Each agent is read-only and runs on its own model.

## 2026-09-29

- in force | Keep one copy of each skill | Skills live in the personal repo only; copies in other repos were deleted so they cannot drift. | README.md; install.js | Your setup | Tested by a fresh session that reported which skills loaded.
- rejected | Copy private company repos into your personal account to reach them from the cloud | It would let cloud sessions read the Cuepri org's wikis. | Not built | Your setup | It would work around the Cuepri org's access decision, could move sensitive prompts, and creates a second copy that drifts. Use a local session for those files.

## 2026-09-27

- in force | Check a host is reachable before spawning a web agent | One curl call first; a 403 or 000 is a policy denial to report, not to retry. WebSearch works regardless of the network setting. | claude/CLAUDE.md, Web access in cloud sessions | Your setup | First written into the venture repo after agents hit blocked hosts, then moved to the user level on Oct 4. When WebFetch is blocked, curl and r.jina.ai can still read public pages.

## 2026-09-17

- in force | Write email drafts in the chat, never in Gmail or the CRM | You read, edit and send them yourself. | claude/CLAUDE.md, Email drafts; cuepri-workspace/CLAUDE.md | Your setup | The weekly digest is the one exception: it emails you the digest, and only you.

## 2026-09-16

- in force | Show risky changes before committing, and commit everything to main | Skills, agents, hooks, scripts and automation get a yes first; no branches or pull requests. | claude/CLAUDE.md, Git | Your setup | Work moved to main on Sep 11 because a branch and pull request had no reviewer on the other end. The Oct 21 rejected entry kept this single yes.
- in force | Tag claims as fact, opinion or unknown | An opinion never becomes fact by repetition, and "not documented" is unknown, never "can't". | consultant-workspace/AGENTS.md, Evidence discipline | Your setup | Early evidence comes from friends and enthusiasts, so a willingness to pay stays opinion until money or a signed commitment moves.

## 2026-08-24

- in force | Ship each deliverable as a versioned file plus a page on the same link | The markdown file in the repo is the source; the page is republished to the same URL so shared links keep working. | cuepri-workspace/CLAUDE.md, Deliverables | Your setup | Pages render light only because they are often shared outside.
