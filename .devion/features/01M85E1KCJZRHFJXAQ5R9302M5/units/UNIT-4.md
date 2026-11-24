---
id: "01M85E1KCJV8AGHSVR9QXS1KPE"
kind: unit
parent: 01M85E1KCJXJ048HHNS6WF0J5M
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Blank-text validation tests assert real dialog behaviour

Context: tests/contributionBlank.test.tsx renders the real sheet with the API client mocked. Desired behavior: every test asserts message text and submitContribution call count. Expected result: tests fail if the blank guard is removed.

## Acceptance criteria
- Empty and whitespace-only submit show 'Enter an idea first' and submitContribution is called 0 times
- Typing clears the alert and aria-invalid; a valid trimmed idea is sent as 'hello' once


## Scope
- In scope: game/frontend/tests/contributionBlank.test.tsx
- Out of scope: Product code
- Preserve: Fixture imports from tests/fixtures/api.ts


## Technical constraints
- Fixture contributionFixture mirrors the Contribution type in src/api/client.ts; do not hard-code payloads


## Dependencies
- ACT-BLANK


## Definition of done
- contributionBlank.test.tsx passes and each test asserts a message or call count


## Clarifying questions
- None
