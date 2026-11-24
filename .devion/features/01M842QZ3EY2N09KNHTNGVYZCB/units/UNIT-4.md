---
id: "01M842QZ3G1G3W50F3JYMHK1A7"
kind: unit
parent: 01M842QZ3FBXPPNVH4X9CY1PZS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Config loader and health endpoint unit tests

Write offline tests using fstest.MapFS and httptest covering config loading, env overrides, missing secret and health response.

## Acceptance criteria
- Config tests pass
- Health test passes


## Scope
- In scope: config and server tests
- Out of scope: player tests


## Technical constraints
- fstest.MapFS, fake getenv map, httptest


## Definition of done
- Tests pass offline


## Clarifying questions
- None
