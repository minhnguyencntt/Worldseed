# UNIT-065 — Verify: World repository and read handler unit tests

## Summary
Unit tests proving the four world read endpoints respond from repository files.

## Description
Unit tests written from the requirement spec with temp-dir files and httptest only. Context: GET /worlds, /worlds/{id}, /worlds/{id}/game and /worlds/{id}/round/current respond from files. Expected result: all listed tests pass.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/world/world_test.go` · `TestList_And_Get` · new
- **Do:** Write test TestList_And_Get: t.TempDir with worlds/the-boys-room/world.yaml; List returns [the-boys-room]; Get("missing") and Get("../x") return ErrNotFound.
- **Run:** `cd backend && go test ./internal/world`
- **Expected:** Test passes

### Step 2 — `backend/internal/world/world_test.go` · `TestCurrentRound_HighestNumber` · new
- **Do:** Write test TestCurrentRound_HighestNumber: write round-0000001 and round-0000002 round.yaml; CurrentRound returns number 2 with status and parsed times.
- **Run:** `cd backend && go test ./internal/world`
- **Expected:** Test passes

### Step 3 — `backend/internal/world/world_test.go` · `TestHandlers_StatusAndJSON` · new
- **Do:** Write test TestHandlers_StatusAndJSON: httptest + chi router; GET /worlds, /worlds/the-boys-room, /game, /round/current return 200 JSON; unknown id returns 404.
- **Run:** `cd backend && go test ./internal/world`
- **Expected:** Test passes

## Acceptance criteria
- Given worlds/the-boys-room/world.yaml, when GET /api/v1/worlds runs, then a JSON array containing that world id is returned
- Given an unknown or unsafe world id, when GET /api/v1/worlds/{id} runs, then 404 is returned
- Given round directories, when GET /api/v1/worlds/{id}/round/current runs, then the highest-numbered round with id, number, status, starts_at and ends_at is returned
- Given game content for the world, when GET /api/v1/worlds/{id}/game runs, then the world YAML and scenes are returned as JSON

## Definition of done
- Listed tests pass via the unit command
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-065.md`

## Links
- Evidence: EVD-012
- Requirement: REQ-032
- Unit (Act): UNIT-060
- Unit (Verify): UNIT-065
- Status: completed
- Change: UPDATE
