---
id: "01M844Z5BYB1MXBH0K6Z4E8TE9"
kind: unit
parent: 01M844Z5BYZ5W1SYDFT22JFH6P
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Entry point and App render unit tests

Test the entry chain with react-dom/client mocked.

## Acceptance criteria
- index.html has div#root and script /src/main.tsx
- main.tsx calls createRoot with #root and renders App
- main.tsx throws when #root is missing
- App renders the Begin button


## Scope
- In scope: tests/entry.test.tsx
- Out of scope: Browser or dev server
- Preserve: Existing tests


## Technical constraints
- Mock react-dom/client with vi.mock; no real server


## Definition of done
- Tests pass


## Clarifying questions
- None
