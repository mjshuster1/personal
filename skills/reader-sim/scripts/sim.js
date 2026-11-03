// Gated reading harness. The reader only ever sees the screen this script reveals.
// Run from the work folder (it holds emails/, screens/, runs/, personas.json, quiz.json).
// node sim.js start <runId> <variant> <persona> <seed>
// node sim.js act <runId> <action>       options are printed at each step
// node sim.js answer <runId> <jsonFile>  quiz answers after the email is closed
const fs = require('fs'), path = require('path');
const D = process.cwd(), [cmd, id, ...rest] = process.argv.slice(2);
const runDir = path.join(D, 'runs', id || 'x'), stFile = path.join(runDir, 'state.json');
const CFG = JSON.parse(fs.readFileSync(path.join(D, 'personas.json'), 'utf8'));
const COST = { inbox: 3, read: 20, skim: 6 };
const rng = s => () => (s = (s * 9301 + 49297) % 233280) / 233280;
const save = st => fs.writeFileSync(stFile, JSON.stringify(st, null, 1));
const load = () => JSON.parse(fs.readFileSync(stFile, 'utf8'));
const log = (st, ev) => { st.log.push({ t: st.used, ...ev }); };
function quiz() { // open questions first so specific ones don't hint at what mattered
  const q = JSON.parse(fs.readFileSync(path.join(D, 'quiz.json'), 'utf8')).questions;
  const all = ['In one sentence, what was this email about?', 'What do you do next (act now, flag, forward to whom, reply, ignore)? If you would reply, write the exact reply.', ...q.map(x => x.q)];
  return `You've closed the email. Answer from memory, only from what you actually saw. "Don't know" is a fine answer.
Write a JSON file with keys ${all.map((_, i) => 'q' + (i + 1)).join(', ')} and run: node sim.js answer ${id} <file>
${all.map((x, i) => `q${i + 1}: ${x}`).join('\n')}`;
}
function show(st, mode) {
  const src = path.join(D, 'screens', st.variant, `${mode}-${st.screen}.png`);
  const dst = path.join(runDir, `view-${st.log.length}.png`); fs.copyFileSync(src, dst);
  console.log(`SCREEN ${st.screen} (${mode === 'skim' ? 'skimming: only what catches your eye is legible' : 'reading'}). Look at: ${dst}\n${st.screen < st.screens ? 'There is more below.' : 'This is the end of the email.'}`);
}
function status(st) {
  console.log(`Time used ${st.used}s of ${st.budget}s.`);
  if (st.used >= st.budget) { console.log('You are out of time. Choose an ending: close | flag | archive | forward'); return; }
  console.log(`Next: ${st.screen < st.screens ? 'read (scroll and read the next screen, 20s) | skim (scroll and skim it, 6s) | ' : ''}reread (read this screen properly, 20s) | close | flag | archive | forward | reply`);
}
function maybeInterrupt(st) {
  if (st.interruptAt !== st.screen || st.interrupted) return false;
  st.interrupted = true; st.phase = 'interrupted'; log(st, { ev: 'interrupted' });
  console.log(`INTERRUPTED. ${st.event} You leave the email open and walk away.\nThree hours later you're back at your inbox. 30 new emails sit above this one.\nChoose: resume (go back to this email) | leave (don't come back to it today)`);
  return true;
}
function end(st, how) { st.phase = 'quiz'; log(st, { ev: 'end', how, screen: st.screen }); save(st); console.log(quiz()); }

if (cmd === 'start') {
  const [variant, persona, seed] = rest; fs.mkdirSync(runDir, { recursive: true });
  const r = rng(Number(seed)), meta = JSON.parse(fs.readFileSync(path.join(D, 'screens', variant, 'meta.json'), 'utf8'));
  const st = { variant, persona, screens: meta.screens, screen: 0, used: COST.inbox, budget: CFG.personas[persona].budget, phase: 'inbox', log: [],
    interruptAt: r() < 0.5 ? 1 + Math.floor(r() * Math.min(3, meta.screens)) : null, event: CFG.events[Math.floor(r() * CFG.events.length)] };
  fs.copyFileSync(path.join(D, 'screens', variant, 'inbox.png'), path.join(runDir, 'inbox.png')); save(st);
  console.log(`INBOX. Look at: ${path.join(runDir, 'inbox.png')}\nYou have ${st.budget}s for email right now.\nChoose for the ${meta.from} email: open-read | open-skim | flag | archive | ignore`);
} else if (cmd === 'act') {
  const st = load(), a = rest[0];
  if (st.phase === 'inbox') {
    if (a === 'open-read' || a === 'open-skim') {
      st.phase = 'email'; st.screen = 1; const m = a === 'open-read' ? 'full' : 'skim';
      st.used += m === 'full' ? COST.read : COST.skim; log(st, { ev: 'view', screen: 1, mode: m }); show(st, m);
      if (!maybeInterrupt(st)) status(st); save(st);
    } else end(st, 'inbox-' + a);
  } else if (st.phase === 'interrupted') {
    if (a === 'resume') { st.phase = 'email'; st.used = 0; st.budget = Math.round(st.budget / 2); log(st, { ev: 'resume' });
      console.log(`You reopen it. You have ${st.budget}s this time.`); show(st, 'skim'); status(st); save(st); }
    else end(st, 'left-after-interrupt');
  } else if (st.phase === 'email') {
    if (['read', 'skim'].includes(a) && st.screen < st.screens && st.used < st.budget) {
      st.screen++; const m = a === 'read' ? 'full' : 'skim'; st.used += COST[a]; log(st, { ev: 'view', screen: st.screen, mode: m }); show(st, m);
      if (!maybeInterrupt(st)) status(st); save(st);
    } else if (a === 'reread' && st.used < st.budget) { st.used += COST.read; log(st, { ev: 'view', screen: st.screen, mode: 'full' }); show(st, 'full'); status(st); save(st); }
    else if (['close', 'flag', 'archive', 'forward', 'reply'].includes(a)) end(st, a);
    else { console.log('Not allowed now.'); status(st); }
  } else console.log('Email closed. Answer the quiz.');
} else if (cmd === 'answer') {
  const st = load(); st.answers = JSON.parse(fs.readFileSync(path.resolve(rest[0]), 'utf8')); st.phase = 'done'; save(st); console.log('Recorded. Done.');
}
