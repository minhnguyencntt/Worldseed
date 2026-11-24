---
id: "01M84H1K6HHVGSZAAY1F8WWTA2"
kind: unit
parent: 01M84H1K6GQA0WZXF8MD33507X
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Mock agent unit tests

Test the Mock marker file, cost and context handling using t.TempDir.

## Acceptance criteria
- Marker file contains MOCK
- Cancelled context returns an error and writes nothing


## Scope
- In scope: mock_test.go
- Out of scope: product code


## Technical constraints
- Only a temp dir
- New file: `backend/worker/internal/provider/mock_test.go`


## Dependencies
- A1


## Definition of done
- tests pass


## Clarifying questions
- None
