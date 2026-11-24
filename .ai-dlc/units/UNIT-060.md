# UNIT-060 — Act: Implement the world repository and read handlers

## Summary
GET /worlds, /worlds/{id}, /worlds/{id}/game and /worlds/{id}/round/current respond from files.

## Description
Context: world data lives in worlds/<id>/world.yaml and rounds/<round>/round.yaml, game content in game/content/worlds/<id>. Desired behavior: a world repository and handlers for the four read endpoints. Expected result: JSON responses, 404 for unknown worlds. Why: the client needs world, game and round state.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/world/world.go` · `new: Repo, World, Round, List, Get, CurrentRound, Game` · new
- **Do:** Create package world with Repo{Root, ContentDir string}; World{ID, Title string} yaml-decoded from <Root>/worlds/<id>/world.yaml (fields id, title); Round{ID string; Number int; Status string; StartsAt, EndsAt time.Time} yaml-decoded from rounds/*/round.yaml (id, number, status, starts_at, ends_at). List reads dirs under worlds; Get and CurrentRound call safepath.Segment first and return ErrNotFound for a missing world; CurrentRound picks highest Number; Game reads <ContentDir>/worlds/<id>/world.yaml and scenes/*.yaml into map[string]any and returns {world, scenes}.
- **Expected:** Repo returns typed data or ErrNotFound

### Step 2 — `backend/internal/world/handler.go` · `new: Handler, List, Get, Game, CurrentRound` · new
- **Do:** Create Handler{Repo *Repo} with methods List, Get, Game, CurrentRound reading chi.URLParam(r,"id"), writing JSON with Content-Type application/json, 404 on ErrNotFound and 500 otherwise.
- **Expected:** Each handler returns 200 JSON or 404

## Acceptance criteria
- Given worlds/the-boys-room/world.yaml, when GET /api/v1/worlds runs, then a JSON array containing that world id is returned
- Given an unknown or unsafe world id, when GET /api/v1/worlds/{id} runs, then 404 is returned
- Given round directories, when GET /api/v1/worlds/{id}/round/current runs, then the highest-numbered round with id, number, status, starts_at and ends_at is returned

## Definition of done
- Product code compiles with go build ./...
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-060.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-012
- Requirement: REQ-032
- Unit (Act): UNIT-060
- Unit (Verify): UNIT-065
- Status: completed
- Change: UPDATE
