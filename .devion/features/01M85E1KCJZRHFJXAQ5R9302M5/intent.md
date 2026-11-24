---
id: "01M85E1KCJZRHFJXAQ5R9302M5"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.2.4 Validation unit tests assert real dialog behaviour

Context: ContributionSheet (game/frontend/src/components/ContributionSheet.tsx) already blocks blank text, over-limit text and zero quota. Desired behavior: the unit tests assert the inline messages, counter text, disabled or blocked submit, and that submitContribution is never called. Expected result: each test fails if the matching guard in the component is removed. Why: tests that pass without the guards give false confidence.

## Acceptance criteria
- Given blank or whitespace text, when Send is clicked, then the inline message 'Enter an idea first' shows and submitContribution has 0 calls
- Given text over MAX_PROMPT_LENGTH, when Send is clicked, then the over-limit message and the counter text show and submitContribution has 0 calls
- Given zero remaining quota, when the sheet renders, then Send is disabled, the quota message shows and a form submit does not call submitContribution


## Scope
- In scope: game/frontend/tests/contributionBlank.test.tsx
- In scope: game/frontend/tests/contributionMaxLength.test.tsx
- In scope: game/frontend/tests/contributionQuotaGate.test.tsx
- In scope: game/frontend/tests/contributionQuotaMessage.test.tsx
- Out of scope: Backend API changes
- Out of scope: New validation rules
- Out of scope: Browser or e2e tests
- Preserve: Existing ContributionSheet behaviour and messages
- Preserve: vi.mock of ../src/api/client with importOriginal


## Technical constraints
- Use vitest and @testing-library/react in jsdom
- Mock only the API client; render the real ContributionSheet


## Definition of done
- All three requirements have passing unit tests that fail when their guard is removed


## Non-functional requirements
- Each test file runs in seconds


## Clarifying questions
- None
