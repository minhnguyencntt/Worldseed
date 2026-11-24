# UNIT-066 — Verify: Contribution handlers, config and routing unit tests

## Summary
Unit tests proving contribution routes, player history and config defaults work.

## Description
Unit tests written from the requirement spec with fakes, fixed clock and httptest only. Context: POST/GET contribution routes and player history are served; routes and config are wired. Expected result: all listed tests pass.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/handler_test.go` · `TestCreate_StatusMapping` · new
- **Do:** Write test TestCreate_StatusMapping: handler with fake Service dependencies returning each sentinel error; cookie created with player.Sign and fixed Now; assert 401 without cookie, 201 on success, 400/404/409/409/429/429 for errors.
- **Run:** `cd backend && go test ./internal/contribution -run 'TestCreate|TestGetAndMine'`
- **Expected:** Test passes

### Step 2 — `backend/internal/contribution/handler_test.go` · `TestGetAndMine` · new
- **Do:** Write test TestGetAndMine: fake Reader; GET known id 200, unknown 404; Mine returns only the cookie player's items.
- **Run:** `cd backend && go test ./internal/contribution -run 'TestCreate|TestGetAndMine'`
- **Expected:** Test passes

### Step 3 — `backend/internal/config/config_test.go` · `TestLoadFS_ContributionDefaults` · after existing tests
- **Do:** Write test TestLoadFS_ContributionDefaults: fstest.MapFS config with only auth; assert Storage.RepoPath ".", MaxPerPlayer 5, MaxPromptLen 500; second case with explicit storage and contribution blocks asserts the overrides parse.
- **Run:** `cd backend && go test ./internal/config -run 'TestLoadFS_ContributionDefaults'`
- **Expected:** Test passes

### Step 4 — `backend/internal/server/server_test.go` · `TestNew_RegistersRoutes` · after existing tests
- **Do:** Write test TestNew_RegistersRoutes: server.New with a temp RepoPath; GET /api/v1/worlds returns 200 and POST /api/v1/contributions without cookie returns 401.
- **Run:** `cd backend && go test ./internal/server -run 'TestNew_RegistersRoutes'`
- **Expected:** Test passes

## Acceptance criteria
- Given no valid session cookie, when POST /api/v1/contributions runs, then 401 is returned
- Given a valid cookie and valid body {world_id, prompt}, when POST runs, then 201 with the contribution JSON is returned
- Given ErrPromptLength/ErrRoundNotOpen/ErrLimitReached/ErrRateLimited/ErrDuplicate, when POST runs, then the status is 400/409/429/429/409 respectively and ErrWorldNotFound gives 404
- Given a stored id, when GET /api/v1/contributions/{id} runs, then 200 is returned, and an unknown id gives 404
- Given a valid cookie, when GET /api/v1/player/me/contributions runs, then only that player's contributions are returned
- Given a YAML config with storage and contribution blocks, when loaded, then fields are parsed and defaults fill omitted limits

## Definition of done
- Listed tests pass via the unit command
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-066.md`

## Links
- Evidence: EVD-012
- Requirement: REQ-033
- Unit (Act): UNIT-061
- Unit (Verify): UNIT-066
- Status: completed
- Change: UPDATE
