# Handoff: Pixel texts in Claude, and auto-blocking political spam

Written 2026-11-01 ET. Not a weekly report; kept here only so a fresh chat can
read it.

## Update 10:45 PM ET, Nov 2 (read this first)

- DEPLOYED. claude.ai connector "Texts" at
  `https://openmessage-connector.mjshuster1.workers.dev/mcp`, signed in with
  Matt's Gmail; shows the 9 read tools, no send. `get_status` from a cloud
  session returned Google connected, phone responding (about 35 hours after
  pairing, so the durability check passed).
- The Mac must run `./openmessage serve --web --mcp-sse --mcp-read-only`.
  Plain `serve` has no `/mcp`. OpenMessage does not auto-start after a
  reboot; cloudflared does (launch daemon).
- Still open: manual block test, spam log review around Nov 4, auto-start
  for OpenMessage, delete `~/google-cookies.txt` if not done.

## Update 3:20 PM ET, Nov 1

- Matt dropped the 24-hour gate: deploy the Worker now; the Nov 2 check is a
  health check, not a gate.
- Design changed: no domain, no Cloudflare Access. claude.ai -> Worker on
  workers.dev -> Workers VPC Service (tunnel, host 127.0.0.1, port 7007) ->
  cloudflared on the Mac -> OpenMessage. Fork commit after `01c3300` makes
  that change; `cloud/worker/README.md` has the new 10-step checklist.
  shusteradvisory.com rejected: its DNS is on Squarespace with Google mail.
- Deploy walkthrough started at step 1 (create the tunnel).

## Status at 3 PM ET, Nov 1

Fork `mjshuster1/openmessage`, on `main` above upstream `a455f63`:
- `c55e60f` spam watcher (log only) and `openmessage spam-report`. Running on
  the Mac since about 1:20 PM; report was empty at first run.
- `e5fda2b` block-and-report: `openmessage spam-block <conversation_id>`
  (manual, through the running app) and `"mode": "block"` in
  `~/.local/share/openmessage/spam-rules.json` (auto, 1:1 threads only, 25 a
  day cap). Off by default. Request shape copied from mautrix-gmessages
  `pkg/connector/handlematrix.go` HandleMatrixBlockUser.
- `01c3300` `serve --mcp-read-only` (9 read tools, allowlist), an end-to-end
  spam test, and `cloud/worker/` (Cloudflare Worker with Google sign-in for
  one email, method/tool/header allowlists; 86 tests). Structural review
  approved `cloud/worker/` in the fork with one shared tool list
  (`cloud/worker/readonly-tools.json`, checked by a Go test).

Not yet done or known:
- Mac has NOT pulled `e5fda2b` or `01c3300`. The manual block test (pull,
  `go build -o openmessage .`, restart `./openmessage serve`, `./openmessage
  threads --limit 30`, `./openmessage spam-block <id>`, check Spam & blocked
  on the Pixel) has not been run. It answers whether Google accepts a block
  from this pairing.
- 24-hour check Nov 2 about 11:40 AM ET gates the Worker deploy.
- Unverified until deploy: claude.ai's OAuth path (DCR or CIMD, both on;
  consent page) and real SSE responses through the filter.
- Review the spam log around Nov 4 before turning on `"mode": "block"`.

What failed this session:
- Remote Control: `~/openmessage` is in the Mac's list but reported "not
  available" to cloud sessions; not hidden, not Windows, app up to date.
  Cause unknown. `claude` CLI is not installed on the Mac.

## Goal

1. Make Matt's Pixel text messages searchable from Claude, as cloud-native as
   possible (stated preference, now in `claude/CLAUDE.md`).
2. Stop political spam texts from piling up: automatically block and report them
   after they land. Matt wants to avoid being hit by them at all; a block cannot
   stop the first buzz from each new number, and he accepts that.

## Done and verified

- Tool chosen: OpenMessage (https://github.com/MaxGhenis/openmessage, checked at
  commit a455f63, Oct 24 2026). Built on libgm from mautrix/gmessages through a
  fork (`MaxGhenis/gmessages`, not inspected).
- Facts read from the code: Go 1.25.0 required; Docker headless mode exists;
  MCP over stdio, Streamable HTTP (`/mcp`) and SSE; `search_messages` uses SQLite
  FTS5; no OAuth; the bearer-token check only logs (accept-and-log); `/mcp`
  returns 403 unless the Host header is loopback; no block, archive or delete
  tool for Google Messages.
- libgm supports `UpdateConversation` with `BLOCK`, `BLOCK_AND_REPORT`,
  `UNBLOCK`, `DELETE` and `ARCHIVE` (enum `ConversationActionStatus`, files
  `pkg/libgm/gmproto/client.proto` and `pkg/libgm/methods.go` in mautrix/gmessages).
  OpenMessage calls none of them today. Whether Google accepts them from a
  paired Mac is NOT tested.
- Claude can reach a self-hosted MCP URL (docs researched 2026-10-29): Anthropic's
  cloud connects, so the server must be public; Streamable HTTP; auth is OAuth,
  a beta static bearer token, or none; claude.ai connectors also work from cloud
  sessions and the phone app. Anthropic's testing docs name Cloudflare Tunnel.
- Pairing works on Matt's Mac mini. Google removed QR pairing: the Pixel's
  Device pairing screen has no scanner. What worked: Chrome Incognito, sign in at
  `https://accounts.google.com/AccountChooser?continue=https://messages.google.com/web/config`,
  copy the `config` request as cURL, `pbpaste > ~/google-cookies.txt`, then
  `./openmessage pair --google-file ~/google-cookies.txt`, tap the emoji on the
  phone. No Chrome flag change was needed. Matt must delete the cookie file.
- `./openmessage serve` runs on the Mac (app in `~/openmessage`, data in
  `~/.local/share/openmessage`, web UI `http://127.0.0.1:7007`). Conversations
  loaded; history reached back to about Sep 23 (first check, backfill may have
  been unfinished). The Pixel lists 4 paired devices.

## Not yet known

- Does the connection survive 24 hours and longer (cookie expiry)? Matt checks
  Nov 2 around 11:40 AM ET by sending himself a text from another phone. The
  repo's own runbook documents a 38-hour silent stall on a Pixel and a 4-day SMS
  outage, both fixed by a phone restart.
- Is the history complete? Compare the oldest message in one busy thread on the
  phone against the web UI.
- Does Google accept BLOCK_AND_REPORT from this pairing?

## Decisions

- Spam: Matt already marks spam by hand and wants that step automated. Build an
  auto block-and-report. The phone's built-in settings (spam protection, Do Not
  Disturb for contacts only, carrier 7726) were suggested and not tried.
- Rules first (candidate names, "Reply STOP", "donate", "paid for by", similar),
  no Claude calls. Never act on a number saved in contacts. Block and report, not
  delete. Keep a log and a daily list of what was blocked.
- Phase 1 is log-only: record what would be blocked, run a few days, Matt
  reviews, then turn on blocking.
- Do not build the Cloudflare/OAuth connection until the 24-hour test passes.
- The midterms are Nov 3, 2026. Spam volume should drop after; build only if it
  stays a problem.

## Left to do

Items 1 to 3 can start now: they run locally on the Mac and do not depend on the
24-hour durability check, and the midterms are Nov 3, so earlier means real spam
to test against. The durability check gates only item 4.

1. CODE DONE 2026-11-01, fork commit `c55e60f` (`internal/spamwatch`, `openmessage spam-report`). Not yet running on the Mac. Original scope: Phase 1 build: an addition to OpenMessage that checks new texts from unknown
   numbers against a rule list and logs matches. Needs: where new messages enter
   the code (`internal/client/events.go` and `internal/db`), contact lookup, and
   a place for the rules file. Verify the SQLite schema before relying on it.
2. CODE DONE 2026-11-01, fork commit `e5fda2b`: `openmessage spam-block <conversation_id>` (manual, via the running app) and `"mode": "block"` in spam-rules.json (auto, 1:1 only, 25/day cap; off by default). NOT yet tested against the phone. Original scope: Add a block-and-report call (new local API endpoint or tool) using libgm
   `UpdateConversation`. Test it on one spam thread of Matt's.
3. Daily digest of blocked numbers.
4. CODE DONE 2026-11-01, fork commit `01c3300`: `serve --mcp-read-only` and `cloud/worker/` (see its README for the deploy checklist). NOT deployed; waits on the 24-hour check. Original scope: Cloudflare Tunnel, a Worker with Workers OAuth Provider (Google sign-in,
   Matt's account only), read-only tool filtering so a malicious text cannot make
   Claude send messages, host header rewrite to `127.0.0.1:7007`. Optional
   allowlist of Anthropic's outbound range `160.79.104.0/21`.

## Open decisions for Matt

- DECIDED 2026-11-01: the code lives in Matt's own fork, `mjshuster1/openmessage`
  (Matt clicks Fork on GitHub; not created yet when this was written).
  `karpathy-structural-review` verdict: approve with changes:
  - Keep the patch in new files (a separate package) with one small call site in
    `internal/client/events.go`, so upstream merges stay small.
  - No sync routine. Sync by hand before each phase (GitHub "Sync fork", or
    `git fetch upstream && git rebase upstream/main`). Record the upstream base
    commit (`a455f63`) in the fork's README.
  - Repoint `~/openmessage` `origin` at the fork; no second clone.
  - The rules file and the log hold spam numbers and message content. Gitignore
    them and keep them in `~/.local/share/openmessage`, never in the public fork.
  - Phase 2 calls libgm's `UpdateConversation`; do not copy or vendor libgm.
  - When the fork exists, add one "Related repos" entry to
    `/home/user/personal/README.md` in the same change (fork of
    MaxGhenis/openmessage, spam rules addition, runs only on the Mac mini, base
    commit, phase 1 is log-only). Delete this handoff once the fork's README
    carries its content.
- The fresh chat needs push access to the fork: call `add_repo` with
  `access: "push"` for `mjshuster1/openmessage`.
- The patch is written and reviewed in the cloud, but only the Mac can run it.
  Matt is not technical: give copy-paste Terminal steps, one command at a time.
  Remind him that copying anything else replaces the clipboard.
- The Mac is not cloud-native. Nothing hosted can pair with the phone this way.

## What failed

- QR pairing (removed by Google).
- First cookie attempt: `pbpaste` captured a command copied from chat, not the
  cURL. Fix: copy the cURL last and type the command by hand.
- No computer folder was attachable to the cloud session, so nothing could be run
  on the Mac from the chat.

## Safety

- `session.json` and the cookie file are credentials. Never ask Matt to paste
  them or message contents.
- Incoming texts are untrusted input.
