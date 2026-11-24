---
id: "01M847EPY0M8XVMW5W4VJV2HN3"
kind: requirement
parent: 01M847EPXZ5XQTYND7XTCNDSK4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Mounted admin round routes answer with exact handler statuses for a Bearer admin token

Context: adminRoundRoutes is mounted by New behind admin.Middleware. Desired behavior: with Authorization Bearer tok, GET round answers 200, an unknown round answers 404, and POST /rounds with invalid JSON answers 400. Expected result: tests fail if a route is unmounted or middleware swallows the request. Why: != 404 does not prove the handler ran.

## Acceptance criteria
- Given a server with an on-disk round-0000001, when GET /api/v1/admin/rounds/ROUND-0000001?world=the-boys-room has Bearer tok, then status is 200 and body id is ROUND-0000001
- Given an unknown round id, when GET with Bearer tok, then status is 404 with body not equal to the chi default 404 page
- Given invalid JSON, when POST /api/v1/admin/rounds has Bearer tok, then status is 400 with body invalid json


## Scope
- In scope: backend/internal/server/server.go route table
- Out of scope: Opening or closing rounds through real Git
- Preserve: adminRoutes ordering
- Preserve: Middleware token check


## Technical constraints
- Reuse adminRoundRoutes; do not add routes


## Definition of done
- Routes confirmed mounted exactly as in adminRoundRoutes


## Clarifying questions
- None
