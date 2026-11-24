---
id: "01M8433BDQGP3E3579SGZMDNVM"
kind: unit
parent: 01M8433BDP0FQCE10PSS82FZQB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Bedroom content validity unit tests

Load the real content files with loadWorld and assert required structure.

## Acceptance criteria
- Given shipped content, when validated, then no errors.
- Given the scene, then required objects and opening text exist.


## Scope
- In scope: backend/game/tests/content.test.ts


## Technical constraints
- Read-only access to backend/game/content


## Dependencies
- ACT-CT


## Definition of done
- Tests pass


## Clarifying questions
- None
