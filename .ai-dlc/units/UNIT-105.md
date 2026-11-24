# UNIT-105 — Verify: Mounted admin round routes return exact statuses with the admin token unit tests

## Summary
Add exact-status mount test to server_test.go

## Description
Add a test that builds New with a temp repo and checks exact statuses through the real router with Bearer tok.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server_test.go` · `new: TestNew_AdminRoundRoutesReturnHandlerStatuses` · after L334
- **Do:** Build the same temp repo and cfg as TestNew_AdminRoundsAreMounted (world.yaml, round-0000001/round.yaml via writeTestFile, Admin.Token tok), call New, and table-test: GET /api/v1/admin/rounds/ROUND-0000001?world=the-boys-room expects 200 and JSON id ROUND-0000001; GET /api/v1/admin/rounds/ROUND-9999999?world=the-boys-room expects 404; POST /api/v1/admin/rounds with body {bad expects 400; all with header Authorization Bearer tok.
- **Run:** `cd backend && go test ./internal/server -run TestNew_AdminRoundRoutesReturnHandlerStatuses`
- **Expected:** Test passes with statuses 200, 404, 400

## Acceptance criteria
- Given the on-disk round, when GET round has Bearer tok, then 200 and id ROUND-0000001
- Given an unknown round id, then 404 from the handler
- Given invalid JSON on POST /rounds, then 400

## Definition of done
- Test passes with go test -run filter
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-105.md`

## Links
- Evidence: EVD-021
- Requirement: REQ-052
- Unit (Act): UNIT-103
- Unit (Verify): UNIT-105
- Status: completed
- Change: UPDATE
