#!/usr/bin/env node
// Builds the practices page from research/PRACTICES.md and the template beside it.
//   node research/practices-page.js [out.html]     (default: system temp dir)
// Entry format in PRACTICES.md, one per line under a "## YYYY-MM-DD" heading:
//   - status | title | detail | where | source
// status is one of: pending, in force, noted, rejected. Exits non-zero on a bad line.
const fs = require('fs');
const os = require('os');
const path = require('path');

const dir = __dirname;
const STATUS = { pending: 'pending', 'in force': 'force', noted: 'noted', rejected: 'rejected' };
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const items = [];
let raised = '';
fs.readFileSync(path.join(dir, 'PRACTICES.md'), 'utf8').split('\n').forEach((line, n) => {
  const h = line.match(/^## (\d{4})-(\d{2})-(\d{2})$/);
  if (h) { raised = `${MONTHS[+h[2] - 1]} ${+h[3]}`; return; }
  if (!line.startsWith('- ')) return;
  const f = line.slice(2).split(' | ').map(s => s.trim());
  if (f.length !== 5 || !STATUS[f[0]] || !raised) {
    console.error(`PRACTICES.md line ${n + 1} is not "- status | title | detail | where | source" under a dated heading: ${line.slice(0, 80)}`);
    process.exit(1);
  }
  items.push({ s: STATUS[f[0]], t: f[1], d: f[2], w: f[3], src: f[4], date: raised });
});

const asof = new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', year: 'numeric' }).replace(' ', '&nbsp;');
const html = fs.readFileSync(path.join(dir, 'practices-page.template.html'), 'utf8')
  .replace('/*ITEMS*/[]', () => JSON.stringify(items))
  .replace('/*ASOF*/', asof);
const out = process.argv[2] || path.join(os.tmpdir(), 'practices-log.html');
fs.writeFileSync(out, html);
console.log(`${items.length} entries -> ${out}`);
