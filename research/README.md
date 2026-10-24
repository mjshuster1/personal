# research

Weekly reports from the `ai-research-digest` routine. One file per run,
`YYYY-MM-DD.md`. The routine reads the last 3 before each run so it does not
repeat itself, and deletes anything older than 12 weeks (git history keeps
them).

`PRACTICES.md` is the permanent log of every practice raised: in force,
rejected (with the reason) or pending. It is the only place decisions are
recorded, and it is never deleted.

The practices page (https://claude.ai/artifact/AbtqiddBgZAihumMLiyAXX, private) is a
view of that log. `node research/practices-page.js <out.html>` builds it from
`PRACTICES.md` and `practices-page.template.html`; publish the output to the
same page whenever the log changes.

Not copied into sessions.
