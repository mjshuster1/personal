# Handoff: Nvidia event tree (written Mon Nov 16, 2026, 10:20 PM ET)

## Goal

Matt is deciding whether and when to put $10,000 into Nvidia (NVDA) after Jensen
Huang's Nov 12 resignation. He wants a step-by-step model of what happens next,
with odds, and an update after earnings on Tue Nov 17 (release about 4:20 PM ET,
call 5:00 PM ET).

## Done

- Read the Nov 16 Prof G Markets episode (YouTube NWqr0nv4UyQ) in full, plus two
  all three earlier episodes (G4ixfbVQzBc, r50vLZ7aF1k, EowC_gXjpVA).
- Eight research agents: other podcasts, chip exports, Nvidia numbers, financing
  chain, Southeast Asia supply, Washington sequence, precedent timelines.
- Published the event tree page: https://claude.ai/artifact/8M7xcS8DJikAz4xtmM4Aht
  (source was in the session scratchpad, which is gone; read the artifact to edit it).

## The model as it stands (Nov 16 close $156.14; $151.09 at 10:46 AM ET Nov 17, before earnings)

Scenarios, 12 months out, on FY2028 consensus EPS of $15.93 (year ending Jan 2028):

| Scenario | Odds | EPS | Multiple | Price | Midpoint |
|---|---|---|---|---|---|
| Clean break | 26% | $15.30 | 12x to 15x | $184 to $229 | $206.5 |
| Slow grind | 34% | $14.30 | 9.5x to 11.5x | $136 to $165 | $150 |
| Company implicated | 12% | $13.40 | 8x to 9.5x | $107 to $127 | $117 |
| AI spending turns | 22% | $9.50 to $11 | 9x to 12x | $86 to $132 | $107 |
| Huang returns | 6% | $15.93 | 13x to 15x | $207 to $239 | $223 |

Weighted value about $156. Odds higher in a year about 48% at $151.09. Odds moved Nov 17 after the Ramp data (business AI spend flat since August; top 1% of companies are 80% of spend on OpenAI and Anthropic, mostly venture-backed).

Two-year view (added Nov 17; on the page as a switch), on FY2029 consensus EPS of
$21.34 (38 analysts, read Oct 19, before the scandal): Huang returns 5%, $299 to
$341; Clean break 22%, $264 to $325; Slow grind 31%, $157 to $198; Company
implicated 10%, $120 to $150; AI spending turns 32%, $83 to $130. Weighted about
$183; odds higher in two years about 58%.

Price at 1:40 PM ET Nov 17: $153.51. Headlines that day, not read in full: Huang
says he is open to returning; WSJ says Heidrick is running the CEO search and
Arm's CEO is a candidate. Matt asked whether to buy before the call; advice given
was no more than a third before, rest after.

Fork odds: January-quarter guide holds near $124B 60%; board answers Bessent by
Nov 25 85%; stock low in the Dec 3 to mid-Dec window 55%; below $140 before
year-end 40%, below $125 20%; above $163 at Dec 31 35%; Lutnick out by mid-Feb
45%; permanent CEO outsider 50 / Kress 35 / other insider 10 / Huang 5; a big
neocloud breaks in 2027 35%; legal end state is a fine plus audits 75%.

Buy plan told to Matt: alerts at $135 and $170, no resting order through
earnings; first third to half if the guide holds and price is under $170, or on
a fear-driven drop to $135 with the guide intact; rest spread through
mid-December; $135 is a first-tranche level, since the precedent median points
to about $121.

## Left

1. After the Nov 17 release: read it against the model. Check the January-quarter
   guide (Street about $124B), what Kress says about customer financing, days to
   collect receivables (was about 60, up from 45), supply commitments (was $279B),
   inventory (was $31.6B), and the geography table. Tell Matt which row of the
   buy table he is in, then update odds and republish the page to the same URL.
2. Optional, only if Matt asks: proper transcripts of other podcasts.

## Decisions

- Matt chose option A: run the four ripple-effect threads on Nov 16, update after
  earnings.
- Research agents run on Sonnet; analysis and the page stay on the main model.

## What failed

- The YouTube transcript connector allows 10 requests a day on Matt's key (its
  own error message; resets 00:00 UTC). Two agents hit the cap.
- curl gets 403 or 429 from SEC EDGAR, CNBC, Axios, Yahoo, Fortune and The Hill.
  WebFetch reads stockanalysis.com, sec.gov archive pages and bis.gov. Nvidia's
  10-Q geography and guarantee notes were never read directly.
- WebSearch summaries were sometimes stale (one said Huang was still CEO).
- Unverified podcast claims: "$80B of chips into Southeast Asia this year" (Epoch
  AI shows about $19B over four years) and "lab contract share fell from 80% to
  39%" (JPMorgan says 28% of announced lab compute deals).

## Kickstart prompt

```
First, check that ~/.claude/CLAUDE.md contains 'Session names'. If it doesn't, Matt's rules aren't installed in this environment: tell Matt in one line before any other work.

Set this session's title to "Nvidia Event Tree: Earnings Update" with set_session_title. Then read handoffs/handoff-nvidia-event-tree-2026-11-16.md in mjshuster1/personal, delete it and commit the delete. I'm deciding when to buy Nvidia. First action: read Nvidia's Nov 17 earnings release against the model in the handoff, tell me which row of the buy table I'm in, then update the odds and republish the event tree page at https://claude.ai/artifact/8M7xcS8DJikAz4xtmM4Aht.
```
