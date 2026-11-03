export const meta = {
  name: 'reader-sim',
  description: 'Simulated busy readers read email variants on a gated phone inbox, then a grader scores their quiz answers',
  phases: [{ title: 'Read' }, { title: 'Grade' }],
}
// args: { dir: absolute work folder, variants: ['original','rewrite','control'],
//   personas: { A: '<who text from personas.json>', ... }, reps: 1, context: 'who the sender is to the reader' }
const { dir, variants, personas, reps = 1, context = '' } = args
const runs = []
for (const v of variants) for (const p of Object.keys(personas)) for (let rep = 1; rep <= reps; rep++)
  runs.push({ v, p, id: `${v}-${p}-${rep}`, seed: rep * 37 + p.charCodeAt(0) })

const prompt = r => `${personas[r.p]} ${context}

You are a real person, not a reviewer. Behave the way this person actually would: you are not obligated to open or finish anything, and you can stop the moment it isn't worth your time.

This is a simulation run by a harness. Rules:
- Only look at image files the harness prints, with the Read tool. Do not list, open or read any other file or folder.
- Start with: cd ${dir} && node sim.js start ${r.id} ${r.v} ${r.p} ${r.seed}
- Then each step: cd ${dir} && node sim.js act ${r.id} <choice>, choosing from the options printed. Look at each screen before choosing.
- When the quiz appears, answer from memory only, write the JSON to ${dir}/runs/${r.id}/answers.json, and run: cd ${dir} && node sim.js answer ${r.id} runs/${r.id}/answers.json
Edit nothing else.

When done, reply with one line per choice you made and why, in first person, under 120 words.`

phase('Read')
const notes = await parallel(runs.map(r => () => agent(prompt(r), { label: r.id, phase: 'Read', model: 'sonnet' })))

phase('Grade')
const grade = await agent(`Grade a reading simulation. Work folder: ${dir}. Read ${dir}/quiz.json (questions with answer keys) and run: cd ${dir} && node report.js
Quiz keys q1 and q2 are open questions (summary, next step): do not score them, but quote notable ones. Keys q3 onward map in order to quiz.json questions.
Strict rule: an answer scores 1 only if it is correct per the key AND stated with confidence. Hedged or partial answers ("Nov 9 I think", "it was blurry", "probably") score 0.
Return markdown only:
1. Table: one row per variant with Overall comprehension (% and points), Must-know items (questions marked mustKnow in quiz.json, % and points), Read to the end (% of runs that reached the last screen), Opened (% of runs that opened it).
2. Table: per-question % correct, one column per variant.
3. Up to 5 bullets on how readers behaved (where they stopped, skimmed, interruptions, endings), with run ids.
4. Up to 3 notable reader replies or next steps, quoted.`, { label: 'grade', phase: 'Grade', model: 'sonnet' })
return { grade, notes: runs.map((r, i) => ({ id: r.id, note: notes[i] })) }
