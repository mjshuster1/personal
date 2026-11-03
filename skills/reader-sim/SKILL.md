---
name: reader-sim
description: Simulate busy real-world readers getting an email for the first time, to test whether it lands before it goes out. Simulated readers see it in a phone inbox among other mail, get one screen at a time only when they scroll, run on a time budget, can be interrupted, then take a memory quiz. Scores each version (original, rewrite, a tight control) on comprehension, must-know items, and how far readers got. Use when Matt asks to "simulate readers", "run the reader sim", "test this email on directors", "would a busy [role] get this", or wants to know how far a reader gets before it's too much. Ships with an example audience of behavioral health clinical directors; any audience works.
---

# Reader sim

Tests how an email lands with busy readers, not what a reviewer thinks of it.
On its first test, a long announcement scored 25% on must-know items; an
action-first rewrite and a tight control both scored 100%.

Scripts live in this skill's `scripts/` folder (in sessions,
`~/.claude/skills/reader-sim/scripts/`). They need Node and Playwright with
Chromium, which cloud sessions have. A local machine may need
`npm i playwright` and `npx playwright install chromium` once.

## When not to use
- Matt wants editorial feedback or a rewrite only: use `document-review` or `de-slop`.
- Matt wants a decision debated: use `expert-panel`.
- The email contains PHI or client details. Never put those in a simulation.

## Limits to state with every result
- Simulated readers are more diligent than people: they open nearly everything and rarely archive.
- Not checked against real readers' replies, so treat gaps between versions as directional.
- Small samples (1 to 2 runs per reader per version).

## Cost
About 70k tokens per reader run. Default is 3 versions x 3 readers x 1 run
(9 runs, about 650k). Say the run count and rough cost to Matt before starting;
`reps: 2` doubles it.

## Steps

1. **Work folder.** Make `<scratchpad>/reader-sim-<slug>/` and copy into it:
   `scripts/render.js`, `scripts/sim.js`, `scripts/report.js` and
   `defaults/inbox.json`, `defaults/personas.json` from this skill. The
   defaults are an example audience: clinical directors at behavioral health
   programs, with a fictional inbox. For any other audience, rewrite both for
   that reader; keep the one `"from": "TARGET"` row in inbox.json, which is
   where the email goes.

2. **Versions** in `emails/<name>.txt`: line 1 `Subject: ...`, line 2
   `From: Name (Org)`, then the body as plain text (`- ` and `1. ` lists,
   3-space indents for nesting, `**bold**`).
   - `original`: the email as written. If it has no subject, write a neutral
     one and tell Matt it was assumed.
   - `control`: always include one. Write the tightest version that still holds
     every must-know fact, action and date first, about 150 words. It shows
     whether the sim can tell good from bad: if the control doesn't clearly
     beat a weak original, say the sim isn't discriminating.
   - Any rewrite Matt wants tested. Replace `[CONFIRM]` placeholders with
     neutral wording so readers don't see them, and say so.

3. **Quiz** in `quiz.json`: `{"questions": [{"q": "...", "key": "...", "mustKnow": true}]}`.
   4 to 6 factual questions every version answers, phrased so they don't hint
   at the answer. Mark the 1 to 3 things the reader must act on as `mustKnow`.
   The harness asks two open questions first (summary, next step).

4. **Render.** In the work folder: `node render.js <name>` per version. Look at
   one `screens/<name>/full-1.png` and `skim-2.png` to check the layout.

5. **Run.** Call the Workflow tool with
   `scriptPath: <this skill>/scripts/workflow.js` and args
   `{dir, variants, personas: {A: "<who text>", ...}, reps, context}`, where
   `personas` comes from the work folder's personas.json and `context` is one
   line on who the sender is to the reader. Post the run count and what's
   running.

6. **Report** to Matt in chat: the grader's score tables, the behavior bullets,
   and the limits above. If he wants it kept, save the tables and email
   versions in the current repo where Matt says.

## How the harness works
- Inbox: email shown fourth of 12 in a phone inbox; reader opens, flags, archives or ignores.
- Screens: 390x844 phone view, released one at a time. Skim mode blurs all but the
  first seven words of each line and bold text.
- Time: budgets per reader (default 60s, 150s, 45s); read costs 20s, skim 6s.
- Interruptions: about half of runs, at a random early screen; reader returns
  3 hours later with half the budget, or doesn't.
- Grading is strict: hedged answers ("Nov 9 I think") score 0.
