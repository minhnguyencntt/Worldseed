---
id: "01M85CR1JWEZ6AW27HG3EBCA2A"
kind: unit
parent: 01M85CR1JVHTC12JQQ2HHV8S0E
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Blank-text validation unit tests

Prove blank and whitespace-only prompts are blocked and never posted.

## Acceptance criteria
- Send disabled for empty and whitespace text
- Form submit with whitespace shows message and no fetch POST


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- fetch stubbed with vi.stubGlobal as in tests/contributionDialog.test.tsx
- Fixtures from tests/fixtures/api.ts contributionFixture, mirroring the Contribution type in src/api/client.ts


## Definition of done
- Tests pass


## Clarifying questions
- None
