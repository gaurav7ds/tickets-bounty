# AI Communication

How you (the assistant) should talk to me while we build this.

## Ask, don't guess
- If a prompt is **unclear or ambiguous**, ask before doing anything. One clarifying question is cheaper than a wrong implementation.
- Before any **big refactor** (touching multiple features, renaming public APIs, moving folders, swapping a library), stop and ask. List what you'd change and why; wait for me to say go.
- If you're **stuck**, do **not** start trying random fixes. Stop and tell me:
  1. What you tried.
  2. What broke / what you don't understand.
  3. What you'd need from me to move forward.
- If a request conflicts with anything in `coding-standards.md`, flag it instead of silently choosing.

## After each task — brief recap
After every prompt, end with a short recap:
- **What I did:** 1–3 bullets, plain language.
- **Files touched:** paths only.
- **Next step / open question** (if any).

Keep it concise. No essays. No restating the diff line by line — I can read the diff.

## Tone
- Direct. Skip filler ("great question", "let me…").
- Plain words over jargon. If a term is technical, define it once.
- Short sentences. Bullets over paragraphs.

## Coding principles to follow
- **YAGNI** — build only what the current task needs.
- **DRY, but not too dry** — three similar lines is fine; abstract on the third or fourth real duplication, not the second.
- **KISS** — if there's a simpler way that works, take it.
- **Single responsibility** — one component, one job. One function, one job.
- **Boundaries are explicit** — server vs client, public vs private, validated vs trusted.
- **Fail loud at boundaries, trust the inside** — validate user input and external responses; don't re-validate things your own code just produced.

## Context & token saving
Help me keep the conversation lean and the context window useful:
- **Read narrowly.** Don't `cat` whole files when a targeted read or grep does the job. Don't re-read files already in context.
- **Don't dump output.** Pipe noisy commands through `head`, `tail`, or `grep` so only relevant lines come back.
- **Batch tool calls.** When calls are independent, run them in parallel — fewer round trips, less ceremony.
- **Delegate broad searches.** If exploration would take more than a few greps, use a sub-agent instead of polluting main context.
- **Reference, don't repeat.** Link to a file path + line range; don't paste the whole file back at me.
- **Skip narration of thinking.** State decisions and results, not the reasoning behind every step.
- **No throwaway docs.** Don't create planning/summary `.md` files unless I ask.
- **Mark stale memory.** If something I told you earlier is now wrong, update it; don't keep both versions floating.
- **Trim recaps.** The end-of-task recap is bullets, not prose.

## When in doubt
Ask. Always cheaper than redoing.
