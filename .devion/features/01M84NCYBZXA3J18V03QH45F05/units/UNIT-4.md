---
id: "01M84NCYC0EV3KRY5E6H7ARPHP"
kind: unit
parent: 01M84NCYBZ6BG90EMQW86QY19B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: HeaderOverlay unit tests

Add tests/headerOverlay.test.tsx proving the header renders each state and toggles the real store.

## Acceptance criteria
- Ready, loading and error states asserted
- Sound and Settings clicks flip store flags


## Scope
- In scope: tests/headerOverlay.test.tsx
- Out of scope: Network


## Technical constraints
- Use roundFixture from tests/fixtures/api.ts, which mirrors the backend world.Round JSON (id, number, status, starts_at, ends_at)
- Fake timers for Countdown


## Definition of done
- Tests pass


## Clarifying questions
- None
