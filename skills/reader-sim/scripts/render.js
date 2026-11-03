// Renders each email as a phone mail app: inbox screen + body screens (full and skim versions).
// Usage (from the work folder): node render.js <variant>
// Reads emails/<variant>.txt (line 1 'Subject: ...', line 2 'From: Name (Org)', then body) and inbox.json; writes screens/<variant>/.
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const W = 390, H = 844, STEP = 700; // viewport, scroll step (overlap keeps context)
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const lead = html => { // wrap first ~7 words so skim mode can show them
  const m = html.match(/^((?:\S+\s+){0,6}\S+)([\s\S]*)$/); return m ? `<span class="lead">${m[1]}</span>${m[2]}` : html; };

function bodyHtml(lines) {
  let out = '', stack = []; // stack of list types
  const close = (lvl) => { while (stack.length > lvl) out += `</${stack.pop()}>`; };
  for (const raw of lines) {
    if (!raw.trim()) { close(0); continue; }
    const m = raw.match(/^(\s*)([*\-]|\d+\.)\s+(.*)$/);
    if (m) {
      const lvl = Math.floor(m[1].replace(/\t/g, '   ').length / 3) + 1, t = /\d/.test(m[2]) ? 'ol' : 'ul';
      close(lvl); while (stack.length < lvl) { out += `<${t}>`; stack.push(t); }
      out += `<li>${lead(inline(m[3]))}</li>`;
    } else { close(0); out += `<p>${lead(inline(raw.trim()))}</p>`; }
  }
  close(0); return out;
}

const css = `body{margin:0;font:16px/1.4 -apple-system,Helvetica,Arial,sans-serif;color:#202124;background:#fff}
.bar{height:44px;display:flex;align-items:center;padding:0 16px;font-weight:600;border-bottom:1px solid #eee}
.hdr{padding:12px 16px}.subj{font-size:21px;font-weight:600;margin:0 0 10px}.from{display:flex;gap:10px;align-items:center}
.av{width:36px;height:36px;border-radius:50%;background:#7b5;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600}
.meta{font-size:14px;color:#5f6368}.body{padding:4px 16px 40px}p{margin:0 0 12px}ul,ol{margin:0 0 12px;padding-left:22px}li{margin:0 0 6px}
.row{display:flex;gap:10px;padding:10px 16px;border-bottom:1px solid #f1f1f1}.row .t{margin-left:auto;font-size:12px;color:#5f6368}
.rs{font-weight:600;font-size:15px}.rsub{font-size:14px;font-weight:600}.rp{font-size:14px;color:#5f6368;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:290px}
.skim .body p,.skim .body li{color:transparent;text-shadow:0 0 7px rgba(0,0,0,.45)}
.skim .body .lead,.skim .body strong{color:#202124;text-shadow:none}`;

(async () => {
  const name = process.argv[2];
  const txt = fs.readFileSync(path.join(process.cwd(), 'emails', name + '.txt'), 'utf8').split('\n');
  const subject = txt[0].replace(/^Subject:\s*/, '');
  const from = /^From:/.test(txt[1]) ? txt[1].replace(/^From:\s*/, '').trim() : 'Sender';
  const bodyLines = txt.slice(/^From:/.test(txt[1]) ? 2 : 1);
  const fname = from.replace(/\s*\(.*\)/, ''), org = (from.match(/\((.*)\)/) || [, ''])[1];
  const plain = bodyLines.join(' ').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
  const out = path.join(process.cwd(), 'screens', name); fs.mkdirSync(out, { recursive: true });
  const inbox = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'inbox.json'), 'utf8')).map(e =>
    e.from === 'TARGET' ? { from, subject, preview: plain.slice(0, 120), time: e.time, unread: true } : e);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const rows = inbox.map(e => `<div class="row"><div style="min-width:0"><div class="rs">${esc(e.from)}</div><div class="rsub">${esc(e.subject)}</div><div class="rp">${esc(e.preview)}</div></div><div class="t">${e.time}</div></div>`).join('');
  await p.setContent(`<style>${css}</style><div class="bar">Inbox &nbsp;<span class="meta">47 unread</span></div>${rows}`);
  await p.screenshot({ path: path.join(out, 'inbox.png') });
  const page = mode => `<style>${css}</style><div class="${mode}"><div class="bar">‹ Inbox</div><div class="hdr"><div class="subj">${esc(subject)}</div>
    <div class="from"><div class="av">${esc(fname[0] || "?")}</div><div><div><b>${esc(fname)}</b> <span class="meta">${esc(org)} · 8:41 AM</span></div><div class="meta">to me</div></div></div></div><div class="body">${bodyHtml(bodyLines)}</div></div>`;
  let n = 0;
  for (const mode of ['full', 'skim']) {
    await p.setContent(page(mode));
    const total = await p.evaluate(() => document.body.scrollHeight);
    n = Math.max(1, Math.ceil((total - H) / STEP) + 1);
    for (let i = 0; i < n; i++) {
      const y = Math.min(i * STEP, Math.max(0, total - H));
      await p.screenshot({ path: path.join(out, `${mode}-${i + 1}.png`), fullPage: true, clip: { x: 0, y, width: W, height: H } });
    }
  }
  fs.writeFileSync(path.join(out, 'meta.json'), JSON.stringify({ screens: n, subject, from }));
  console.log(name, 'screens:', n); await b.close();
})();
