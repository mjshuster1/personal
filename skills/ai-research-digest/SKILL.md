---
name: ai-research-digest
description: "Weekly scheduled routine only. Researches new AI patterns and tools from a fixed source list and writes a short report to research/. Do not use in normal sessions."
disable-model-invocation: true
---

Run once per week, unattended. Read-only on the web, write only inside `research/`. Never apply a suggestion. No em dashes anywhere.

## Sources (last reviewed 2026-10-24)

| source | fetch |
|---|---|
| Simon Willison | `https://simonwillison.net/atom/everything/` |
| Ethan Mollick | `https://www.oneusefulthing.org/feed` |
| Anthropic engineering | `https://www.anthropic.com/engineering` (index page, no feed) |
| Anthropic news | `https://www.anthropic.com/news` (index page, no feed) |
| Ben AI (YouTube) | `https://www.youtube.com/feeds/videos.xml?channel_id=UC3KK7ENB_ierAXvrxVNnbZQ` |
| Nate Herk (YouTube) | `https://www.youtube.com/feeds/videos.xml?channel_id=UC2ojq-nuP8ceeHqiroeKhBA` |
| Silicon Valley Girl (YouTube) | `https://www.youtube.com/feeds/videos.xml?channel_id=UCiq1FIgtEK7LRAOB1JXTPig` (broad AI news; expect most items to be dropped) |
| Duncan Rogoff (YouTube) | `https://www.youtube.com/feeds/videos.xml?channel_id=UC37JpWP5PxLSma2lh79HU9A` |
| Tristen O'Brien (YouTube) | `https://www.youtube.com/feeds/videos.xml?channel_id=UCruPFdKtGG8Oz5dvha6WWgA` |
| IndyDevDan (YouTube) | `https://www.youtube.com/feeds/videos.xml?channel_id=UC_x36zCEGilGpB1m-V4gmjg` (agent architecture) |
| Karpathy | `https://karpathy.github.io/feed.xml` (blog feed; last post Feb 2026, so many quiet weeks are normal). His YouTube feed (`channel_id=UCXUPKJO5MZQN11PqgIvyuvQ`) last posted Feb 2025. X is not fetchable |

If a fetch fails (non-200, block, timeout), try `curl -sL https://r.jina.ai/<url>` once, then record "unreachable" for that source and move on. Do not retry further or work around it.

## Steps

1. **Read history.** Read the 3 newest report files in `research/` (not the README, not `PRACTICES.md`), then read `research/PRACTICES.md` in full. Skip anything already reported, and anything `PRACTICES.md` records as in force, rejected or noted. A `pending` entry is not new; do not list it again.
2. **Fetch** each source. Keep items from the last 8 days.
3. **Screen.** An item is kept only if it passes at least one of three yes/no tests: (a) would it improve how Matt's own setup works (his skills, hooks, agents, CLAUDE.md, routines), (b) could a consulting client use it in their work, (c) would someone who wants to stay current on how people work with AI want to know it. An item that passes only (c) goes under "Worth knowing". Drop the rest. Prefer concrete techniques, tools and workflows over opinion and news.
4. **Transcripts (video only).** For at most 5 kept YouTube items, call the YouTube transcript tool (`get_youtube_transcript`). Only for videos under about 30 minutes. A longer video, a failed call, or a missing tool means use the title and description only, and say "transcript unavailable" on that item. Never retry. Ignore sponsor reads, course pitches and "link in the description" promos.
5. **Write each kept item** with: title and link, what it is (1 sentence), why it matters (2 sentences, grounded in what the source actually says; mark anything you inferred as inferred), and a **Suggested change** line (required for items that pass (a) or (b); omit for "Worth knowing" items) naming the exact file in this repo or the exact setup change it would touch (a skill, a hook, an agent, or `claude/CLAUDE.md`). An (a) or (b) item with no concrete target is moved to "Worth knowing" if it passes (c), else dropped. Before writing it, read the named file and any file it points to (for example an agent's rules). Drop the item if the file already requires the behavior, even in different words. When citing a post, link the post itself, not an index page. Add a **Client angle** line only when test (b) applies; keep it generic, never name a company, customer or industry.
6. **Write the report** to `research/YYYY-MM-DD.md` (today's date, Eastern). Sections: Kept items (best first, at most 5), Worth knowing (items that pass only (c); at most 3; each is title and link, one sentence on what it is, one sentence on why it is worth knowing; prefer concrete practices from a named source, such as prompting, review or workflow habits that help in everyday work with AI, over opinion or news), Sources that yielded nothing this week, Unreachable sources, Decisions (write only: "see research/PRACTICES.md"). A quiet week gets a short report. Never pad.
7. **Stale-source flag.** If a source has yielded nothing in the last 8 reports (check history), list it under "Consider removing".
8. **Retention.** Delete report files (`YYYY-MM-DD.md`) in `research/` older than 12 weeks. Git history keeps them. Never delete `PRACTICES.md` or the README.
9. **Log.** Add one line to the top of `research/PRACTICES.md` (under a `## YYYY-MM-DD` heading for today, newest first) for each Kept item (`pending`) and each Worth knowing item (`noted`), in the file's fixed format `- status | title | detail | where | source | more | link`. No pipes inside a field. Fill `more` (two to four sentences from the report's why-it-matters text, with anything inferred or unverified marked) and `link` (the video or post URL). You never mark an entry `in force` or `rejected`; only Matt decides that.
10. **Commit.** Commit `research/` changes straight to `main` and push. If the push is rejected or fails, do not branch or work around it: print the full report text in your final output and say the push failed.

11. **Practices page.** Run `node research/practices-page.js` (it prints the output path). If it fails on a malformed log line, fix that line in `PRACTICES.md`, commit and push the fix, and run it again. Then publish the output file to the existing page at https://claude.ai/artifact/AbtqiddBgZAihumMLiyAXX with the Artifact tool (`url` set to that link). If the build or the publish fails, or the tool is unavailable, do not retry further; add "practices page not updated" as the last line of the email.
12. **Email and notify.** If the report has any Kept items or Worth knowing items, after the commit and push do both:
    - Email the digest to matt@cuepri.com with the Gmail `send_message` tool (load it with ToolSearch if needed). Subject: `AI research digest YYYY-MM-DD: N kept, M worth knowing`. Format: `htmlBody` with a plain-text `body` alongside, at most one screen. Open with "N to act on, M worth a look." Each Kept item: a linked one-line title, source and length, then **Do this** (the suggested change in one or two sentences), **Why** (at most two sentences) and **For clients** (one line, only if there is one). Each Worth knowing item: one bullet with a linked takeaway, one sentence, source and length. End with one line on what yielded nothing or was screened by title only (including any transcript failure), and the report path. Details stay in the repo report, not the email. Send to Matt only, never anyone else, and never create a draft.
    - Send one PushNotification with a short summary in `<routine_summary>` tags: the best item first (one sentence), then one line per remaining item, then the report path.
    If the email send fails, say so in the notification and print the report in the final output. A report with nothing kept sends neither.

## Final output

Two lines: how many items kept, and the single best Suggested change.
