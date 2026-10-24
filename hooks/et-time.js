#!/usr/bin/env node
// UserPromptSubmit hook, registered by install.js: adds "Current time: 11:52 AM ET"
// and "Today (ET): Tuesday, October 20, 2026" to Claude's context on each
// message. When the session context is large and its prompt cache is warm it adds
// one more line telling Claude to offer a handoff (see contextNote). Always exits
// 0, so a broken clock or transcript never blocks a prompt.
// The transcript format is internal to Claude Code, so this is best-effort and
// fails silent. To re-check after a Claude Code update: pipe
//   {"transcript_path":"<a long session .jsonl>","session_id":"x"}
// into this script; a session of 250k+ tokens should print a third line.
// A Stop-hook "Finished" line was tried 2026-10-04 and dropped: the Claude app
// didn't display it.
// Single file on purpose: install.js copies only this file into cloud sessions.
const fs = require('fs');
const os = require('os');
const path = require('path');

const WARN_AT = 250000;     // tokens: offer a handoff once the context reaches this, while the cache is warm
const WARN_STEP = 100000;   // tokens: warn again only after this much further growth
const TTL_MIN = { '1h': 60, '5m': 5 };
const TAIL_STEPS = [1, 4, 16].map(m => m * 1024 * 1024); // widen only if no assistant turn is in the tail

function readTail(file, bytes) {
  const fd = fs.openSync(file, 'r');
  try {
    const size = fs.fstatSync(fd).size;
    const len = Math.min(size, bytes);
    const buf = Buffer.alloc(len);
    fs.readSync(fd, buf, 0, len, size - len);
    const text = buf.toString('utf8');
    return size > len ? text.slice(text.indexOf('\n') + 1) : text; // drop the partial first line
  } finally { fs.closeSync(fd); }
}

// Newest main-thread assistant turn with usage: {ctx, ts, tier}. The transcript
// format is internal to Claude Code and may change; anything unexpected gives null.
function lastTurn(text) {
  const lines = text.split('\n');
  let found = null, tier = null;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (!lines[i]) continue;
    let d; try { d = JSON.parse(lines[i]); } catch (e) { continue; }
    const m = d && d.message;
    if (!d || d.isSidechain || !m || m.role !== 'assistant' || !m.usage || !d.timestamp) continue;
    const u = m.usage, cc = u.cache_creation || {};
    const t = (cc.ephemeral_1h_input_tokens || 0) > 0 ? '1h' : (cc.ephemeral_5m_input_tokens || 0) > 0 ? '5m' : null;
    if (!found) {
      const ctx = (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0);
      const ts = Date.parse(d.timestamp);
      if (!isFinite(ts) || !ctx) continue;
      found = { ctx, ts };
    }
    if (t) { tier = t; break; }
    if (i < lines.length - 400) break;
  }
  if (!found) return null;
  found.tier = tier || '5m'; // tier unknown: assume the shorter lifetime
  return found;
}

function statePath(sid) {
  return path.join(os.tmpdir(), 'claude-ctxwatch-' + String(sid).replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 64) + '.json');
}

// One line for Claude, or '' when there is nothing to say. Fires only while the
// cache is warm (writing a handoff is cheap then; after an idle gap the next reply
// pays for the rewrite anyway, so the warning waits for the following prompt) and
// repeats only after WARN_STEP of growth. The state file is disposable temp data.
function contextNote(input, nowMs) {
  if (!input || !input.transcript_path) return '';
  let t = null;
  for (const bytes of TAIL_STEPS) { t = lastTurn(readTail(input.transcript_path, bytes)); if (t) break; }
  if (!t) return '';
  const k = n => Math.round(n / 1000) + 'k';
  const sp = statePath(input.session_id || 'nosession');
  let st = {}; try { st = JSON.parse(fs.readFileSync(sp, 'utf8')); } catch (e) {}
  const idleMin = (nowMs - t.ts) / 60000;
  const cold = idleMin > TTL_MIN[t.tier];
  let line = '';
  if (t.ctx < WARN_AT) st.level = 0; // reset after a compaction or handoff
  if (!cold && t.ctx >= WARN_AT && !(st.level && t.ctx < st.level + WARN_STEP)) {
    line = `Context is about ${k(t.ctx)} tokens and the cache is warm. If the work is not nearly done, offer a handoff once, now while it is cheap.`;
    st.level = t.ctx;
  }
  try { fs.writeFileSync(sp, JSON.stringify(st)); } catch (e) {}
  return line;
}

try {
  const now = new Date();
  const t = now.toLocaleTimeString('en-US', {
    timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit',
  }) + ' ET';
  // The date too: cloud sessions report "today" in UTC, a day ahead in the evening.
  const d = now.toLocaleDateString('en-US', {
    timeZone: 'America/New_York', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
  let extra = '';
  try {
    let input = null;
    if (!process.stdin.isTTY) input = JSON.parse(fs.readFileSync(0, 'utf8'));
    extra = contextNote(input, now.getTime());
  } catch (e) {}
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: `Current time: ${t}\nToday (ET): ${d}` + (extra ? '\n' + extra : '') },
  }));
} catch (e) {}
process.exit(0);
