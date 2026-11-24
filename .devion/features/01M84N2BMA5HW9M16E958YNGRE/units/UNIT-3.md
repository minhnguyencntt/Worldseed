---
id: "01M84N2BMB65JWRM757H0EJ85E"
kind: unit
parent: 01M84N2BMB0A9J37ENYEPPEGFS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: GameLayout desktop Tailwind classes and overflow rules unit tests

Write tests from REQ-1 asserting the Tailwind desktop classes on GameLayout and the overflow rules in styles.css. No browser or server is used.

## Acceptance criteria
- Root, aside and main classes asserted.
- Stylesheet html/body/#root rule asserted.


## Scope
- In scope: new tests/layoutDesktop.test.tsx
- Out of scope: product code
- Preserve: existing passing tests


## Technical constraints
- vitest + jsdom + testing-library


## Dependencies
- ACT-1


## Definition of done
- Tests pass


## Clarifying questions
- None
