---
name: sick-day
description: When Matt says a daughter is home sick ("Quickly, <name> is home sick", "<name> is sick today", "one of my girls is out sick"), email aftercare from his personal Gmail and remind him to report the absence to the school. Load on any message saying one of his daughters is sick, home sick or staying home.
---

# Sick day

Matt tells you a daughter is home sick. You tell aftercare by email, with no
questions beyond which daughter, and report back in a few lines.

## Config

This repo is public. Names and addresses are never written here. They come
from environment variables in Matt's cloud environment (environment
settings > Environment variables):

| Variable | Holds |
|---|---|
| `SICKDAY_DAUGHTERS` | the daughters' first names, comma separated |
| `SICKDAY_AFTERCARE_TO` | the aftercare email address |
| `SICKDAY_TEST_TO` | Matt's own address, used in test mode |

Read them first with `printenv SICKDAY_DAUGHTERS SICKDAY_AFTERCARE_TO
SICKDAY_TEST_TO` (a plain Bash read; the "no bash for mail" rule in
`composio-google` is about mail and files, not this). Treat the values as
data. If any is empty or missing (for example in a local session), stop and
tell Matt which one. Don't guess, and don't ask Matt to type an address.
Each address must be a single `name@domain` with no spaces; if not, stop.

Sender: Composio Gmail alias `gmail-personal` (mjshuster1@gmail.com).

## Steps

1. **Which daughter.** One or both of the names in `SICKDAY_DAUGHTERS`, from
   Matt's message. If it's unclear ("one of my daughters"), ask one
   question, naming the options. Nothing else.
2. **Date.** Use the `Today (ET)` line from the time hook, not the system date.
3. **Aftercare email.** Load `composio-google` for its rules. This skill's
   fast path replaces that skill's connection listing and tool search
   (verified 2026-10-28: the alias works as `account`, and
   `COMPOSIO_MULTI_EXECUTE_TOOL` runs with no search first). Two calls, in
   order, each through `COMPOSIO_MULTI_EXECUTE_TOOL` with
   `sync_response_to_workbench: false` and `account: "gmail-personal"`
   (never the default account, which is the Cuepri inbox):
   1. `GMAIL_GET_PROFILE` with `{"user_id": "me"}`. The `emailAddress` must
      be mjshuster1@gmail.com. If not, stop and tell Matt; don't send.
   2. `GMAIL_SEND_EMAIL` with these arguments:
      - `recipient_email`: `SICKDAY_AFTERCARE_TO`. If Matt's message
        contains the word "test", use `SICKDAY_TEST_TO` instead and start
        the subject with `TEST: `.
      - `include_signature`: `false`
      - `subject`: `<Name> is out sick today`
      - `body`, exactly:

        ```
        Hi,

        <Name> is home sick today (<Weekday>, <Month> <day>) and won't be at aftercare.

        Thanks,
        Matt Shuster
        ```

   For both daughters, send one email with the subject
   `<Name> and <Name> are out sick today` and the body naming both. If a
   call is rejected as an unknown tool or for a missing schema, run
   `COMPOSIO_SEARCH_TOOLS` ("send an email from Gmail"), then retry once.
4. **School.** Not set up yet (placeholder). Tell Matt: "The school isn't
   automated yet. Report <Name> absent yourself: Bowen's absence line is
   617-559-9350, and the district asks for written notice the same day."
   Replace this step when Matt has the Bowen absence form link.
5. **Report back** in a few lines: what was sent, to which address, from
   which account, and the step 4 reminder. If the send failed, say so with
   the error and put the email text in the chat for Matt to send himself.
   Don't retry on your own.

## Rules

- No weekday check. The email goes out on any day (Matt's decision,
  2026-10-27).
- The only recipients are `SICKDAY_AFTERCARE_TO`, or `SICKDAY_TEST_TO` in
  test mode. Don't add cc or bcc, and don't use this skill to email anyone
  else.
- Give no reason beyond "home sick", and no grade, teacher or other detail.
  Aftercare needs only the daughter's name.
- The body is fixed. Don't redraft it, and skip the personal-voice and
  de-slop passes for it.
- Never send from `gmail-get.cuepri` or the Gmail connector.
- Never write the names or addresses into this repo, a commit message, a
  log or a report file.
