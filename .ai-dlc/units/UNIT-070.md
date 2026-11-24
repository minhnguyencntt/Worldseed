# UNIT-070 — Verify: Current round route unit tests

## Summary
Routing test for /round/current

## Description
Add a server routing test that seeds a temp repo with a world and a round and asserts the singular path serves 200, the plural path 404, and an unknown world 404.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server_test.go` · `new: TestNew_CurrentRoundRoute` · after L170
- **Do:** Add a test that builds cfg with Storage.RepoPath=t.TempDir(), writes worlds/the-boys-room/world.yaml (same content as the theBoysRoomYAML const in backend/internal/world/world_test.go) and rounds/round-0000001/round.yaml ('id: round-0000001\nnumber: 1\nstatus: open\nstarts_at: 2026-01-01T00:00:00Z\nends_at: 2026-01-02T00:00:00Z\n') with os.MkdirAll and os.WriteFile, calls New(cfg, discard logger), then subtests request via httptest: /api/v1/worlds/the-boys-room/round/current expects 200 and body containing round-0000001; /api/v1/worlds/the-boys-room/rounds/current expects 404; /api/v1/worlds/unknown/round/current expects 404. Add imports os and path/filepath.
- **Run:** `cd backend && go test ./internal/server -run TestNew_CurrentRoundRoute`
- **Expected:** All three subtests pass, proving the spec path is routed and the old path is not.

## Acceptance criteria
- GET /api/v1/worlds/the-boys-room/round/current returns 200 with id round-0000001
- GET /rounds/current returns 404
- Unknown world returns 404

## Definition of done
- TestNew_CurrentRoundRoute passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-070.md`

## Links
- Evidence: EVD-014
- Requirement: REQ-035
- Unit (Act): UNIT-069
- Unit (Verify): UNIT-070
- Status: completed
- Change: UPDATE
