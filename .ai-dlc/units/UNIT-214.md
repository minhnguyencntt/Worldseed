# UNIT-214 — Verify: Failed resume marks RECOVERING unit tests with fake clock

## Summary
Unit tests for the mark-on-failure path.

## Description
Tests in recovery_mark_test.go using the fakes from recovery_test.go and a fixed clock.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/recovery/recovery_mark_test.go` · `new: TestRecoverMarksFailedResume` · new
- **Do:** Seed a-run(RUNNING), b-run(RUNNING); fakeResumer.errFor["a-run"]=errors.New("agent gone"); call Recover with fixed clock; assert fs.saved has one record with ID a-run, Status RECOVERING, Error "agent gone", UpdatedAt equal to the fixed clock; assert resumer IDs are [a-run b-run]; Result.Marked equals [a-run] and Resumed equals [b-run].
- **Run:** `cd backend/worker && go test ./internal/recovery -run TestRecoverMarksFailedResume`
- **Expected:** Test passes.

### Step 2 — `backend/worker/internal/recovery/recovery_mark_test.go` · `new: TestRecoverSaveFailure` · new
- **Do:** Make fakeStore.saveErr non-nil and resumer fail for a-run; assert Recover returns an error satisfying errors.Is with saveErr.
- **Run:** `cd backend/worker && go test ./internal/recovery -run TestRecoverSaveFailure`
- **Expected:** Test passes.

## Acceptance criteria
- Failed resume saves RECOVERING with error and clock time
- Next execution still resumed
- Save failure is returned

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-214.md`

## Links
- Evidence: EVD-042
- Requirement: REQ-105
- Unit (Act): UNIT-210
- Unit (Verify): UNIT-214
- Status: completed
- Change: UPDATE
