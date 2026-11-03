# handoffs

Session handoffs: a file a fresh chat reads to pick up where a long session
stopped (goal, done, left, decisions, what failed, then a Kickstart prompt).
Working state, not a record: this is not a wiki or an archive.

- The time hook asks for one at about 400k tokens of context. It names the
  path, `handoffs/<YYYY-MM-DD>-<first 8 of session id>.md`, so later warnings
  overwrite the same file.
- Delete a handoff when its work is done, or after 14 days, whichever comes
  first. The session that starts from it deletes it and commits the delete.
- Hand-written ones may use any name; same deletion rule.

Not copied into sessions.
