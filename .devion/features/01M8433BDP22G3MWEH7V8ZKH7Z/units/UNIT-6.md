---
id: "01M8433BDQKB18XMFHE6YJDDHK"
kind: unit
parent: 01M8433BDP45EKJRRRV3JF2B9G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Loader and reference validator unit tests

Test loader and validator using temp directories and in-memory objects.

## Acceptance criteria
- Given invalid fixtures, when validated, then each bad reference produces its error.
- Given a missing file, when loaded, then an error names the file.


## Scope
- In scope: backend/game/tests/validator.test.ts
- In scope: backend/game/tests/fixtures


## Technical constraints
- Temp dir via os.tmpdir only


## Dependencies
- ACT-LD


## Definition of done
- Tests pass


## Clarifying questions
- None
