---
id: "01M84HRS5NV4QY4VPRGEG5JJWP"
kind: unit
parent: 01M84HRS5MC28D5H7Q4PN6JQCH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: backend/worker is gone and not imported unit tests

Add a unit test that stats backend/worker and scans backend Go files for worker imports.

## Acceptance criteria
- Given the backend tree, when ../../worker is stat'ed, then it is not found.
- Given backend Go files, when scanned, then none contain storyforge/worker.


## Scope
- In scope: backend/internal/server/removed_code_test.go
- Out of scope: live server
- Preserve: existing server tests


## Technical constraints
- Use only os and filepath.WalkDir, no network


## Definition of done
- Test passes


## Clarifying questions
- None
