---
id: "01M846R0M8DR4PDZEJDWDB06S3"
kind: unit
parent: 01M846R0M7AFEA0ERXVY28YRRS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add round.Service adapter for admin.RoundService

Add internal/server/rounds_adapter.go with a roundAdmin struct wrapping *round.Service and the conversion round.Round -> world.Round, mapping round errors to admin errors.

## Acceptance criteria
- roundAdmin satisfies admin.RoundService
- Errors map to admin sentinel errors via fmt.Errorf %w


## Scope
- In scope: new adapter file
- Out of scope: handlers
- Preserve: round package


## Technical constraints
- No duplicate type declarations
- New file: `backend/internal/server/rounds_adapter.go`


## Definition of done
- go build ./internal/server succeeds


## Clarifying questions
- None
