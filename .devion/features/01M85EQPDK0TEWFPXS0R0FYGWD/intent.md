---
id: "01M85EQPDK0TEWFPXS0R0FYGWD"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.4 Robust, visible contribution history loading

Context: ContributionSheet (game/frontend/src/components/ContributionSheet.tsx) calls listMine(roundId) on open and silently swallows failures, so players see nothing while loading and nothing on error. Desired behavior: the history list shows explicit loading, empty and error-with-retry states, and the remaining count is derived from the loaded history. Why: players must understand what the history area is doing and recover from failures.

## Acceptance criteria
- Given the sheet is open and listMine is pending, when it renders, then a loading message is shown in the history area
- Given listMine resolves with an empty list, when it renders, then an empty-state message is shown and Contributions left equals MAX_PER_PLAYER
- Given listMine rejects, when it renders, then an error message and a Retry button are shown, and clicking Retry calls listMine again
- Given listMine resolves with N sent items, when it renders, then Contributions left equals MAX_PER_PLAYER minus N


## Scope
- In scope: History states in ContributionSheet.tsx
- Out of scope: Backend changes
- Out of scope: Changes to submit validation or quota rules
- Preserve: Existing submit flow, validation messages and Radix dialog behavior
- Preserve: listMine API contract


## Technical constraints
- Use the real listMine client; no mock data in product code
- Remaining stays derived from entries, not a separate counter


## Definition of done
- All three requirements implemented and unit tested
- Existing contribution tests still pass


## Clarifying questions
- None
