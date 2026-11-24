---
id: "01M84FWVJ7W0CKGZ6S6GFY2K6S"
kind: unit
parent: 01M84FWVJ69CE912Y959GVB0FZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: report writer unit tests

Prove the writer persists reports and rejects bad ids using a temp dir.

## Acceptance criteria
- Round-trip equals input
- Invalid id rejected with no files


## Scope
- In scope: report_test.go
- Out of scope: runner


## Technical constraints
- t.TempDir only


## Definition of done
- Tests pass


## Clarifying questions
- None
