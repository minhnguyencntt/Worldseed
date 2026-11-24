---
id: "01M847PS3S822K08BPR9MYFDHM"
kind: unit
parent: 01M847PS3RVCAJMFMJRDF5ZSY3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Admin token gate and round controls unit tests

Unit tests for AdminApp and admin client calls with stubbed fetch.

## Acceptance criteria
- No fetch before token
- Bearer header sent
- Open and Close POST
- 401 shows Invalid token


## Scope
- In scope: game/frontend/tests/admin.test.tsx


## Technical constraints
- fetch mocked


## Dependencies
- ACT-3


## Definition of done
- Tests pass


## Clarifying questions
- None
