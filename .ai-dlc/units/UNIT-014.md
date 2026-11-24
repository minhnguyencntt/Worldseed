# UNIT-014 — Verify: Config loader and health endpoint unit tests

## Summary
Unit tests for LoadFS and /healthz

## Description
Write offline tests using fstest.MapFS and httptest covering config loading, env overrides, missing secret and health response.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/config/config_test.go` · `new: TestLoadFS_EnvOverrides` · new
- **Do:** Build fstest.MapFS with config.yaml containing auth.token_secret 'yaml-secret' and git.token 'yaml-git'; call LoadFS with getenv map returning STORYFORGE_TOKEN_SECRET='env-secret', STORYFORGE_GIT_TOKEN='env-git', STORYFORGE_HOSTING_PROVIDER='cloudflare'; assert fields equal env values
- **Run:** `cd backend && go test ./internal/config -run TestLoadFS_EnvOverrides`
- **Expected:** Test passes

### Step 2 — `backend/internal/config/config_test.go` · `new: TestLoadFS_MissingSecretAndDefaults` · new
- **Do:** With YAML lacking token_secret and no env, assert LoadFS returns non-nil error; with secret present and no cookie_name/ttl, assert CookieName 'sf_session' and TokenTTL 720h
- **Run:** `cd backend && go test ./internal/config -run TestLoadFS_MissingSecretAndDefaults`
- **Expected:** Test passes

### Step 3 — `backend/internal/server/server_test.go` · `new: TestHealthz` · new
- **Do:** Create handler via New with config having a secret and discard slog logger; httptest GET /healthz; assert 200, Content-Type application/json and body status ok
- **Run:** `cd backend && go test ./internal/server -run TestHealthz`
- **Expected:** Test passes

## Acceptance criteria
- Config tests pass
- Health test passes

## Definition of done
- Tests pass offline
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-014.md`

## Links
- Evidence: EVD-003
- Requirement: REQ-006
- Unit (Act): UNIT-011
- Unit (Verify): UNIT-014
- Status: completed
- Change: UPDATE
