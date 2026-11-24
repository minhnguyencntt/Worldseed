---
id: "01M846R0M89RQPB1DCYEEB4DA8"
kind: unit
parent: 01M846R0M7AFEA0ERXVY28YRRS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Round admin adapter unit tests

Test toWorldRound and mapRoundErr in internal/server with pure inputs; no network or real git.

## Acceptance criteria
- toWorldRound copies fields
- mapRoundErr maps sentinel errors


## Scope
- In scope: internal/server/rounds_adapter_test.go
- Out of scope: HTTP


## Technical constraints
- No network or real git


## Definition of done
- Tests pass


## Clarifying questions
- None
