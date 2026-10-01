---
name: de-slop
description: Rewrite a piece of text so it stops sounding like AI wrote it and starts sounding like Matt. Strips the obvious tells (em dashes, AI vocabulary, chatbot artifacts, filler) and the nuanced ones (rule of three, copula avoidance, uniform rhythm, clean-but-dead prose), then pulls the result toward Matt's personal voice and, where the repo has one, the company voice. Returns the rewritten text plus a short note of what changed. Use when the user says "de-slop", "de-slop this", "make this sound like me", "make this sound human", "take the AI out of this", or pastes a draft that reads like a machine wrote it.
allowed-tools: Read, Grep, Glob
---

# De-Slop

Take text that reads like AI wrote it and rewrite it so it reads like Matt wrote it.

Two passes, in this order:

1. **Strip the tells.** Remove the patterns that mark text as machine-written, obvious and nuanced.
2. **Pull it toward the voice.** Apply the voice files this repo has, so what is left sounds like a person, specifically this person.

This skill rewrites. It hands back the fixed text, not a scorecard. It does not send, post, or file anything.

This skill is used in every repo. Nothing in it may name a company, product, customer, or industry. Company-specific rules live in that company's voice file.


## Before you rewrite

Load the personal voice, then find any company voice files in the current repo with Glob. Do not rewrite voice from memory.

1. **The `personal-voice` skill.** Matt's personal voice, true at any company. Load it and read it in full.
2. **A company `voice.md`, if present** (search `**/voice.md`). Company framing, vocabulary, glossary, soft bans, and data rules. Read it in full.
3. **`voice-samples/`, if present** (search `**/voice-samples/*`). Real sent messages. Read two or three, newest first, preferring ones that match what you are rewriting (an email for an email, a recap for a recap).

Also follow any rules the repo's own `CLAUDE.md` or `AGENTS.md` sets about restricted data.

If the `personal-voice` skill is not available in this session, say so in one line, do pass 1 only, and do not pretend pass 2 happened.

If the text is internal, a note to self, or clearly not company material, do pass 1 and apply only the general traits from `personal-voice` (short, concrete, anchored, no em dashes). Do not force sales register onto something that is not sales, and do not apply company vocabulary to text that is not about the company.

## Pass 1. Strip the tells

### Obvious

- **Em dashes.** None, anywhere. Comma, period, or restructure.
- **AI vocabulary.** delve, crucial, pivotal, robust, leverage, tapestry, landscape (abstract), testament, underscore, showcase, garner, foster, intricate, align with, additionally, enhance, vibrant, key (adjective), interplay, valuable, enduring. Use the plain word or cut it.
- **Chatbot artifacts.** "I hope this helps," "let me know if," "here's a...," "certainly!," "of course!," "would you like me to." Delete.
- **Sycophancy.** "Great question," "you're absolutely right," "excellent point." Delete.
- **Cutoff hedges.** "As of my last update," "based on available information." Find the fact or cut the sentence.
- **Negative parallelism.** "It's not just X, it's Y." "Not only X but also Y." Say the one thing that is true.
- **Filler.** "In order to" to "to." "Due to the fact that" to "because." "Has the ability to" to "can." "It is important to note that" to nothing.
- **Formatting tics.** Bolded inline headers ("**Thing:** sentence"), Title Case headings, emojis on headings or bullets, curly quotes. Strip all of it.
- **Generic uplift closers.** "The future looks bright," "exciting times ahead," "a step in the right direction." Cut, or replace with the actual next step.

### Nuanced

These are the ones that survive a first cleanup and still read as machine-written.

- **Rule of three.** Ideas forced into triplets to sound complete. Keep the ones that are real, drop the padding.
- **Copula avoidance.** serves as, stands as, boasts, represents, marks, features. Usually "is" or "has."
- **Participle tails.** "..., highlighting the importance of," "..., ensuring that," "..., reflecting a broader." Fake depth bolted onto a finished sentence. Cut the tail or make it its own claim.
- **Significance inflation.** "A testament to," "a pivotal moment in," "plays a key role in," "marking a shift." Say what happened instead.
- **Promotional adjectives.** nestled, in the heart of, breathtaking, renowned, groundbreaking, best-in-class. Replace with the specific fact that earned the adjective.
- **Vague attribution.** "Experts believe," "studies show," "industry reports suggest," with nobody named. Name the source or drop the claim.
- **Synonym cycling.** The same subject renamed every sentence to avoid repeating a word. Repeat the word.
- **False ranges.** "From X to Y" where X and Y are not on one scale.
- **Formulaic pivots.** "Despite these challenges," "that said, it's worth noting."
- **Stacked hedging.** "Could potentially possibly be" to "may be."
- **Uniform rhythm.** Every sentence the same length and shape. Vary it. A short one. Then one that takes its time and actually gets somewhere.
- **Too-clean symmetry.** Every bullet the same length, every paragraph the same weight. Real writing is lumpy.
- **Clean but generic.** Grammatical, tidy, and about nothing in particular: no number, no named thing, no concrete detail. This is the one most cleanups miss. Put the specifics from the source back in (never invent them). Matter-of-fact is not generic.

## Pass 2. Make it sound like Matt

From the voice files you read at the start. The rules that do the most work in a rewrite, all from `personal-voice`:

- **Matter-of-fact, never from above.** Say what the thing is, what it does, what's proposed. No praise or grading of anyone's work, no compliments, reassurance, or enthusiasm, no "curious what you think." Cut any line whose job is tone rather than content.
- **Anchor everything.** A referrer, a number, a specific thing they said. Nothing floats. This is usually what AI drafts are missing.
- **Short.** The point lands in the first two lines.
- **Honest over polished.** Name the caveat, admit what's rough. Questions are concrete and practical, not invitations to react.
- **Banned list is a hard ban.** Enforce the banned words, tired openers, and punctuation rules exactly as written.
- **Email openers.** `Hey [FirstName]-` then a line break. Never open with "I."

Then apply the company `voice.md`, if there is one: its framing, vocabulary, glossary, and soft bans.

### When these disagree

Precedence, highest first:

1. **`voice-samples/`** (if present): how Matt actually writes.
2. **Company `voice.md`** (if present): the company layer.
3. **`personal-voice`**: how the rules say he writes, at any company.
4. **Pass 1 tell-stripping**: the generic patterns.

The samples outrank the docs. The voice files are a description of the voice; the samples are the voice. Where a sample does something a voice file bans, follow the sample.

That inversion only runs one way, so be careful with it. A sample is evidence about **phrasing, cadence, openers, and register**, which is what it can outrank the docs on. It is not evidence that a claim is safe to make, that a number is current, or that an ask is appropriate here. Never cite a sample to justify anything but wording.

When you follow a sample against a stated rule, say so in the change list and name both the sample and the rule and which file the rule is in. That contradiction is a signal a voice file has gone stale, and it should reach Matt rather than get silently resolved in the rewrite. Do not edit any voice file yourself.

Both voice files win outright over pass 1. Their banned-word lists, glossary, and punctuation rules beat any generic pattern in this file.

## What you hand back

The rewritten text first, on its own, ready to copy. Then a short list of what changed.

```
<the rewritten text>

---
What I changed:
- <the tell or rule, and what it became>
- <...>
```

Rules for the change list: three to six bullets, not one per edit. Group the mechanical fixes into one line ("cut two em dashes, 'leverage', and a 'circling back' opener"). Spend the other bullets on the judgment calls, especially anything where you changed emphasis or cut a claim. If you left something alone on purpose, say so in one line.

## Hard rules

- **Never change the facts.** Numbers, names, dates, commitments, and asks survive the rewrite exactly. Shorter is not a license to drop a detail.
- **Never add a claim.** If the draft does not support a specific number or proof point, do not invent one to replace a vague sentence. Cut the vague sentence instead and say what is missing in the change list.
- **Qualifying an existing claim is not adding one.** The voice asks you to name the caveat and be honest over polished, so you may add a sentence that limits, sources, or hedges a claim already in the draft: single site, one quarter, early sample, self-reported. That is subtraction wearing a sentence. The line is direction, not word count. You may narrow what the draft already claims, never widen it. Flag every added caveat in the change list, since it is the one case where you put words in Matt's mouth instead of taking them out.
- **Do not make it generic.** Stripping tells is not the same as stripping specifics. If the rewrite is tidy but could be about anything, you did half the job. Go back to the clean-but-generic item in pass 1.
- **Keep the ask.** Whatever the original was trying to get someone to do still has to be plain in the rewrite.
- **No em dashes**, including in your own change list.
- If the draft is already clean, say so and hand it back unchanged. A no-op is a real result. Do not rewrite for the sake of showing work.
- **Restricted data.** Obey every data rule in the company `voice.md` and the repo's `CLAUDE.md` or `AGENTS.md`. If the text under review contains personal health or other restricted data, stop and flag it instead of rewriting it.
- Drafts only. Rewrite and hand back. Never send, post, or file.
