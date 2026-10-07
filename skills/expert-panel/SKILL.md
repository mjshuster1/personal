---
name: expert-panel
description: "Run an adversarial expert panel on a strategic decision or question. Use when the user asks for an expert panel, multi-perspective analysis, devil's advocate review, pre-mortem, decision framework, or to \"have experts\" weigh in on a question. Also use when the user describes a high-stakes decision and wants rigorous analysis with disagreement mapping."
---

You are running an adversarial expert panel built to surface genuine disagreement, not consensus theater. Run inline in chat. Never render as JSX or a simulated UI.

## Standing directives (apply across every round)

- **Information asymmetry.** Experts must not reason from an identical prompt. In Round 0, assign each expert a different framing of the question and, where evidence exists, a different slice of it (one sees unit economics, another sees adoption friction, another sees regulatory exposure). They argue from different vantage points, not the same one. In any environment where experts run as separate sub-agent calls, enforce this fully: no shared transcript. In a single-pass chat run, enforce it as written even though sealing is partial.
- **No hedging.** No "consider both sides," no defaulting to consensus, no manufacturing disagreement where none exists.
- **No em dashes anywhere.**

## ROUND 0: EXPERT SELECTION

Propose 4-6 experts whose mental models genuinely conflict on this question, not just their risk appetites.

- Each gets an adversarial assignment in 1-2 sentences, plus the framing/evidence slice they reason from (see information asymmetry above).
- At least two experts must disagree on a **premise**, not only on the recommendation. Name that premise split explicitly.
- Close Round 0 with one line: the axes of disagreement this panel is built to span. If the set does not span the decision's real axes, revise it before proceeding.

## ROUND 0.5: LOCKED PRE-COMMITMENTS

Before any expert elaborates, each commits to:
- A one-line position.
- The single claim from their own assignment they will stake against the others.

Lock these. Quote each one back verbatim at the top of that expert's Round 1 entry. This is the prompt-level substitute for sealing in a single-pass run.

## ROUND 1: INDEPENDENT OPINIONS

Each expert writes independently. In a single pass, do not let later experts soften toward earlier ones; the locked one-liner is the anchor.

Each entry opens with the verbatim locked one-liner, then includes:
- Position in one concrete paragraph, consistent with the locked one-liner.
- Strongest single piece of evidence.
- Most compelling reason their own view might be wrong (specific, not generic).
- One specific claim from another expert's **assignment** they reject, and why.

## ROUND 1-G: GROUNDING (tool-enabled only)

Activate only when tools that can pull records are available (call transcripts, a CRM, email, documents, a knowledge base). Skip silently otherwise; do not announce the skip.

Each expert ties their strongest evidence to a specific source: a named call, record, or file. Anything not traceable to a source is labeled an assumption in one phrase. An expert whose strongest evidence is all assumption must say so.

## ROUND 2: DISAGREEMENT MAP

Surface where experts actually fight.

- Floor: at least two unresolved cruxes for any high-stakes question. If you cannot find two, state plainly why the question has fewer, rather than inventing them.
- For each crux, name the factual or value question that would resolve it, and which way the evidence currently leans.

## ROUND 3: PRE-MORTEM

Assume the decision was made and failed badly. Each expert writes 2-3 sentences on the most likely cause of failure from their vantage point.

## ROUND 4: SYNTHESIS

- What experts converge on.
- Where they actually disagree, and the crux that matters most.
- Which Round 2 crux most drives the recommendation.
- Concrete recommendation: which way to lean, and what specific finding would change it.
- One thing to investigate or test before committing.

Do not introduce a position no expert held. The synthesis reconciles the panel; it does not add a seventh voice.

## DO NOT
- Default to consensus or hedge with "consider both sides."
- Manufacture disagreement where none exists.
- Let later experts drift toward earlier ones in a single pass.
- Render as JSX or simulated UI. Inline only.
- Use em dashes anywhere.
