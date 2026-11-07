# Skills and agents inventory

Updated: 2026-11-07
Page: https://claude.ai/artifact/1L6onUFELu2jmU1F3ReLzT

Source of truth for the page. Build it with `node inventory-page.js` and republish to the URL above.
Groups marked [yours] are checked against the files on disk by the script. Plugin and built-in groups come from a session's skill and agent lists, so update them by hand or ask Claude.
Line format: `- name | description | note (optional)`, then indented `  - Label: text` lines for the expandable details (Use when, Try, Returns, and so on). The script adds a File detail for anything it finds on disk.

## Your skills [yours]
Edited in the personal repo, under skills/. Installed into every session by the cloud setup script and the local links.

- personal-voice | Your stance, tone, sentence rules, email openers and banned words. Loaded before drafting anything written as you.
  - Use when: Anything written as you: email, Slack, texts, posts, memos. Other skills load it for you.
  - Try: "Draft a reply to Sam, load my voice first."
  - Covers: Stance, tone, sentence rules, email openers, banned words, punctuation. True at any company.
- de-slop | Rewrites text to strip AI tells and match your voice, plus the company voice file when the repo has one.
  - Use when: A draft reads like a machine wrote it.
  - Try: "De-slop this" and paste the text.
  - Returns: The rewrite plus a short note of what changed: em dashes, AI vocabulary, rule of three, flat rhythm.
- document-review | Reviews a document in four passes, in order: substance, slop, bloat, clarity.
  - Use when: You want feedback on a memo, email, proposal, page or deck text.
  - Try: "Review this one-pager."
  - Order: Substance first, then slop, bloat and clarity. Required before any client-facing publish in the Cuepri workspace.
- reader-sim | Simulates busy readers getting an email for the first time and scores how much lands: phone inbox, one screen at a time, time budget, interruptions, memory quiz. Costly, so only when asked. | about 650k tokens a run
  - Use when: An important email has to land with busy readers, and you want proof before it goes out.
  - Try: "Run the reader sim on this email to clinical directors."
  - Returns: Scores for the original, a rewrite and a tight control: comprehension, must-know items, how far readers got.
  - Cost: About 650k tokens a run. Only when you ask.
- expert-panel | Adversarial expert panel on a decision: independent opinions, cross-examination, fact check, disagreement map. Runs inline in chat.
  - Use when: A high-stakes decision with real options where you want disagreement, not agreement.
  - Try: "Run an expert panel on whether to price per site or per client."
  - Returns: Independent opinions, cross-examination, a fact check and a disagreement map, inline in chat.
- composio-google | How to read your venture and personal Gmail and Drive through Composio: account aliases, always name the account (the default Gmail account is the day-job inbox), read-only.
  - Use when: A task needs your venture or personal Gmail or Drive, not the Cuepri inbox.
  - Try: "Check my advisory Gmail for anything from the bank this week."
  - Rule: Always name the account. Read-only.
- sick-day | Say a daughter is home sick and it emails the aftercare address from your personal Gmail; the school report is a placeholder until the Bowen form link is found.
  - Use when: One of your daughters is home sick.
  - Try: "Quickly, Ava is home sick."
  - Does: Emails the aftercare address from your personal Gmail and reminds you to report the absence to the school.
- ai-research-digest | Weekly routine only. Method, scoring rules and source list for the AI research report. Not for normal sessions. | routine only
  - Use when: Only the weekly AI research routine uses it.
  - Does: Holds the method, scoring rules and source list for the weekly report emailed to you.

## Your skills in the Cuepri workspace [yours]
Live in cuepri-workspace/.claude/skills/. Load only in sessions that start in that repo.

- cuepri-vault | Cuepri operating context: vault structure, save locations, voice, ICP and PHI rules, and routing to the other Cuepri skills.
  - Use when: Any Cuepri work: accounts, outreach, meetings, playbooks, vault reads and writes. Loads on its own.
  - Try: "What do we know about Lake Ave?"
  - Covers: Vault layout, where to save what, voice, ICP rubric, PHI rules, and which specialized skill to hand off to.
- cuepri-design | Cuepri design system: tokens, type, components, UI kits and brand assets for interfaces and mocks.
  - Use when: Building any Cuepri page, mock, deck visual or UI.
  - Try: "Mock up the family check-in screen in the Cuepri style."
  - Covers: Domine, DM Sans and JetBrains Mono, warm neutrals, green #0C6D36 as the one accent, square corners, no italics.
- call-sources | Decides where call content comes from: Fireflies transcript first, HubSpot meeting summary second, labeled when summary-derived.
  - Use when: Any recap, follow-up or digest needs what was said on a call. Other skills call it.
  - Order: Fireflies transcript first, HubSpot meeting summary second. Output built from a summary is labeled that way.
- call-update | Short team-facing recap of a call: bottom line, product feedback, next steps.
  - Use when: You want a call written up for the team.
  - Try: "Write up the Creekside call for the team."
  - Returns: Three parts: bottom line, product ideas and feedback, next steps.
- meeting-followup | Follow-up email to someone you just met with, in your voice, from the transcript. A recap, not a pitch.
  - Use when: You need to email someone you just met with.
  - Try: "Follow up with Dana from today's demo."
  - Returns: A recap-and-next-steps email in your voice, drafted inline. Not a pitch. For people you haven't met, use outreach-draft.
- outreach-draft | Cold and first-touch emails to behavioral health operators you haven't met.
  - Use when: Cold or first-touch email to a treatment center contact you haven't met, or reopening a cold account.
  - Try: "Draft something to the clinical director at Echo Ridge."
  - Returns: A short email in your voice, drafted inline.
- deal-coach | Keeps open deals from stalling: post-call debrief, pre-call card, and a daily pass over every open deal on one rubric.
  - Use when: After a deal call, before one, or for a daily look across open deals.
  - Try: "Debrief this call", "Prep me for Begin Again", or "What should I do on my deals today?"
  - Rubric: Named owner, economic buyer, buyer-owned date, objection answered, commitments both ways. Keeps the Deal state block on each account note.
- verification-check | Retrieval discipline: fetch full records before concluding, and treat an empty search as not found, not as proof of absence.
  - Use when: A conclusion depends on what a record says or whether it exists: was it sent, what was agreed, last contact.
  - Rule: Fetch the full record before concluding. An empty search means not found through that source, not proof it doesn't exist.
- fireflies-timestamps | Formats Fireflies links so they jump to the right moment in the recording.
  - Use when: Any answer links to a Fireflies meeting. Applies on its own.
  - Does: Formats the link so it opens at the right moment in the recording.
- icp-tiering | Scores and tiers treatment center accounts against the ICP rubric.
  - Use when: Scoring a list of accounts, or asking whether one is a fit.
  - Try: "Tier these 40 centers" or "Is Ridgeview a fit?"
  - Returns: A score and tier per account against the ICP rubric.
- trigger-watch | Daily signal scan across Tier 1 to 3 accounts to pick the ones to work today. | weekday routine
  - Use when: Runs every weekday as Cuepri Trigger Watch. Also on request.
  - Try: "What should I work today?"
  - Returns: The top Tier 1 to 3 accounts to act on, with the signal behind each.
- daily-run | Assembles the daily digest from Fireflies, Gmail, Slack, HubSpot, Calendar and texts, and logs decision records. | daily routine
  - Use when: Runs daily as Cuepri Daily Run. Also on request.
  - Try: "Run today's digest."
  - Returns: One digest in vault/Cuepri/daily/ from Fireflies, Gmail, Slack, HubSpot, Calendar and texts, plus decision records. PHI gate on.
- rollout-sync | For each site in rollout, reads new calls and email, suggests tracker ticks, lists follow-ups owed, and rewrites the site's status. | routine
  - Use when: Runs as the Cuepri Rollout Sync routine. Also on request.
  - Try: "Sync the tracker."
  - Returns: Suggested ticks (never direct ticks), follow-ups owed both ways, and a fresh status per site on the rollout tracker. Operational only, nothing about a client.
- fireflies-manual-sync | Logs manual Fireflies recordings (phone calls, debriefs, uploads) to HubSpot against the right contact, company and deal. | routine
  - Use when: Runs as the Fireflies Manual Sync routine. Also on request.
  - Try: "Sync my Fireflies recordings."
  - Why: Fireflies' own HubSpot sync skips recordings where you are the only participant.
- hubspot-company-sync | Keeps each contact's Company Name matched to its primary associated company. | daily routine
  - Use when: Runs daily as the HubSpot Company Name Sync routine.
  - Does: Sets each contact's Company Name to match its primary associated company.
- voice-refresh | Harvests your recent sent email and call language and proposes voice-file changes without applying them. | routine, disabled
  - Use when: The Cuepri Voice Refresh routine (currently disabled), or when a draft stops sounding like you.
  - Try: "Is my voice file stale?"
  - Returns: New samples in vault/Cuepri/voice-samples/ and a drift note. Never edits the voice files itself.
- champion-graph | Your warm-intro graph through industry champions: who knows whom, best path into an account, intro requests.
  - Use when: Looking for a warm intro or the best path into an account.
  - Try: "Who can get me into Echo Ridge?" or "Draft an intro request to Mike."
  - Returns: Paths through your champions, and briefs or intro requests on request.
- champion-crossref | Cross-references champion connections against the ICP center master into the deduped review list and gap analysis.
  - Use when: Building or refreshing the champion-connection master, or prepping a champion review.
  - Try: "Refresh the champion-connection master."
  - Returns: A deduped, scored list with warm paths and the high-ICP accounts with no path.
- champion-feed-watch | Weekly scan of champions' LinkedIn activity that mines qualifying posts into a candidates report. | weekly
  - Use when: Weekly, or when you want to know what champions have been posting.
  - Try: "Scan champion feeds."
  - Returns: A candidates report built from the posts it mined.
- champion-post-mine | Pulls ICP candidates from a LinkedIn post a champion engaged with, scores them, and adds them to the ledger.
  - Use when: You have a LinkedIn post a champion engaged with.
  - Try: "Mine this post" with the URL.
  - Returns: ICP candidates from the post, scored and added to the candidates ledger.
- ideas-engine | Generates genuinely different options for copy, names, positioning, concepts or pricing when a draft feels flat.
  - Use when: You need real alternatives: subject lines, names, positioning, concepts, pricing models.
  - Try: "Give me ten subject lines for the alumni email, all different."
  - Not for: Choosing between options you already have. That is expert-panel.

## Your agents in the consultant workspace [yours]
Live in consultant-workspace/.claude/agents/. They run only in that repo. All are read-only. The review panel rules in its AGENTS.md say when each is required.

- consulting-expert | Adversarial senior consultant. Reviews outward drafts, prices, scope, call prep and recommendations. | opus
  - Use when: Before anything goes outward from the consulting work: drafts, prices, scope, call prep.
  - Returns: An adversarial senior-consultant review. Read-only.
- prospect-voice | Simulated behavioral health owner-operator reading your work as the buyer. Output is [opinion, simulated], never evidence. | opus
  - Use when: You want the buyer's reaction before a draft or offer goes out.
  - Returns: How a behavioral health owner-operator would read it, labeled opinion, simulated. Never evidence.
- matt-proxy | Answers one question: would you accept this, given your hours, skills, risk appetite and stop rule. A proxy, never your decision. | sonnet
  - Use when: Checking whether you would accept a plan given your hours, skills, risk appetite and stop rule.
  - Returns: A yes or no with reasons. A proxy, never your decision.
- implementation-architect | For every technical idea: simplest version, build-nothing alternative, costs in hours and dollars, vendor facts with verification status. | opus
  - Use when: Any technical idea in the consulting work.
  - Returns: The simplest version, a build-nothing alternative, cost in hours and dollars, vendor facts marked verified or not.
- ledger-audit | Mechanical check of the assertions ledger in open-questions.md against the wiki and the setup-map page. | haiku, low effort
  - Use when: Checking the assertions ledger in open-questions.md.
  - Returns: Mismatches against the wiki and the setup-map page. Mechanical, cheapest model.
- question-audit | Checks each question against the repo before anyone is asked: already answered, decision it changes, who should answer, narrower wording. | sonnet
  - Use when: Before asking anyone a question.
  - Returns: Whether the repo already answers it, what decision it changes, who should answer, and narrower wording.

## Your agent at user level [yours]
Lives in the personal repo, under agents/. Installed into ~/.claude/agents/ by install.js.

- karpathy-structural-review | Reviews any structural change (new repo, folder, automation, removal) against the LLM-wiki principles and the repo’s own rules. Will recommend removal. | no model set
  - Use when: Before any new repo, submodule, top-level folder, automation or routine, or removing or renaming one. Required by your rules.
  - Try: "Run the structural review on adding a handoffs/ folder."
  - Returns: A verdict on whether it is justified now, drifts, duplicates or bloats. Will recommend removal.

## Built-in agents
Ship with Claude Code. Available in every session.

- claude | Catch-all agent with every tool.
  - Use when: A task that doesn't fit a more specific agent.
  - Note: Has every tool, so it costs the most to brief well.
- general-purpose | Multi-step research and search when the first tries miss.
  - Use when: A search or research task where the first few tries might miss.
  - Try: "Find every place the rollout tracker URL is referenced."
- Explore | Read-only fan-out search across many files.
  - Use when: A broad sweep across many files when you only need the conclusion.
  - Note: Read-only. Locates things; it doesn't review them.
- Plan | Designs implementation plans. Read-only.
  - Use when: Designing how to build something before building it.
  - Returns: Step-by-step plan, key files and trade‑offs. Read-only.
- claude-code-guide | Answers questions about Claude Code, the Agent SDK and the API.
  - Use when: Questions like "Can Claude Code do X?" or "How do I set up a hook?"
  - Covers: Claude Code, the Agent SDK, the Claude API, Claude in Slack.
- statusline-setup | Configures the Claude Code status line.
  - Use when: You want to change the status line at the bottom of Claude Code.

## Slack plugin skills
slack-by-salesforce. Needs the Slack connector authorized; it was not authorized in the 2026‑10‑26 session.

- slack-by-salesforce:channel-digest | Digest of recent activity across several channels.
  - Try: "Digest #sales, #product and #rollout from this week."
- slack-by-salesforce:draft-announcement | Drafts a formatted announcement and saves it as a draft.
  - Try: "Draft an announcement that the family surface is live."
  - Note: Saves as a Slack draft. Nothing posts until you send it.
- slack-by-salesforce:find-discussions | Finds discussions on a topic across channels.
  - Try: "Find where we discussed Kipu integration."
- slack-by-salesforce:standup | Standup update from your recent Slack activity.
  - Try: "Write my standup from yesterday's Slack."
- slack-by-salesforce:summarize-channel | Summarizes recent activity in one channel.
  - Try: "Summarize #rollout since Monday."
- slack-by-salesforce:slack-messaging | Guidance for well-formatted Slack messages.
  - Use when: Writing anything that will be posted in Slack. Loads on its own.
  - Covers: Slack's mrkdwn formatting and message structure.
- slack-by-salesforce:slack-search | Guidance for effective Slack search.
  - Use when: Searching Slack well: operators, channels, people. Loads on its own.

## Legal plugin skills
legal. Connectors for Box, DocuSign and Egnyte were not authorized in the 2026-10-26 session.

- legal:brief | Daily legal summary, topic research or incident briefing.
  - Try: "Brief me on the legal items for this week."
- legal:compliance-check | Regulations, approvals and risk areas for a proposed action.
  - Try: "What approvals do we need to text alumni?"
- legal:legal-response | Templated responses to common legal inquiries, with escalation checks.
  - Try: "Draft a response to this data request."
  - Note: Checks whether it needs escalation first.
- legal:legal-risk-assessment | Severity-by-likelihood risk classification.
  - Try: "Rate the risk of launching the family surface without signed consent."
- legal:meeting-briefing | Briefings for meetings with legal relevance, plus action tracking.
  - Try: "Prep me for the call with their counsel."
- legal:review-contract | Clause-by-clause contract review against a playbook, with redlines.
  - Try: "Review this MSA against our playbook."
  - Returns: Clause-by-clause notes with suggested redlines.
- legal:signature-request | Pre-signature checklist and routing for e-signature.
  - Try: "Get this pilot agreement ready for signature."
- legal:triage-nda | Classifies an NDA as green, yellow or red.
  - Try: "Triage this NDA."
  - Returns: Green, yellow or red, with the clauses that drove it.
- legal:vendor-check | Status of agreements with a vendor across systems.
  - Try: "What agreements do we have with Fireflies?"

## Sales plugin skills
sales. Most need a CRM, email or calendar connector. In the 2026-10-26 session the sales connectors needed authorization and the HubSpot one failed to connect.

- sales:setup | First-run setup. Checks what is connected and learns your writing style.
  - Use when: First time using the sales plugin.
- sales:daily-briefing | Morning rundown of meetings, deals and waiting emails.
  - Try: "Give me my sales briefing."
  - Overlaps: daily-run and trigger-watch already cover this for Cuepri.
- sales:end-of-day | Closes the day: calls processed, CRM current, tomorrow teed up.
  - Try: "Close out my day."
- sales:weekly-wrap | End-of-week summary of what closed, moved and slipped.
  - Try: "Wrap up the week."
- sales:account-research | Research a prospect company or contact.
  - Try: "Research Ridgeview Recovery before Tuesday."
- sales:account-context | 360 view of an existing account.
  - Try: "Give me everything on Lake Ave."
- sales:account-plan | Strategic account plan, synced to the CRM.
  - Try: "Build an account plan for Begin Again."
- sales:account-tiering | Scores and tiers accounts against ICP fit.
  - Try: "Tier these accounts."
  - Overlaps: icp-tiering uses Cuepri's own rubric. Prefer it.
- sales:call-prep | Pre-call brief.
  - Try: "Prep me for my 2pm."
  - Overlaps: deal-coach pre-call card.
- sales:call-summary | Transcript to follow-up email, internal summary and CRM updates.
  - Try: "Summarize this transcript and draft the follow‑up."
  - Overlaps: call-update and meeting-followup.
- sales:draft-outreach | Outreach email or sequence draft.
  - Try: "Draft a three-email sequence to IOP directors."
  - Overlaps: outreach-draft, which carries your voice.
- sales:inbox-sweep | Classifies customer email and drafts replies.
  - Try: "Sweep my inbox for customer email."
- sales:lead-triage | Scores and routes an inbound lead.
  - Try: "Score this inbound lead."
- sales:route-lead | Ownership and handoff for unrouted leads.
  - Try: "Who should own these unassigned leads?"
- sales:schedule-meeting | Finds a time, drafts the invite, logs it to the CRM.
  - Try: "Find 30 minutes with Dana next week."
- sales:log-activity | Logs a call or email to the CRM after the fact.
  - Try: "Log yesterday's call with Mike."
- sales:update-opportunity | Guided opportunity updates with before and after.
  - Try: "Move the Echo Ridge deal to proposal."
- sales:crm-hygiene-check | Read-only audit of CRM opportunities.
  - Try: "Audit my open deals for missing fields."
- sales:pipeline-review | Stage-by-stage pipeline health.
  - Try: "Review my pipeline by stage."
- sales:team-pipeline | Leader roll-up by rep and stage.
  - Try: "Roll up pipeline by rep."
- sales:rep-context | Leader prep before a 1:1.
  - Try: "Prep me for my 1:1 with Jason."
- sales:forecast | Commit, best-case and pipeline narrative.
  - Try: "Write the quarter forecast."
- sales:deal-review | Deep dive on one opportunity.
  - Try: "Deep dive on the Altior deal."
- sales:deal-advance-gap | What is missing to advance a deal.
  - Try: "What's missing to move Creekside forward?"
  - Overlaps: deal-coach.
- sales:deal-signals | Alert digest: quiet deals, slipping dates, champion changes.
  - Try: "Which deals have gone quiet?"
- sales:deal-slip-scenario | Models the impact if a deal slips or dies.
  - Try: "What happens to the quarter if Begin Again slips?"
- sales:close-plan | Business case and mutual action plan.
  - Try: "Build a mutual action plan for Lake Ave."
- sales:stakeholder-map | Roles, influence and gaps in an account.
  - Try: "Map the stakeholders at Echo Ridge."
- sales:handle-objection | Works through a live objection or competitor threat.
  - Try: "They said they already use an alumni app. How do I answer?"
- sales:competitive-intelligence | Competitor analysis and battlecards.
  - Try: "Battlecard against Pathroot."
- sales:win-loss-review | Patterns in closed-won and closed-lost.
  - Try: "What patterns are in our lost deals?"
- sales:customer-voice | Attributed customer quotes on a topic.
  - Try: "Pull customer quotes about family engagement."
- sales:customer-health | Account health and QBR prep.
  - Try: "Prep the QBR for Newton."
- sales:renewal-radar | Upcoming renewals and risk.
  - Try: "Which renewals are coming up?"
- sales:expansion-whitespace | Upsell and expansion opportunities.
  - Try: "Where can we expand at Recovery Team?"
- sales:create-an-asset | Customer deck, one-pager or leave-behind.
  - Try: "Make a leave-behind for the symposium."

## Anthropic document and workspace skills
anthropic-skills. Formats, Google Workspace, browsers and research.

- anthropic-skills:docx | Word documents.
  - Use when: You ask for a Word file by name, or need to edit a .docx.
  - Try: "Turn this into a .docx I can send."
- anthropic-skills:pptx | PowerPoint decks.
  - Use when: You ask for a PowerPoint file.
- anthropic-skills:xlsx | Excel spreadsheets and CSVs.
  - Use when: You ask for a spreadsheet, or need to read or edit an .xlsx or .csv.
- anthropic-skills:pdf | PDF files.
  - Use when: Reading, merging, splitting, filling or creating PDFs.
  - Try: "Pull the tables out of this PDF."
- anthropic-skills:docs | Claude Docs.
  - Use when: A document to keep, share or comment on, without naming a file type. Exports to Word, PDF or Google Docs.
  - Try: "Write up the pilot proposal as a doc."
- anthropic-skills:google-workspace | Google Workspace tasks.
  - Use when: Creating or changing a Google Doc, Sheet or Slides file in your Drive.
  - Try: "Add a tab to the pipeline sheet."
- anthropic-skills:deep-research | Multi-source research synthesized into a report.
  - Use when: A question that needs many sources pulled into one report.
  - Try: "Research how treatment centers handle alumni engagement today."
- anthropic-skills:skill-creator | Builds a new skill.
  - Use when: Turning a repeated workflow into a new skill.
  - Try: "Make a skill for prepping symposium outreach."
- anthropic-skills:import-memory | Imports memory from elsewhere.
  - Use when: Bringing a memory export over from another AI assistant.
- anthropic-skills:morning | Morning routine skill.
  - Use when: You ask to run or set up your morning brief.
  - Try: "/morning"
- anthropic-skills:built-in-browser | Uses the browser pane in the desktop app.
  - Use when: Working in the browser pane of the Claude desktop app, with its saved sign-ins.
- anthropic-skills:chrome-browser | Uses Claude in Chrome.
  - Use when: Acting in your real Chrome through the Claude in Chrome extension.
- anthropic-skills:computer-use | Controls apps on your computer.
  - Use when: Doing something in a desktop app on your computer, or looking at your screen.

## Claude Code skills
Built into Claude Code.

- code-review | Reviews a diff or PR for bugs at a chosen effort level.
  - Try: "/code-review high" on a diff or PR.
  - Note: Effort runs from low (few, sure findings) to max (many reviewers, costly).
- simplify | Reviews changed code for reuse and simplification, then applies fixes.
  - Try: "/simplify" after a change.
  - Note: Quality only. For bugs, use code-review.
- security-review | Security review of pending changes.
  - Try: "/security-review" before merging.
- init | Creates a CLAUDE.md for a codebase.
  - Try: "/init" in a new codebase.
- run | Launches the project’s app to see a change working.
  - Try: "Run the app and screenshot the new page."
- loop | Runs a prompt on a recurring interval.
  - Try: "/loop 10m check the deploy."
- update-config | Edits settings.json: hooks, permissions, env vars.
  - Use when: Anything automatic ("whenever X, do Y"), permissions or environment variables.
  - Try: "Allow npm commands without asking."
- fewer-permission-prompts | Builds a read-only allowlist from your transcripts.
  - Try: "/fewer-permission-prompts"
- keybindings-help | Customizes keyboard shortcuts.
  - Try: "Rebind submit to ctrl+enter."
- session-start-hook | Sets up startup hooks for cloud sessions.
  - Use when: Only for a SessionStart hook committed to a repo. Environment setup uses the environment tools instead.
- claude-api | Reference for the Claude API and SDK.
  - Use when: Building with the Claude API or SDK, or questions on models, pricing, limits or caching.
- plugin-authoring | Writes plugin hooks that reload live.
  - Use when: Changing Claude's own interface: a side panel, status line, slash command or tool hook.
- workflow-authoring | Reference for writing Workflow scripts.
  - Use when: Writing a multi-agent Workflow script you already asked for.

## Plugin and artifact skills
Cowork plugin management, and the guidance that applies when publishing a page.

- cowork-plugin-management:cowork-plugin-customizer | Tailors a plugin to an organization’s tools.
  - Try: "Customize the sales plugin for HubSpot and Fireflies."
- cowork-plugin-management:create-cowork-plugin | Creates a plugin from scratch in Cowork.
  - Try: "Create a plugin for our rollout workflow."
  - Needs: Cowork mode.
- artifact-design | Design guidance for Artifact pages. Loaded before any publish.
  - Use when: Before any page is published. Loads on its own.
  - Covers: Page contract, layout, type, theming, phone width.
- artifact-diagramming | Diagrams inside Artifacts.
  - Use when: A page needs a diagram that shows how something actually works.
- artifact-capabilities | Runtime capabilities for Artifact pages.
  - Use when: A page needs to remember input, share state between viewers, read live data or ask Claude.
  - Try: "Make the tracker save checkmarks for everyone."
- dataviz | Guidance for charts and dashboards.
  - Use when: Any chart, graph, KPI tile or dashboard.
  - Covers: Chart choice, color, marks and interaction rules.
