---
id: "01M85E1KCKPBRVNEP38PVP8HBD"
kind: unit
parent: 01M85E1KCJGH7AVDK6E88CAQKM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Max-length tests assert counter text and blocked submit

Context: tests/contributionMaxLength.test.tsx renders the real sheet with the client mocked. Expected result: tests fail if the counter or overLimit guard is removed.

## Acceptance criteria
- Counter shows '3 / 500' after typing 'abc'
- 501 characters plus Send shows 'Too long: 501 / 500' and submitContribution called 0 times; exactly 500 characters is submitted


## Scope
- In scope: game/frontend/tests/contributionMaxLength.test.tsx
- Out of scope: Product code
- Preserve: Fixtures from tests/fixtures/api.ts


## Technical constraints
- Build long text with 'a'.repeat(MAX_PROMPT_LENGTH + 1) using the imported constant


## Dependencies
- ACT-LEN


## Definition of done
- contributionMaxLength.test.tsx passes


## Clarifying questions
- None
