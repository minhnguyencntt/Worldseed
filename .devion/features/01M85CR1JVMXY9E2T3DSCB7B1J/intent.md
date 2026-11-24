---
id: "01M85CR1JVMXY9E2T3DSCB7B1J"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.2 Contribution textarea input validation

Context: ContributionSheet (game/frontend/src/components/ContributionSheet.tsx) only silently ignores an empty trimmed prompt, has no maximum length or counter, and still allows submit when remaining is 0. Desired behavior: block blank/whitespace-only text, enforce a max length with a visible counter and inline message, and block submit at zero quota with a clear message. Expected result: invalid input never reaches submitContribution and the player sees why. Why: clear feedback and fewer wasted backend calls.

## Acceptance criteria
- Given empty or whitespace-only text, when the player tries to submit, then no request is sent and an inline message is shown
- Given text over the maximum length, when shown, then the counter and an inline message indicate the overflow and submit is blocked
- Given remaining quota is 0, when the sheet is open, then submit is blocked and a clear message is shown


## Scope
- In scope: ContributionSheet textarea validation, counter, inline messages, quota gating
- Out of scope: Backend changes
- Out of scope: History list changes
- Out of scope: Dialog wrapper changes
- Preserve: submitContribution and listMine API contracts
- Preserve: Dialog focus and Escape behavior
- Preserve: Existing sending/sent/failed states


## Technical constraints
- React + TypeScript in game/frontend
- Backend default max_prompt_len is 500 (backend/internal/config/config.go)
- No new dependencies


## Definition of done
- All three requirements delivered with passing unit tests


## Non-functional requirements
- Messages are exposed to assistive tech via role or aria-describedby


## Clarifying questions
- None
