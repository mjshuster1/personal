// Run from the work folder. Summarize runs: how far each reader got, how they ended, and quiz answers.
const fs = require('fs'), path = require('path');
const R = path.join(process.cwd(), 'runs');
const rows = fs.readdirSync(R).filter(d => fs.existsSync(path.join(R, d, 'state.json'))).sort().map(d => {
  const s = JSON.parse(fs.readFileSync(path.join(R, d, 'state.json'), 'utf8'));
  const views = s.log.filter(l => l.ev === 'view');
  const maxScreen = views.reduce((m, v) => Math.max(m, v.screen), 0);
  const read = [...new Set(views.filter(v => v.mode === 'full').map(v => v.screen))].join(',') || '-';
  const end = (s.log.find(l => l.ev === 'end') || {}).how || 'unfinished';
  const intr = s.log.some(l => l.ev === 'interrupted') ? (s.log.some(l => l.ev === 'resume') ? 'resumed' : 'left') : '';
  return { run: d, reached: `${maxScreen}/${s.screens}`, readFully: read, end, interrupt: intr, answers: s.answers || {} };
});
for (const r of rows) console.log([r.run, r.reached, 'read:' + r.readFully, r.end, r.interrupt].join(' | '));
console.log('\n--- quiz ---');
for (const r of rows) { console.log(`\n## ${r.run}`); for (const [k, v] of Object.entries(r.answers)) console.log(`${k}: ${String(v).replace(/\s+/g, ' ')}`); }
