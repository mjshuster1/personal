#!/usr/bin/env node
// Builds the inventory page from inventory.md and the template beside it.
//   node inventory-page.js [out.html]     (default: system temp dir)
// inventory.md: "Updated: YYYY-MM-DD", then "## Group [yours]" headings, each followed by a
// one-line note and "- name | description | note (optional)" lines. Exits non-zero on a bad line.
// Also compares the [yours] groups with the skill and agent files on disk and prints any
// difference. Sibling repos are read from ../consultant-workspace and ../cuepri-workspace
// when they are checked out next to this one; a missing one is skipped with a note.
const fs = require('fs');
const os = require('os');
const path = require('path');

const dir = __dirname;
const groups = [];
let updated = '';
fs.readFileSync(path.join(dir, 'inventory.md'), 'utf8').split('\n').forEach((line, n) => {
  const u = line.match(/^Updated: (\d{4})-(\d{2})-(\d{2})$/);
  if (u) { updated = new Date(Date.UTC(+u[1], +u[2] - 1, +u[3])).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' }); return; }
  const h = line.match(/^## (.+?)( \[yours\])?$/);
  if (h) { groups.push({ t: h[1], y: !!h[2], n: '', i: [] }); return; }
  if (!groups.length) return;
  const g = groups[groups.length - 1];
  if (line.startsWith('- ')) {
    const f = line.slice(2).split(' | ').map(s => s.trim());
    if (f.length < 2 || f.length > 3 || !f[0] || !f[1]) {
      console.error(`inventory.md line ${n + 1} is not "- name | description [| note]": ${line.slice(0, 80)}`);
      process.exit(1);
    }
    g.i.push(f);
  } else if (line.trim() && !g.i.length) {
    g.n += (g.n ? ' ' : '') + line.trim();
  }
});
if (!updated || !groups.length) { console.error('inventory.md needs an "Updated: YYYY-MM-DD" line and at least one group'); process.exit(1); }

const listed = new Set(groups.flatMap(g => g.i.map(r => r[0])));
const mine = new Set(groups.filter(g => g.y).flatMap(g => g.i.map(r => r[0])));
const found = new Set();
const sources = [
  [dir, 'skills', 'dirs'], [dir, 'agents', 'md'],
  [path.join(dir, '..', 'consultant-workspace', '.claude'), 'agents', 'md'],
  [path.join(dir, '..', 'cuepri-workspace', '.claude'), 'skills', 'dirs'],
];
sources.forEach(([base, sub, kind]) => {
  const p = path.join(base, sub);
  if (!fs.existsSync(p)) { console.log(`skipped (not checked out): ${p}`); return; }
  fs.readdirSync(p, { withFileTypes: true }).forEach(e => {
    if (kind === 'dirs' && e.isDirectory() && fs.existsSync(path.join(p, e.name, 'SKILL.md'))) found.add(e.name);
    if (kind === 'md' && e.isFile() && e.name.endsWith('.md')) found.add(e.name.slice(0, -3));
  });
});
const missing = [...found].filter(x => !listed.has(x));
const gone = [...mine].filter(x => !found.has(x));
missing.forEach(x => console.log(`on disk, not in inventory.md: ${x}`));
gone.forEach(x => console.log(`in a [yours] group, not found on disk (or its repo is not checked out): ${x}`));

const html = fs.readFileSync(path.join(dir, 'inventory-page.template.html'), 'utf8')
  .replace('/*GROUPS*/[]', () => JSON.stringify(groups))
  .replace('/*ASOF*/', updated);
const out = process.argv[2] || path.join(os.tmpdir(), 'skills-and-agents-inventory.html');
fs.writeFileSync(out, html);
console.log(`${groups.reduce((a, g) => a + g.i.length, 0)} items -> ${out}`);
