---
id: "01M84660BEZPC2XDFBY1T7XRA5"
kind: requirement
parent: 01M84660BDP8DG0MP2AG2HZ8VS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Admin round endpoints wired behind token auth with scheduler started

Context: lifecycle service and middleware exist but are not exposed. Desired behavior: POST /api/v1/admin/rounds, POST /rounds/{id}/open, POST /rounds/{id}/close, GET /rounds/{id}, GET /rounds/{id}/contributions behind admin.Middleware; contribution round lookup reads round.yaml so closed rounds reject submissions; scheduler started from main. Expected result: admin can drive a round over HTTP.

## Acceptance criteria
- Given a valid token and world_id, when POST /admin/rounds, then 201 with the SCHEDULED round
- Given an OPEN round, when POST close, then 200 with status CLOSED; illegal transition returns 409
- Given no token, when any admin round route is called, then 401
- Given an unknown round, when GET, then 404


## Scope
- In scope: backend/internal/admin/rounds.go
- In scope: backend/internal/server/server.go
- In scope: backend/cmd/server/main.go
- Out of scope: executions
- Preserve: existing public routes
- Preserve: world.Handler CurrentRound


## Technical constraints
- world_id passed as query parameter world for routes with {id}, body field for create
- Use chi route group with admin.Middleware


## Dependencies
- R1
- R2
- R3
- R4


## Definition of done
- Routes registered and scheduler running


## Non-functional requirements
- Structured error logging


## Clarifying questions
- None
