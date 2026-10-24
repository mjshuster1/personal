---
name: ai-research-digest
description: "Weekly scheduled routine only. Researches new AI patterns and tools from a fixed source list and writes a short report to research/. Do not use in normal sessions."
disable-model-invocation: true
---

Run once per week, unattended. Read-only on the web, write only inside `research/`. Never apply a suggestion. No em dashes anywhere.

## Sources (last reviewed 2026-10-22)

| source | fetch |
|---|---|
| Simon Willison | `https://simonwillison.net/atom/everything/` |
| Ethan Mollick | `https://www.oneusefulthing.org/feed` |
| Anthropic engineering | `https://www.anthropic.com/engineering` (index page, no feed) |
| Anthropic news | `https://www.anthropic.com/news` (index page, no feed) |
| Ben AI (YouTube) | `https://www.youtube.com/feeds/videos.xml?channel_id=UC3KK7ENB_ierAXvrxVNnbZQ` |
| Karpathy | `https://karpathy.github.io/feed.xml` (blog feed; last post Feb 2026, so many quiet weeks are normal). His YouTube feed (`channel_id=UCXUPKJO5MZQN11PqgIvyuvQ`) last posted Feb 2025. X is not fetchable |

If a fetch fails (non-200, block, timeout), try `curl -sL https://r.jina.ai/<url>` once, then record "unreachable" for that source and move on. Do not retry further or work around it.

## Steps

1. **Read history.** Read the 3 newest files in `research/` (not the README). Skip anything already reported. Note which suggestions Matt accepted or rejected if a report records it.
2. **Fetch** each source. Keep items from the last 8 days.
3. **Screen.** An item is kept only if it passes at least one of three yes/no tests: (a) would it improve how Matt's own setup works (his skills, hooks, agents, CLAUDE.md, routines), (b) could a consulting client use it in their work, (c) would someone who wants to stay current on how people work with AI want to know it. An item that passes only (c) goes under "Worth knowing". Drop the rest. Prefer concrete techniques, tools and workflows over opinion and news.
4. **Transcripts (video only).** For at most 2 kept YouTube items, call the YouTube transcript tool (`get_youtube_transcript`). Only for videos under about 30 minutes. A longer video, a failed call, or a missing tool means use the title and description only, and say "transcript unavailable" on that item. Never retry. Ignore sponsor reads, course pitches and "link in the description" promos.
5. **Write each kept item** with: title and link, what it is (1 sentence), why it matters (2 sentences, grounded in what the source actually says; mark anything you inferred as inferred), and a **Suggested change** line (required for items that pass (a) or (b); omit for "Worth knowing" items) naming the exact file in this repo or the exact setup change it would touch (a skill, a hook, an agent, or `claude/CLAUDE.md`). An (a) or (b) item with no concrete target is moved to "Worth knowing" if it passes (c), else dropped. Before writing it, read the named file and any file it points to (for example an agent's rules). Drop the item if the file already requires the behavior, even in different words. When citing a post, link the post itself, not an index page. Add a **Client angle** line only when test (b) applies; keep it generic, never name a company, customer or industry.
6. **Write the report** to `research/YYYY-MM-DD.md` (today's date, Eastern). Sections: Kept items (best first, at most 5), Worth knowing (items that pass only (c); at most 3; each is title and link, one sentence on what it is, one sentence on why it is worth knowing; prefer concrete practices from a named source over opinion or news), Sources that yielded nothing this week, Unreachable sources, Decisions from last report (leave "pending" for Matt to fill). A quiet week gets a short report. Never pad.
7. **Stale-source flag.** If a source has yielded nothing in the last 8 reports (check history), list it under "Consider removing".
8. **Retention.** Delete report files in `research/` older than 12 weeks. Git history keeps them.
9. **Commit.** Commit `research/` changes straight to `main` and push. If the push is rejected or fails, do not branch or work around it: print the full report text in your final output and say the push failed.

10. **Notify.** If the report has any Kept items or Worth knowing items, send one PushNotification (it reaches Matt's phone and email) after the commit and push, with the summary in `<routine_summary>` tags: the best item first, then one line per remaining item, then the report path. A report with nothing kept sends no notification. This is not Gmail; never create a Gmail draft or send email.

## Final output

Two lines: how many items kept, and the single best Suggested change.
