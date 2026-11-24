---
id: "01M846R0M7AFEA0ERXVY28YRRS"
kind: requirement
parent: 01M846R0M7FCR5GYJ8WTPRE38Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Admin round service adapts round.Service with consistent types and errors

Context: admin.RoundService returns world.Round and uses admin.ErrNotFound/ErrConflict/ErrInvalid; round.Service returns round.Round and round.ErrNotFound/ErrIllegalTransition/ErrActiveRound. Desired: one adapter in internal/server converts round.Round to world.Round and maps errors. Expected: handlers return correct statuses.

## Acceptance criteria
- Given a round.Round with status OPEN, when converted, then world.Round has the same ID, Number, StartsAt, EndsAt and Status string OPEN
- Given round.ErrNotFound, round.ErrIllegalTransition or round.ErrActiveRound, when the adapter returns it, then errors.Is matches admin.ErrNotFound, admin.ErrConflict, admin.ErrConflict respectively


## Scope
- In scope: internal/server/rounds_adapter.go
- Out of scope: changing admin handlers
- Preserve: admin.RoundService interface
- Preserve: world.Round JSON shape


## Technical constraints
- Do not redeclare round types


## Definition of done
- Adapter compiles and satisfies admin.RoundService


## Clarifying questions
- None
