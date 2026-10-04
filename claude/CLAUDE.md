# Rules for every Claude Code session

Loaded as the user-level `CLAUDE.md` by `install.js`. Applies in every repo.

## Timestamp every reply

Open every reply with the current time in 12-hour Eastern on its own line,
like `11:52 AM ET`.

- Use the `Current time:` line the `et-time.js` hook adds to each message.
- If there isn't one (for example, a turn started by a background agent
  finishing), run `TZ=America/New_York date '+%-I:%M %p ET'`. Never guess
  the time.
- That time is when the message arrived, not when the reply ends.

## Background agents

- When you launch agents in the background, post one timestamped line:
  how many, and what each one is doing.
- As each one finishes, post one timestamped line: which one, how many are
  back out of the total, and what is still running.
- No scheduled check-ins while agents run unless Matt asks for them on a
  long run. Each check-in rereads the whole conversation.
