---
id: "01M84PBVRNWMMB5XJSBV2QYGN2"
kind: unit
parent: 01M84PBVRNCNBVKKNDV8Q60DX0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Manifest loader dangling-reference and missing-asset unit tests

Test the manifest loader behaviors using fake exists functions and inline fixtures.

## Acceptance criteria
- Missing, dangling and invalid-data cases are asserted
- Fallback resolution for missing assets is asserted


## Scope
- In scope: tests/manifestLoader.test.ts


## Technical constraints
- Use inline fixtures built from schema-valid objects; exists is a vi.fn


## Definition of done
- Tests pass


## Clarifying questions
- None
