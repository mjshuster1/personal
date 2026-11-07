# Skills and agents inventory

Updated: 2026-11-07
Page: https://claude.ai/artifact/1L6onUFELu2jmU1F3ReLzT

Source of truth for the page. Build it with `node inventory-page.js` and republish to the URL above.
Groups marked [yours] are checked against the files on disk by the script. Plugin and built-in groups come from a session's skill and agent lists, so update them by hand or ask Claude.
Line format: `- name | description | note (optional)`

## Your skills [yours]
Edited in the personal repo, under skills/. Installed into every session by the cloud setup script and the local links.

- personal-voice | Your stance, tone, sentence rules, email openers and banned words. Loaded before drafting anything written as you.
- de-slop | Rewrites text to strip AI tells and match your voice, plus the company voice file when the repo has one.
- document-review | Reviews a document in four passes, in order: substance, slop, bloat, clarity.
- reader-sim | Simulates busy readers getting an email for the first time and scores how much lands: phone inbox, one screen at a time, time budget, interruptions, memory quiz. Costly, so only when asked. | about 650k tokens a run
- expert-panel | Adversarial expert panel on a decision: independent opinions, cross-examination, fact check, disagreement map. Runs inline in chat.
- composio-google | How to read your venture and personal Gmail and Drive through Composio: account aliases, always name the account (the default Gmail account is the day-job inbox), read-only.
- sick-day | Say a daughter is home sick and it emails the aftercare address from your personal Gmail; the school report is a placeholder until the Bowen form link is found.
- ai-research-digest | Weekly routine only. Method, scoring rules and source list for the AI research report. Not for normal sessions. | routine only

## Your skills in the Cuepri workspace [yours]
Live in cuepri-workspace/.claude/skills/. Load only in sessions that start in that repo.

- cuepri-vault | Cuepri operating context: vault structure, save locations, voice, ICP and PHI rules, and routing to the other Cuepri skills.
- cuepri-design | Cuepri design system: tokens, type, components, UI kits and brand assets for interfaces and mocks.
- call-sources | Decides where call content comes from: Fireflies transcript first, HubSpot meeting summary second, labeled when summary-derived.
- call-update | Short team-facing recap of a call: bottom line, product feedback, next steps.
- meeting-followup | Follow-up email to someone you just met with, in your voice, from the transcript. A recap, not a pitch.
- outreach-draft | Cold and first-touch emails to behavioral health operators you haven't met.
- deal-coach | Keeps open deals from stalling: post-call debrief, pre-call card, and a daily pass over every open deal on one rubric.
- verification-check | Retrieval discipline: fetch full records before concluding, and treat an empty search as not found, not as proof of absence.
- fireflies-timestamps | Formats Fireflies links so they jump to the right moment in the recording.
- icp-tiering | Scores and tiers treatment center accounts against the ICP rubric.
- trigger-watch | Daily signal scan across Tier 1 to 3 accounts to pick the ones to work today. | weekday routine
- daily-run | Assembles the daily digest from Fireflies, Gmail, Slack, HubSpot, Calendar and texts, and logs decision records. | daily routine
- rollout-sync | For each site in rollout, reads new calls and email, suggests tracker ticks, lists follow-ups owed, and rewrites the site's status. | routine
- fireflies-manual-sync | Logs manual Fireflies recordings (phone calls, debriefs, uploads) to HubSpot against the right contact, company and deal. | routine
- hubspot-company-sync | Keeps each contact's Company Name matched to its primary associated company. | daily routine
- voice-refresh | Harvests your recent sent email and call language and proposes voice-file changes without applying them. | routine, disabled
- champion-graph | Your warm-intro graph through industry champions: who knows whom, best path into an account, intro requests.
- champion-crossref | Cross-references champion connections against the ICP center master into the deduped review list and gap analysis.
- champion-feed-watch | Weekly scan of champions' LinkedIn activity that mines qualifying posts into a candidates report. | weekly
- champion-post-mine | Pulls ICP candidates from a LinkedIn post a champion engaged with, scores them, and adds them to the ledger.
- ideas-engine | Generates genuinely different options for copy, names, positioning, concepts or pricing when a draft feels flat.

## Your agents in the consultant workspace [yours]
Live in consultant-workspace/.claude/agents/. They run only in that repo. All are read-only. The review panel rules in its AGENTS.md say when each is required.

- consulting-expert | Adversarial senior consultant. Reviews outward drafts, prices, scope, call prep and recommendations. | opus
- prospect-voice | Simulated behavioral health owner-operator reading your work as the buyer. Output is [opinion, simulated], never evidence. | opus
- matt-proxy | Answers one question: would you accept this, given your hours, skills, risk appetite and stop rule. A proxy, never your decision. | sonnet
- implementation-architect | For every technical idea: simplest version, build-nothing alternative, costs in hours and dollars, vendor facts with verification status. | opus
- ledger-audit | Mechanical check of the assertions ledger in open-questions.md against the wiki and the setup-map page. | haiku, low effort
- question-audit | Checks each question against the repo before anyone is asked: already answered, decision it changes, who should answer, narrower wording. | sonnet

## Your agent at user level [yours]
Lives in the personal repo, under agents/. Installed into ~/.claude/agents/ by install.js.

- karpathy-structural-review | Reviews any structural change (new repo, folder, automation, removal) against the LLM-wiki principles and the repo’s own rules. Will recommend removal. | no model set

## Built-in agents
Ship with Claude Code. Available in every session.

- claude | Catch-all agent with every tool.
- general-purpose | Multi-step research and search when the first tries miss.
- Explore | Read-only fan-out search across many files.
- Plan | Designs implementation plans. Read-only.
- claude-code-guide | Answers questions about Claude Code, the Agent SDK and the API.
- statusline-setup | Configures the Claude Code status line.

## Slack plugin skills
slack-by-salesforce. Needs the Slack connector authorized; it was not authorized in the 2026‑10‑26 session.

- slack-by-salesforce:channel-digest | Digest of recent activity across several channels.
- slack-by-salesforce:draft-announcement | Drafts a formatted announcement and saves it as a draft.
- slack-by-salesforce:find-discussions | Finds discussions on a topic across channels.
- slack-by-salesforce:standup | Standup update from your recent Slack activity.
- slack-by-salesforce:summarize-channel | Summarizes recent activity in one channel.
- slack-by-salesforce:slack-messaging | Guidance for well-formatted Slack messages.
- slack-by-salesforce:slack-search | Guidance for effective Slack search.

## Legal plugin skills
legal. Connectors for Box, DocuSign and Egnyte were not authorized in the 2026-10-26 session.

- legal:brief | Daily legal summary, topic research or incident briefing.
- legal:compliance-check | Regulations, approvals and risk areas for a proposed action.
- legal:legal-response | Templated responses to common legal inquiries, with escalation checks.
- legal:legal-risk-assessment | Severity-by-likelihood risk classification.
- legal:meeting-briefing | Briefings for meetings with legal relevance, plus action tracking.
- legal:review-contract | Clause-by-clause contract review against a playbook, with redlines.
- legal:signature-request | Pre-signature checklist and routing for e-signature.
- legal:triage-nda | Classifies an NDA as green, yellow or red.
- legal:vendor-check | Status of agreements with a vendor across systems.

## Sales plugin skills
sales. Most need a CRM, email or calendar connector. In the 2026-10-26 session the sales connectors needed authorization and the HubSpot one failed to connect.

- sales:setup | First-run setup. Checks what is connected and learns your writing style.
- sales:daily-briefing | Morning rundown of meetings, deals and waiting emails.
- sales:end-of-day | Closes the day: calls processed, CRM current, tomorrow teed up.
- sales:weekly-wrap | End-of-week summary of what closed, moved and slipped.
- sales:account-research | Research a prospect company or contact.
- sales:account-context | 360 view of an existing account.
- sales:account-plan | Strategic account plan, synced to the CRM.
- sales:account-tiering | Scores and tiers accounts against ICP fit.
- sales:call-prep | Pre-call brief.
- sales:call-summary | Transcript to follow-up email, internal summary and CRM updates.
- sales:draft-outreach | Outreach email or sequence draft.
- sales:inbox-sweep | Classifies customer email and drafts replies.
- sales:lead-triage | Scores and routes an inbound lead.
- sales:route-lead | Ownership and handoff for unrouted leads.
- sales:schedule-meeting | Finds a time, drafts the invite, logs it to the CRM.
- sales:log-activity | Logs a call or email to the CRM after the fact.
- sales:update-opportunity | Guided opportunity updates with before and after.
- sales:crm-hygiene-check | Read-only audit of CRM opportunities.
- sales:pipeline-review | Stage-by-stage pipeline health.
- sales:team-pipeline | Leader roll-up by rep and stage.
- sales:rep-context | Leader prep before a 1:1.
- sales:forecast | Commit, best-case and pipeline narrative.
- sales:deal-review | Deep dive on one opportunity.
- sales:deal-advance-gap | What is missing to advance a deal.
- sales:deal-signals | Alert digest: quiet deals, slipping dates, champion changes.
- sales:deal-slip-scenario | Models the impact if a deal slips or dies.
- sales:close-plan | Business case and mutual action plan.
- sales:stakeholder-map | Roles, influence and gaps in an account.
- sales:handle-objection | Works through a live objection or competitor threat.
- sales:competitive-intelligence | Competitor analysis and battlecards.
- sales:win-loss-review | Patterns in closed-won and closed-lost.
- sales:customer-voice | Attributed customer quotes on a topic.
- sales:customer-health | Account health and QBR prep.
- sales:renewal-radar | Upcoming renewals and risk.
- sales:expansion-whitespace | Upsell and expansion opportunities.
- sales:create-an-asset | Customer deck, one-pager or leave-behind.

## Anthropic document and workspace skills
anthropic-skills. Formats, Google Workspace, browsers and research.

- anthropic-skills:docx | Word documents.
- anthropic-skills:pptx | PowerPoint decks.
- anthropic-skills:xlsx | Excel spreadsheets and CSVs.
- anthropic-skills:pdf | PDF files.
- anthropic-skills:docs | Claude Docs.
- anthropic-skills:google-workspace | Google Workspace tasks.
- anthropic-skills:deep-research | Multi-source research synthesized into a report.
- anthropic-skills:skill-creator | Builds a new skill.
- anthropic-skills:import-memory | Imports memory from elsewhere.
- anthropic-skills:morning | Morning routine skill.
- anthropic-skills:built-in-browser | Uses the browser pane in the desktop app.
- anthropic-skills:chrome-browser | Uses Claude in Chrome.
- anthropic-skills:computer-use | Controls apps on your computer.

## Claude Code skills
Built into Claude Code.

- code-review | Reviews a diff or PR for bugs at a chosen effort level.
- simplify | Reviews changed code for reuse and simplification, then applies fixes.
- security-review | Security review of pending changes.
- init | Creates a CLAUDE.md for a codebase.
- run | Launches the project’s app to see a change working.
- loop | Runs a prompt on a recurring interval.
- update-config | Edits settings.json: hooks, permissions, env vars.
- fewer-permission-prompts | Builds a read-only allowlist from your transcripts.
- keybindings-help | Customizes keyboard shortcuts.
- session-start-hook | Sets up startup hooks for cloud sessions.
- claude-api | Reference for the Claude API and SDK.
- plugin-authoring | Writes plugin hooks that reload live.
- workflow-authoring | Reference for writing Workflow scripts.

## Plugin and artifact skills
Cowork plugin management, and the guidance that applies when publishing a page.

- cowork-plugin-management:cowork-plugin-customizer | Tailors a plugin to an organization’s tools.
- cowork-plugin-management:create-cowork-plugin | Creates a plugin from scratch in Cowork.
- artifact-design | Design guidance for Artifact pages. Loaded before any publish.
- artifact-diagramming | Diagrams inside Artifacts.
- artifact-capabilities | Runtime capabilities for Artifact pages.
- dataviz | Guidance for charts and dashboards.
