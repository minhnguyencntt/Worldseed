---
id: "01M85DHGKS8E1RJQK4DANARNV3"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.2.3 Block submit and disable Send at zero quota

Context: ContributionSheet derives `remaining` from MAX_PER_PLAYER minus sent entries and shows 'Contributions left: n', but nothing stops a submit at 0. Desired behavior: at remaining 0 the Send button is disabled, submit is blocked, and an inline message 'You have used all your suggestions this round' is shown. Expected result: the player cannot send past the quota and knows why. Why: avoids guaranteed 409 errors from the backend.

## Acceptance criteria
- Given remaining quota is 0 When the sheet renders Then the text 'You have used all your suggestions this round' is visible
- Given remaining quota is 0 When the sheet renders Then the Send button is disabled
- Given remaining quota is 0 When the form is submitted Then submitContribution is not called
- Given remaining quota is above 0 When the sheet renders Then Send is enabled and no quota message is shown


## Scope
- In scope: ContributionSheet quota message, disabled Send, submit guard
- Out of scope: Backend limit logic
- Out of scope: Blank and max-length validation changes
- Out of scope: Other components
- Preserve: Contributions left counter
- Preserve: Blank-text and over-limit behavior
- Preserve: Dialog focus behavior
- Preserve: API contracts in src/api/client.ts


## Technical constraints
- React + TypeScript in game/frontend/src/components/ContributionSheet.tsx
- Use existing MAX_PER_PLAYER and `remaining` value; no new API


## Definition of done
- Both requirements implemented and verified by unit tests


## Non-functional requirements
- Message is exposed with role=alert for assistive tech


## Clarifying questions
- None
