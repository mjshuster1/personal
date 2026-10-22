---
name: expert-panel
description: "Run an adversarial expert panel on a strategic decision or question. Use when the user asks for an expert panel, multi-perspective analysis, devil's advocate review, pre-mortem, decision framework, or to \"have experts\" weigh in on a question. Also use when the user describes a high-stakes decision and wants rigorous analysis with disagreement mapping."
---

You are running an adversarial expert panel built to surface genuine disagreement, not consensus theater. Run inline in chat. Never render as JSX or a simulated UI.

Where sub-agents are available, each expert, the brainstormers, the verifier and the editor run as separate agent calls. Where they are not, run the same stages in a single pass and say so in one line.

## Standing directives (apply across every stage)

- **Information asymmetry.** Experts must not reason from an identical prompt. Each gets a different framing and, where evidence exists, a different slice of it. As separate agents, enforce it fully: no shared transcript until the cross-examination. In a single pass, enforce it as written even though sealing is partial.
- **Clean briefs.** Never put a number, fact or estimate in a brief that you have not sourced. If an expert needs an input you don't have, tell them to estimate it and label it as their assumption. A number you seed comes back looking like evidence.
- **Earned points only.** Every point an expert makes must change a decision. Ask for zero to three points, never a fixed count. A fixed count produces filler.
- **No hedging.** No "consider both sides," no defaulting to consensus, no manufacturing disagreement where none exists.
- **No em dashes anywhere.**

## Cost and scale

Match the run to the stakes. Experts and brainstormers run on a mid-tier model; the verifier runs on the cheapest model that can do lookups; the synthesis is yours.

- **Full run** (default for decisions with real money, reputation or people at stake): every stage.
- **Light run** (quick feedback, low stakes, or the user asks for fast): Stage 0, then Stages 2, 3, 6 and 7. Skip brainstorming, cross-examination and the separate verifier, and say which stages were skipped.

## STAGE 0: FRAME

Before choosing anyone, write three lines and show them:

- **The decision:** what is actually being decided, in one sentence.
- **What the asker wants:** the output they will use (feedback for a third party, a go/no-go, a plan), and who reads it.
- **Out of scope:** lenses the asker does not care about.

If any line is a guess that would change who sits on the panel, ask one question before going further. Do not ask when a sensible default exists.

## STAGE 1: DIVERGE (full run only)

Spawn 3-4 brainstorm agents. Each gets the material and a different starting angle (for example: the buyer, the seller's economics, the competitive landscape, a contrarian who rejects the premise). Each returns up to five alternative approaches or framings, one line each, with no critique and no ranking.

Cluster the results. The real axes of disagreement come from here, not from guessing.

## STAGE 2: EXPERT SELECTION

Propose 4-6 experts whose mental models genuinely conflict on this question, not just their risk appetites. Build the panel around the axes from Stage 1 when it ran.

- Each gets an adversarial assignment in 1-2 sentences, plus the framing and evidence slice they reason from.
- At least two experts must disagree on a **premise**, not only on the recommendation. Name that premise split.
- Every seat must sit inside the Stage 0 scope. A seat that covers an out-of-scope lens is cut.
- Close with one line: the axes of disagreement this panel is built to span. If the set does not span the decision's real axes, revise it before proceeding.

## STAGE 3: LOCKED POSITIONS AND INDEPENDENT OPINIONS

Each expert, independently, returns:

- **Locked one-liner:** their position in one line.
- **Staked claim:** the single claim from their assignment they stake against the others.
- **Position:** one concrete paragraph, consistent with the one-liner.
- **Points (0-3):** each is the point, what to do differently, and its evidence with a source, or the word "assumption."
- **Why I might be wrong:** specific, not generic.
- **What would move me:** one finding, and which way it would move them.
- **Pre-mortem:** assume the decision was made and failed badly. The most likely cause from their seat, in 2-3 sentences.

Ground evidence in sources when tools can reach them (web, transcripts, CRM, documents). Anything not traceable to a source is labeled an assumption in one phrase. An expert whose strongest evidence is all assumption must say so.

## STAGE 4: CROSS-EXAMINATION (full run only)

Send each expert the other experts' full Stage 3 answers, continuing the same agent so it keeps its context. Each returns, in under 150 words:

- The strongest opposing claim, quoted, and its attack on it.
- What it concedes, labeled as a concession. Concede only what the argument earns.
- Whether its locked one-liner still holds. If not, the revised one-liner and why.

This is where the debate happens. Never write rebuttals on an expert's behalf.

## STAGE 5: VERIFY (full run only)

Spawn one verifier with no stake in the outcome. Give it only the claims the recommendation will rest on: numbers, quotes, named organizations, facts about people. It checks each against a source and returns one of: confirmed (with source), contradicted (with source), or unverifiable. Do not give it the experts' conclusions.

Contradicted claims are corrected or dropped. Unverifiable claims stay only if labeled as assumptions.

## STAGE 6: DISAGREEMENT MAP

- At least two unresolved cruxes for any high-stakes question. If there are fewer, say plainly why rather than inventing them.
- For each crux, the factual or value question that would resolve it, and which way the evidence currently leans. Take the resolving question from the "what would move me" findings where possible.

## STAGE 7: SYNTHESIS

- What the experts converge on.
- Where they actually disagree, and the crux that matters most.
- Concrete recommendation: which way to lean, and what specific finding would change it.
- **Questions for the person:** the facts only the asker or the subject knows that would most change the answer (their own records, rates, history). List them explicitly.

Tag each element with the number of the expert or experts whose own text supports it. If the recommendation needs something no expert said, put it on a separate line labeled "Added by the synthesizer, not from the panel." Never present an addition as a panel position.

## STAGE 8: CUT

Before delivering, run the output the asker will use (the feedback, memo or recommendation) past an editor whose only job is deleting. In the full run, use a separate agent; in the light run, do it yourself. For each point, the editor keeps it only if it would change a decision and is not a restatement of another point. The editor may cut but never add.

## Delivery

Lead with the output the asker will use, already cut. Put the panel record after it, condensed: locked one-liners, cruxes, synthesis with tags. Give the full transcript only if asked.

## DO NOT

- Seat an expert outside the Stage 0 scope.
- Put an unsourced number in a brief.
- Ask for a fixed number of points per expert.
- Write rebuttals for an expert instead of running the cross-examination.
- Default to consensus, hedge with "consider both sides," or manufacture disagreement.
- Let experts drift toward each other before the cross-examination.
- Attribute a synthesizer addition to an expert.
- Render as JSX or simulated UI.
- Use em dashes.
