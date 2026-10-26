---
name: composio-google
description: How to read Matt's venture and personal Gmail and Google Drive through Composio. Load before any Composio Gmail or Drive call, or when a task needs venture email or files from the advisory or personal accounts.
---

# Composio: Gmail and Drive

Venture mail and files are read through Composio. The Gmail and Drive
connectors (not Composio) are the Cuepri accounts; don't use them for
venture work.

## Accounts

Verified 2026-10-26 with `COMPOSIO_MANAGE_CONNECTIONS` (action `list`).

| Use | Gmail alias | Drive alias | Address |
|---|---|---|---|
| Venture | `gmail-advisory` | `drive-advisory` | matt@shusteradvisory.com |
| Personal | `gmail-personal` | `drive-personal` | mjshuster1@gmail.com |
| Day job, off limits | `gmail-get.cuepri` | none | matt@get.cuepri.com |

Composio's search results say to select an account by its `id`, not its
alias. Ids change when an account is reconnected, so list first and read
the id off the alias.

## Rules

1. Name the account on every call. Composio's default Gmail account is the
   Cuepri inbox. Never run a Gmail call without an explicit account id.
2. Never use `gmail-get.cuepri` through Composio. The `matt@cuepri.com`
   mailbox is read only through the Gmail connector, for venture matches
   per the day-job rule in the consultant-workspace repo.
3. Before the first call in a session, list connections for the toolkit.
   Confirm the account you need is active and its address matches the
   table. If not, stop and tell Matt; don't fall back to another account.
   If the table is out of date, say so and fix it in the same change.
4. Read only unless Matt asks for more in the same request. No send,
   draft, label, archive, delete, share or move. Never create a Gmail
   draft; email drafts go in chat.
5. No workbench or bash tools for mail or files. Don't guess tool slugs;
   look them up with `COMPOSIO_SEARCH_TOOLS`.

## Gmail

- Search with `GMAIL_FETCH_EMAILS`: `include_payload: false`,
  `verbose: false`, a query (sender, subject, `newer_than:`) and an explicit
  `max_results` (its default is 1). Page with `page_token` until none is
  returned; an empty string means done. The daily CRM routine's exact
  settings are in consultant-workspace's `ops/crm-daily.md`.
- Results are not sorted by recency. Sort by `internalDate`.
- To confirm which mailbox an account id reaches, use `GMAIL_GET_PROFILE`.
- Don't use `GMAIL_FETCH_MESSAGE_BY_THREAD_ID`: the payload is large and
  lands in Composio's sandbox. If a response lands there, retry with
  `max_results: 1`.

## Drive

- Same account rule. `GOOGLEDRIVE_GET_ABOUT` shows which account a call
  would hit.
- Search with `GOOGLEDRIVE_FIND_FILE` (Drive query syntax in `q`; add
  `trashed = false`; page with `pageToken`). Confirm a match with
  `GOOGLEDRIVE_GET_FILE_METADATA`, then read one file with
  `GOOGLEDRIVE_DOWNLOAD_FILE`. For a Google Doc, set `mime_type` to
  `text/plain` or `text/markdown`; the default is PDF.
- `downloaded_file_content` can come back as a URL, not inline text.
- Client files may hold PHI. Don't copy file contents into a repo unless
  Matt asks, and screen them first per the repo's PHI rule.
