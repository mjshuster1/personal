#!/usr/bin/env node
// Installs this repo's session rules, hooks and agents into ~/.claude/.
// Safe to re-run: it replaces its own pieces and leaves everything else alone.
//
//   node install.js             cloud: copies files into ~/.claude/
//   node install.js --in-place  local clone: points ~/.claude/ at this clone,
//                               so a git pull updates it (agents are linked
//                               separately, see README)
//
// Never exits non-zero, so it can't fail a cloud setup script.
const fs = require('fs');
const path = require('path');
const os = require('os');

const repo = __dirname;
const home = path.join(os.homedir(), '.claude');
const inPlace = process.argv.includes('--in-place');
const fwd = p => p.split(path.sep).join('/');
const log = m => console.log(`[personal install] ${m}`);
const START = '<!-- personal:start (managed by personal/install.js) -->';
const END = '<!-- personal:end -->';

function rules() {
  const src = path.join(repo, 'claude', 'CLAUDE.md');
  const dst = path.join(home, 'CLAUDE.md');
  const body = inPlace ? `@${fwd(src)}` : fs.readFileSync(src, 'utf8').trim();
  const block = `${START}\n${body}\n${END}`;
  let cur = fs.existsSync(dst) ? fs.readFileSync(dst, 'utf8') : '';
  const a = cur.indexOf(START), b = cur.indexOf(END);
  cur = a >= 0 && b > a
    ? cur.slice(0, a) + block + cur.slice(b + END.length)
    : (cur.trim() ? cur.trimEnd() + '\n\n' : '') + block + '\n';
  fs.writeFileSync(dst, cur);
  log(`CLAUDE.md ${inPlace ? 'imports' : 'copied from'} ${fwd(src)}`);
}

function hooks() {
  let script = path.join(repo, 'hooks', 'et-time.js');
  if (!inPlace) {
    const dir = path.join(home, 'hooks', 'personal');
    fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(script, path.join(dir, 'et-time.js'));
    script = path.join(dir, 'et-time.js');
  }
  const file = path.join(home, 'settings.json');
  let s = {};
  if (fs.existsSync(file)) {
    try { s = JSON.parse(fs.readFileSync(file, 'utf8')); }
    catch (e) { log(`settings.json didn't parse, hooks not registered: ${e.message}`); return; }
  }
  s.hooks = s.hooks || {};
  const groups = (s.hooks.UserPromptSubmit || [])
    .map(g => ({ ...g, hooks: (g.hooks || []).filter(h => !String(h.command || '').includes('et-time.js')) }))
    .filter(g => g.hooks.length);
  groups.push({ hooks: [{ type: 'command', command: `node "${fwd(script)}"`, timeout: 10 }] });
  s.hooks.UserPromptSubmit = groups;
  fs.writeFileSync(file, JSON.stringify(s, null, 2) + '\n');
  log(`hooks registered: ${fwd(script)}`);
}

function agents() {
  if (inPlace) return;
  const src = path.join(repo, 'agents');
  const dst = path.join(home, 'agents');
  fs.mkdirSync(dst, { recursive: true });
  for (const f of fs.readdirSync(src).filter(f => f.endsWith('.md'))) {
    fs.copyFileSync(path.join(src, f), path.join(dst, f));
  }
  log('agents copied');
}

for (const step of [rules, hooks, agents]) {
  try { fs.mkdirSync(home, { recursive: true }); step(); }
  catch (e) { log(`${step.name} failed: ${e.message}`); }
}
process.exit(0);
