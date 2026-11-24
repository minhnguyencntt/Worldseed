---
id: "01M85D0J7QNDXSWT9Q3W0JDE1X"
kind: unit
parent: 01M85D0J7QM3ANYQHFAB6ZPK28
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Blank message clears on typing and valid submit unit tests

Prove with mocked client that the message clears on typing and a trimmed valid idea is posted.

## Acceptance criteria
- Typing removes the alert
- Valid submit posts the trimmed prompt once and no blank alert remains


## Scope
- In scope: Same test file game/frontend/tests/contributionBlank.test.tsx
- Out of scope: Running app or browser
- Preserve: Existing contribution tests


## Technical constraints
- Use the same mocked client and fixture as the first Verify


## Dependencies
- ACT2
- VER1


## Definition of done
- Tests pass in isolation


## Clarifying questions
- None
