# UNIT-198 — Act: Confirm report writing and error precedence in Runner.Run

## Summary
Confirm Run uses the injected clock and returns a reporter error only when the run succeeded

## Description
Read Run and confirm start and finished come from r.now, reporting is skipped when reporter is nil, and the reporter error is returned only when err == nil. No product change is expected.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner.go` · `Runner.Run` · L87-L122
- **Do:** Confirm start := r.now(), finished := r.now(), the 'r.reporter != nil' guard and 'werr != nil && err == nil' return; change nothing if so.
- **Run:** `cd backend/worker && go build ./internal/runner`
- **Expected:** Build succeeds; report logic confirmed

## Acceptance criteria
- Given runner.go, When read, Then StartedAt and FinishedAt use r.now
- Given runner.go, When read, Then the reporter error is returned only when err == nil

## Definition of done
- Code confirmed; go build succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-198.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-040
- Requirement: REQ-101
- Unit (Act): UNIT-198
- Unit (Verify): UNIT-202
- Status: completed
- Change: UPDATE
