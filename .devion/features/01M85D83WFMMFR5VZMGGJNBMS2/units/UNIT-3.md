---
id: "01M85D83WGVKM970K7QNY9MHTF"
kind: unit
parent: 01M85D83WGT15FRTDHB1R6R31G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Max-length counter unit tests

Write unit tests for the counter using the mocked API client, mirroring the setup in tests/contributionBlank.test.tsx.

## Acceptance criteria
- Counter reads '0 / 500' initially
- Counter counts trimmed characters
- aria-describedby references the counter


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: Existing tests stay green


## Technical constraints
- Mock ../src/api/client with vi.mock keeping the actual exports; no network


## Dependencies
- ACT1


## Definition of done
- Tests pass


## Clarifying questions
- None
