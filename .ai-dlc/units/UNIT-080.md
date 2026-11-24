# UNIT-080 — Verify: Admin auth middleware and config unit tests

## Summary
httptest middleware cases and config default tests

## Description
Cover missing, wrong, empty and correct credentials plus config defaults.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/admin/middleware_test.go` · `new: TestMiddleware` · new
- **Do:** Table test with token "s3cret": no header -> 401; "Bearer wrong" -> 401; "Basic s3cret" -> 401; "Bearer s3cret" -> 200; Middleware("") with "Bearer " -> 401; assert a flag set by next is false for 401 cases
- **Run:** `cd backend && go test ./internal/admin -run TestMiddleware`
- **Expected:** TestMiddleware passes (go test reports PASS)

### Step 2 — `backend/internal/config/config_test.go` · `new: TestLoadFS_AdminAndRoundDefaults` · after existing tests
- **Do:** Load a MapFS config with only auth.token_secret; assert Round.Duration==24h, BaseRelease=="1.0.0", SchedulerInterval==30s; with getenv returning "tok" for STORYFORGE_ADMIN_TOKEN assert Admin.Token=="tok"
- **Run:** `cd backend && go test ./internal/config -run TestLoadFS_AdminAndRoundDefaults`
- **Expected:** Config defaults test passes (go test reports PASS)

## Acceptance criteria
- Missing/wrong/empty-token cases return 401 and next is not called
- Correct token calls next with 200
- Config defaults and env override asserted

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-080.md`

## Links
- Evidence: EVD-015
- Requirement: REQ-039
- Unit (Act): UNIT-074
- Unit (Verify): UNIT-080
- Status: completed
- Change: UPDATE
