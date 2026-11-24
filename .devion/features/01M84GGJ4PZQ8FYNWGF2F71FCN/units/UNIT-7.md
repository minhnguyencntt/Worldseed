---
id: "01M84GGJ4QBEDC5D45P9KJJWVB"
kind: unit
parent: 01M84GGJ4PGCMYW6RM3BCHYYA5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Stale lock release and Startup unit tests with fake clock

Tests in locks_test.go with a fakeLockFS and fixed clock; the real filesystem is not touched.

## Acceptance criteria
- Stale lock removed
- Fresh or missing lock kept
- Remove failure stops resumption


## Scope
- In scope: locks_test.go
- Out of scope: Product code


## Technical constraints
- fakeLockFS has mod time, modErr, removeErr and removed paths


## Definition of done
- Tests pass


## Clarifying questions
- None
