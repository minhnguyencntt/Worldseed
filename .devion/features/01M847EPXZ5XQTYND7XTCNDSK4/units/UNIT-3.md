---
id: "01M847EPY0HPTR2RE53M4W9S8Q"
kind: unit
parent: 01M847EPY0M8XVMW5W4VJV2HN3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Mounted admin round routes return exact statuses with the admin token unit tests

Add a test that builds New with a temp repo and checks exact statuses through the real router with Bearer tok.

## Acceptance criteria
- Given the on-disk round, when GET round has Bearer tok, then 200 and id ROUND-0000001
- Given an unknown round id, then 404 from the handler
- Given invalid JSON on POST /rounds, then 400


## Scope
- In scope: backend/internal/server/server_test.go
- Out of scope: Product code
- Preserve: TestNew_AdminRoundsAreMounted


## Technical constraints
- httptest recorder only; temp dir via t.TempDir; no real Git calls (do not call open or close)


## Definition of done
- Test passes with go test -run filter


## Clarifying questions
- None
