---
id: "01M84KNPXCS6TWF1RMZZ9FP178"
kind: unit
parent: 01M84KNPXBHVAH7JMHQB7WTYX0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: HeaderOverlay and App shell unit tests with mocked API

Test HeaderOverlay directly and App with the API client mocked.

## Acceptance criteria
- Header content, sound, settings and error states asserted
- App composition asserted


## Scope
- In scope: game/frontend/tests/header.test.tsx
- In scope: game/frontend/tests/app.test.tsx
- Out of scope: browser


## Technical constraints
- vi.mock('../src/api/client') for getCurrentRound; fixtures in tests/fixtures/api.ts mirror the Round type in src/api/client.ts; vi.mock('motion/react') to plain elements


## Definition of done
- Tests pass


## Clarifying questions
- None
